<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue'
import type { Chart as ChartJS } from 'chart.js'
import { Chart, registerables } from 'chart.js'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const chartRef = shallowRef<ChartJS | null>(null)

Chart.register(...registerables)

const data = {
	datasets: [
		{
			label: 'Scatter Dataset',
			data: [
				{
					x: -10,
					y: 0,
				},
				{
					x: 0,
					y: 10,
				},
				{
					x: 10,
					y: 5,
				},
				{
					x: 0.5,
					y: 5.5,
				},
			],
			backgroundColor: 'rgb(255, 99, 132)',
		},
	],
}

const config = {
	type: 'scatter',
	data: data,
	options: {
		scales: {
			x: {
				type: 'linear',
				position: 'bottom',
			},
		},
	},
}

const renderChart = () => {
	if (!canvasRef.value) return

	chartRef.value = new Chart(canvasRef.value, config)
}

onMounted(() => {
	renderChart()
})
</script>

<template>
	<div class="p-20">
		<canvas id="gantt-chart" ref="canvasRef"></canvas>
	</div>
</template>
