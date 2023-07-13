<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { createPublicClient, http, getAddress } from 'viem'
import { arbitrum } from 'viem/chains'
import { CURRENT_ROUND_ADDRESS } from '@/constants'
import { FundingRound as FundingRoundABI } from '@/abi'
import { FundingRoundFactory as FundingRoundFactoryABI } from '@/abi'
import ApplyContract from '@/components/ApplyContract.vue'
import type { Info } from '@/types'

// @todo 列出其他合約： MACI, MACIFactory, ClrFund, ClrFundDeployer
// @todo 得知合約中所擁有的 DAI 數量

const client = createPublicClient({
	chain: arbitrum,
	transport: http(),
})

const roundAddress = ref(CURRENT_ROUND_ADDRESS)
// @todo 應該透過 roundAddress 取得
const fundingRoundFactoryAddress = ref('0xc06349D95C30551Ea510bD5F35CfA2151499D60a')
const blockNumber = ref<bigint>(0n)

// funding round
const fundingRound = {
	client,
	address: getAddress(roundAddress.value),
	abi: FundingRoundABI,
}

// funding round factory
const fundingRoundFactory = {
	client,
	address: getAddress(fundingRoundFactoryAddress.value),
	abi: FundingRoundFactoryABI,
}

onMounted(async () => {
	blockNumber.value = await client.getBlockNumber()
})
</script>

<template>
	<div class="flex flex-col justify-center w-full items-center p-10">
		<div class="text-center w-full">
			<p class="text-xl text-center mb-2">Funding Round Address</p>
			<input type="text" v-model="roundAddress" class="input input-sm input-bordered w-96" />
		</div>

		<div class="p-4">
			<p>
				Network: <span class="text-blue-400">{{ arbitrum.name }}</span>
			</p>
			<p>
				Block Number <span class="text-blue-400">{{ blockNumber }}</span>
			</p>
		</div>

		<ApplyContract title="FundingRound.sol" :use-contract-options="fundingRound" />
		<ApplyContract title="FundingRoundFactory.sol" :use-contract-options="fundingRoundFactory" />
	</div>
</template>

<style></style>
