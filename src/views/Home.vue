<script setup lang="ts">
import { createPublicClient, formatEther, getAddress, http } from 'viem'
import { mainnet } from 'viem/chains'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const address = route.params.address as string

const client = createPublicClient({
	chain: mainnet,
	transport: http(),
})

const blockNumber = ref<bigint>(0n)
const balance = ref<bigint>(0n)

onMounted(async () => {
	blockNumber.value = await client.getBlockNumber()
	balance.value = await client.getBalance({ address: getAddress(address) })
})
</script>

<template>
	<div>{{ blockNumber }}</div>
	<div>{{ formatEther(balance) }}</div>
	<RouterLink to="/clrfund">
		<p class="text-blue-500">CLRFund</p>
	</RouterLink>
</template>

<style lang="css"></style>
