<script setup lang="ts">
const modelValue = defineModel()
</script>

<template>
	<div>
		<input class="input input-bordered" v-model="modelValue" />
	</div>
</template>
