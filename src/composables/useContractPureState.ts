import { onMounted, reactive } from 'vue'
import { Abi, Address, PublicClient, getAddress } from 'viem'

export type UseContractPureStateOptions = {
	address: Address
	abi: any
}

/**
 * 設計一個 composables 能夠直接把一份合約上的 pure 輸出成 reactive
 * - 需要能夠從 abi 取得所有 pure 的 name
 */
export function useContractPureState(client: PublicClient, options: UseContractPureStateOptions) {
	const { address, abi } = options

	const pureFns = abi.filter((abi: any) => {
		return abi.stateMutability === 'view' && abi.type === 'function' && !abi.inputs.length
	})

	const names = pureFns.map(fn => fn.name)

	type State = {
		[Key in (typeof names)[number]]: string
	}

	const state = reactive<State>(
		names.reduce((obj, name) => {
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
			contracts: names.map(name => ({
				...contractConfig,
				functionName: name,
			})),
		})

		results.forEach((res, i) => {
			state[names[i]] = res.result
		})
	})

	return {
		state,
	}
}
