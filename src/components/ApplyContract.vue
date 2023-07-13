<script setup lang="ts">
import { useContract } from '@/composables/useContract'
import { UseContractOptions } from '@/composables/useContract'
import Contract from '@/components/Contract.vue'
import { computed } from 'vue'

type Props = {
	title: string
	useContractOptions: UseContractOptions
	open?: boolean
}

const props = withDefaults(defineProps<Props>(), { open: false })

const { data, events, execFns, viewFns } = useContract(props.useContractOptions)

const contractProps = computed(() => ({
	title: props.title,
	open: props.open,
	data: data.value,
	events: events,
	execFns,
	viewFns,
}))
</script>

<template>
	<Contract v-bind="contractProps" />
</template>

<style></style>
