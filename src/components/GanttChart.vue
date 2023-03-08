<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue'
import type { Chart as ChartJS } from 'chart.js'
import { Chart, registerables } from 'chart.js'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const chartRef = shallowRef<ChartJS | null>(null)

Chart.register(...registerables)

const data = {
	labels: ['Job 1', 'Job 2', 'Job 3'],
	datasets: [
		{
			label: 'Work',
			data: [
				['2020-02-01', '2020-12-01'],
				['2021-01-01', '2021-02-01'],
				['2022-05-01', '2022-06-01'],
			],
			backgroundColor: [
				'rgba(255, 26, 104, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(255, 159, 64, 0.2)',
				'rgba(0, 0, 0, 0.2)',
			],
			borderColor: [
				'rgba(255, 26, 104, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)',
				'rgba(0, 0, 0, 1)',
			],
			barPercentage: 0.2,
		},
	],
}

const config = {
	type: 'bar',
	data,
	options: {
		indexAxis: 'y',
		scales: {
			x: {
				min: '2020-01-01',
				type: 'time',
				time: {
					unit: 'month',
				},
			},
			y: {
				beginAtZero: true,
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

<style scoped>
* {
	margin: 0;
	padding: 0;
	font-family: sans-serif;
}
.chartMenu {
	width: 100vw;
	height: 40px;
	background: #1a1a1a;
	color: rgba(54, 162, 235, 1);
}
.chartMenu p {
	padding: 10px;
	font-size: 20px;
}
.chartCard {
	width: 100vw;
	height: calc(100vh - 40px);
	background: rgba(54, 162, 235, 0.2);
	display: flex;
	align-items: center;
	justify-content: center;
}
.chartBox {
	width: 700px;
	padding: 20px;
	border-radius: 20px;
	border: solid 3px rgba(54, 162, 235, 1);
	background: white;
}
</style>
