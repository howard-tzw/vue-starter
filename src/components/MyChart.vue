<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue'
import type { Chart as ChartJS } from 'chart.js'
import { Chart, registerables } from 'chart.js'
import 'chartjs-adapter-date-fns'
import { faker } from '@faker-js/faker'

// How to make a 1D scatter plot with Charts.js?
// https://stackoverflow.com/questions/67536116/how-to-make-a-1d-scatter-plot-with-charts-js

const canvasRef = ref<HTMLCanvasElement | null>(null)
const chartRef = shallowRef<ChartJS | null>(null)

Chart.register(...registerables)

const fakeData = Array.from({ length: 10 }, () => ({
	x: faker.date.between('2000-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
	y: 0,
}))

console.log(fakeData)

const data = {
	datasets: [
		{
			label: 'A dataset',
			data: fakeData,
			backgroundColor: 'rgba(255, 99, 132, 1)',
		},
	],
}

const config = {
	type: 'scatter',
	data,
	options: {
		plugins: {
			legend: {
				display: false,
			},
		},

		scales: {
			x: {
				min: '2000-01-01',
				max: '2023-01-01',
				type: 'time',
				time: {
					unit: 'year',
				},
			},
			y: {
				stacked: true,
				beginAtZero: 0,
				grid: {
					display: true,
				},
				ticks: {
					beginAtZero: true,
				},
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
	<div class="px-20 pb-20">
		<canvas id="gantt-chart" ref="canvasRef" height="50"></canvas>
	</div>
</template>

<style></style>
