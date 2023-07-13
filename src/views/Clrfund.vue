<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'
import { createPublicClient, http, getAddress, isAddress, Address, Abi } from 'viem'
import { arbitrum } from 'viem/chains'
import { CURRENT_ROUND_ADDRESS } from '@/constants'
import { FundingRound as FundingRoundABI } from '@/abi'
import { UseContractPureStateOptions, useContractPureState } from '@/composables/useContractPureState'

// constants
const EXPLORER_URL = 'https://arbiscan.io/address/'

const client = createPublicClient({
	chain: arbitrum,
	transport: http(),
})

const roundAddress = ref(CURRENT_ROUND_ADDRESS)
const blockNumber = ref<bigint>(0n)

// funding round pure state
const contractConfig: UseContractPureStateOptions = {
	address: getAddress(roundAddress.value),
	abi: FundingRoundABI,
}
const { state: fundingRoundPureState } = useContractPureState(client, contractConfig)

onMounted(async () => {
	blockNumber.value = await client.getBlockNumber()
	// nativeTokenAddress.value = (await client.readContract({
	// 	...contractConfig,
	// 	functionName: 'nativeToken',
	// })) as string
})

type Info = {
	name: string
	value: any
	link?: string
}

const basicInfo = computed<Info[]>(() => [
	{
		name: 'Network',
		value: arbitrum.name,
	},
	{
		name: 'block number',
		value: blockNumber.value,
	},
])

const roundInfo = computed<Info[]>(() => {
	const res: Info[] = [
		{
			name: 'Contract address',
			value: roundAddress.value,
			link: EXPLORER_URL + roundAddress.value,
		},
	]

	for (const [key, value] of Object.entries(fundingRoundPureState)) {
		res.push({
			name: key,
			value,
			link: isAddress(value) ? EXPLORER_URL + value : undefined,
		})
	}

	return res
})
</script>

<template>
	<div class="flex flex-col justify-center w-full items-center p-4">
		<div class="text-center w-full">
			<p class="title">Round Address</p>
			<input type="text" v-model="roundAddress" class="input input-sm input-bordered w-96" />
		</div>

		<div class="mt-10 w-full">
			<p class="title">Basic info</p>

			<div class="border p-7">
				<ul v-for="info in basicInfo" :key="info.name" class="flex flex-col">
					<li class="flex flex-col items-center">
						<p>{{ info.name }}:</p>
						<div class="info-value">
							<p>{{ info.value }}</p>
							<div v-if="info.link">
								<a target="_blank" :href="info.link">
									<img class="w-4 h-4 cursor-pointer" src="../assets/link.svg" alt="" />
								</a>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<div class="mt-10 w-full">
			<p class="title">FundingRound.sol</p>

			<div class="border p-7">
				<ul v-for="info in roundInfo" :key="info.name" class="flex flex-col">
					<li class="flex flex-col items-center">
						<p>{{ info.name }}:</p>
						<div class="info-value">
							<p>{{ info.value }}</p>
							<div v-if="info.link">
								<a target="_blank" :href="info.link">
									<img class="w-4 h-4 cursor-pointer" src="../assets/link.svg" alt="" />
								</a>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style scoped>
a {
	@apply text-blue-700;
}
.title {
	@apply text-xl text-center mb-2;
}

.info-value {
	@apply text-blue-400 flex items-center gap-2;
}
</style>
