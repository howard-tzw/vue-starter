import { onMounted, reactive, computed } from 'vue'
import { Address, PublicClient, getAddress, isAddress } from 'viem'
import type { Info } from '@/types'
import { EXPLORER_URL } from '@/constants'

export type UseContractOptions = {
	client: PublicClient
	address: Address
	abi: any
}

/**
 * 設計一個 composables 能夠直接把一份合約上的 pure 輸出成 reactive
 * - 需要能夠從 abi 取得所有 pure 的 name
 */
export function useContract(options: UseContractOptions) {
	const { client, address, abi } = options

	const pureFns = abi.filter((abi: any) => {
		return abi.stateMutability === 'view' && abi.type === 'function' && !abi.inputs.length
	})

	const viewFns = abi.filter((abi: any) => {
		return abi.stateMutability === 'view' && abi.type === 'function' && abi.inputs.length
	})

	const execFns = abi.filter((abi: any) => {
		return abi.stateMutability !== 'view' && abi.type === 'function'
	})

	const fns = abi.filter((abi: any) => {
		return abi.type === 'function'
	})

	const events = abi.filter((abi: any) => {
		return abi.type === 'event'
	})

	const constructor = abi.filter((abi: any) => {
		return abi.type === 'constructor'
	})

	const pureFnNames = pureFns.map(fn => fn.name)

	type State = {
		[Key in (typeof pureFnNames)[number]]: string
	}

	const state = reactive<State>(
		pureFnNames.reduce((obj, name) => {
			obj[name] = ''
			return obj
		}, {}),
	)

	const contractConfig = {
		address: getAddress(address),
		abi: abi,
	} as const

	onMounted(async () => {
		const results = await client.multicall({
			contracts: pureFnNames.map(name => ({
				...contractConfig,
				functionName: name,
			})),
		})

		results.forEach((res, i) => {
			state[pureFnNames[i]] = res.result
		})
	})

	const data = computed<Info[]>(() => {
		const res: Info[] = [
			{
				name: 'Contract address',
				value: address,
				link: EXPLORER_URL + address,
			},
		]

		for (const [key, value] of Object.entries(state)) {
			res.push({
				name: key,
				value,
				link: isAddress(value) ? EXPLORER_URL + value : undefined,
			})
		}

		return res
	})

	return {
		data,
		state,

		fns,
		pureFns,
		viewFns,
		execFns,
		events,
		constructor,
	}
}
