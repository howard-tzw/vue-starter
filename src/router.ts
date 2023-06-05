import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Carousel from '@/views/Carousel.vue'
import VueSelect from '@/views/VueSelect.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/carousel',
		name: 'Carousel',
		component: Carousel,
	},
	{
		path: '/vue3-select',
		name: 'VueSelect',
		component: VueSelect,
	},
	// Fallback route for handling 404s
	{
		path: '/:pathMatch(.*)*',
		name: '404',
		component: () => import('./views/Error404.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
