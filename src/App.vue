<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
</script>

<template>
	<div class="min-h-screen">
		<router-view></router-view>
		<ModalsContainer />
	</div>
</template>
