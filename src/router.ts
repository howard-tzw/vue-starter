import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Clrfund from '@/views/Clrfund.vue'
import Contribute from '@/views/Contribute.vue'
import Claim from '@/views/Claim.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/clrfund',
		name: 'Clrfund',
		component: Clrfund,
	},
	{
		path: '/contribute',
		name: 'Contribute',
		component: Contribute,
	},
	{
		path: '/claim',
		name: 'Claim',
		component: Claim,
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
