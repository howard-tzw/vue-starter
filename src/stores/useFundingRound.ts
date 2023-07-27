import { defineStore } from 'pinia'
import { CURRENT_ROUND_ADDRESS } from '@/constants'
import { getAddress } from 'viem'

type FundingRoundState = {
	address: string
}

export const useFundingRound = defineStore('fundingRound', {
	state: (): FundingRoundState => ({
		address: CURRENT_ROUND_ADDRESS,
	}),
	getters: {
		fundingRoundAddress(state) {
			return getAddress(state.address)
		},
	},
	actions: {},
})
