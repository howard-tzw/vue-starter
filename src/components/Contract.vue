<script setup lang="ts">
import { ref, computed } from 'vue'
import type { AbiEvents, Info } from '@/types'

type Props = {
	title: string
	data?: Info[]
	open?: boolean
	events?: AbiEvents
	execFns?: any
	viewFns?: any
}

const props = withDefaults(defineProps<Props>(), {
	open: false,
})

const informations = computed(() => {
	return props.data
})

const collapsed = ref(props.open)
</script>

<template>
	<div class="my-2 w-full">
		<div class="flex cursor-pointer flex-row items-center justify-between" @click="collapsed = !collapsed">
			<div class="title">{{ title }}</div>
			<div class="ml-4">
				<div v-if="!collapsed">open</div>
				<div v-else>close</div>
			</div>
		</div>

		<div v-if="collapsed" class="border p-7 flex flex-col gap-7">
			<!-- events -->
			<div v-if="events?.length">
				<p class="text-xl text-center p-2">Events</p>
				<ul class="flex flex-wrap gap-2">
					<li class="border rounded-3xl px-4" v-for="event in events" :key="event.name">
						{{ event.name }}
					</li>
				</ul>
			</div>

			<!-- exec fns -->
			<div v-if="execFns?.length">
				<p class="text-xl text-center p-2">Execute Functions</p>
				<ul class="flex flex-wrap gap-2">
					<li class="border rounded-3xl px-4" v-for="fn in execFns" :key="fn.name">
						{{ fn.name }}
					</li>
				</ul>
			</div>

			<!-- view funs -->
			<div v-if="viewFns?.length">
				<p class="text-xl text-center p-2">View Functions</p>
				<ul class="flex flex-wrap gap-2">
					<li class="border rounded-3xl px-4" v-for="fn in viewFns" :key="fn.name">
						{{ fn.name }}
					</li>
				</ul>
			</div>

			<!-- pure fns -->
			<div v-if="informations?.length">
				<p class="text-xl text-center p-2">Pure Functions</p>

				<ul class="flex flex-col">
					<li v-for="info in informations" :key="info.name" class="flex flex-col items-center">
						<p>{{ info.name }}:</p>
						<div class="info-value">
							<p v-if="!Array.isArray(info.value)">{{ info.value }}</p>
							<div v-else class="flex flex-col">
								<div v-for="inf in info.value" :key="inf">
									<div>{{ inf }}</div>
								</div>
							</div>

							<div v-if="info.link">
								<a target="_blank" :href="info.link">
									<img class="w-4 h-4 cursor-pointer" src="../assets/link.svg" alt="" />
								</a>
							</div>
						</div>
					</li>
				</ul>
			</div>

			<!-- view fns -->
		</div>
	</div>
</template>

<style>
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
