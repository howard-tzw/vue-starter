<script setup lang="ts">
import { CURRENT_ROUND_ADDRESS } from '@/constants'
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

onMounted(async () => {
	blockNumber.value = await client.getBlockNumber()
	const contractAddress = CURRENT_ROUND_ADDRESS
	const etherscanApikey = '4Z899HMXZDQZNV3QG1VNUK5JB5XFWCGQVV'
	const arbiscanApikep = 'HREC994EMMGCXFNS9QY2NWF922136KJCWY'

	const urlTest = `https://api.etherscan.io/api?module=contract&action=getcontractcreation&contractaddresses=0xB83c27805aAcA5C7082eB45C868d955Cf04C337F,0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45,0xe4462eb568E2DFbb5b0cA2D3DbB1A35C9Aa98aad,0xdAC17F958D2ee523a2206206994597C13D831ec7,0xf5b969064b91869fBF676ecAbcCd1c5563F591d0&apikey=${etherscanApikey}`

	const url = `https://api.arbiscan.io/api?module=contract&action=getcontractcreation&contractaddresses=${CURRENT_ROUND_ADDRESS}&apikey=${arbiscanApikep}`
	const response = await fetch(url)
	const data = await response.json()

	console.log(data)
})
</script>

<template>
	<div class="p-10 flex justify-center items-center">
		<div class="flex flex-col text-center justify-center">
			<p>block number:</p>
			<p>{{ blockNumber }}</p>
			<RouterLink to="/clrfund">
				<p class="text-blue-500">clrfund</p>
			</RouterLink>
			<RouterLink to="/contribute">
				<p class="text-blue-500">contribute</p>
			</RouterLink>
			<RouterLink to="/claim">
				<p class="text-blue-500">claim</p>
			</RouterLink>
		</div>
	</div>
</template>

<style lang="css"></style>
