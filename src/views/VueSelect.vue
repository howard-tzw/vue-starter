<template>
	<div>
		<div class="section">
			<h2 class="title">Custom</h2>
			<ul>
				<li>searchable: false</li>
				<li>clearable: false</li>
			</ul>
			<v-select v-model="selected" :options="options" :clearable="false" :searchable="false" />
		</div>

		<div class="section">
			<h2 class="title">BaseSelect</h2>
			<BaseSelect v-model="selectedOption" :options="baseSelectOptions" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import countries from '../mocks/countryCodes.js'
import BaseSelect from '@/components/BaseSelect.vue'

const selected = ref(null)
const options = ref(countries)

const baseSelectOptions = computed(() => {
	return countries.map(country => ({
		name: country.label,
		value: country.value,
	}))
})
const selectedOption = ref()
</script>
