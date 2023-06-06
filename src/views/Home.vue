<script setup lang="ts">
import { ref, watch } from 'vue'
import TestInput from '@/components/TestInput.vue'

const text = ref('')

watch(text, () => {
	console.log(text.value)
})
</script>

<template>
	<div>
		<TestInput v-model="text"></TestInput>
	</div>
</template>

<style lang="css"></style>
