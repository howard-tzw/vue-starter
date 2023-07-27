<script setup lang="ts">
import { createWalletClient, createPublicClient, http } from 'viem'
import { onMounted } from 'vue'
import { clrfundHardhat } from '@/utils/chains'
import { storeToRefs } from 'pinia'
import { useFundingRound } from '@/stores/useFundingRound'
import { FundingRound } from '@/abi'

let client: ReturnType<typeof createWalletClient>

const publicClient = createPublicClient({
	chain: clrfundHardhat,
	transport: http(),
})

onMounted(async () => {
	const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })

	client = createWalletClient({
		account,
		chain: clrfundHardhat,
		transport: http(),
	})

	const [address] = await client.getAddresses()
	console.log('wallet connected', address)
})

const { fundingRoundAddress } = storeToRefs(useFundingRound())

async function claimFunds() {
	const { request } = await publicClient.simulateContract({
		address: fundingRoundAddress.value,
		abi: FundingRound,
		functionName: 'claimFunds',
		args: [], // @todo
	})

	const tx = await client.writeContract(request)
	console.log(tx)
}
</script>

<template>
	<div class="p-10 flex justify-center">
		<button class="btn btn-sm" @click="claimFunds">claim funds</button>
	</div>
</template>

<style scoped></style>
