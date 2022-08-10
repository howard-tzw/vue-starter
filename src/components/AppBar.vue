<template>
  <nav
    v-if="appState.pageState === PageState.INITIAL"
    class="bg-emerald-700 text-white border-gray-200 px-2 sm:px-4 py-1 h-16"
  >
    <div class="flex flex-wrap justify-between items-center mx-auto px-2 h-full">
      <router-link to="/"> Reporting App </router-link>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-6 h-6 text-white"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="flex flex-col p-4 mt-4 -lg border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0"
        >
          <li>
            <a href="#" class="block py-2 pr-4 pl-3 text-white md:bg-transparent md:p-0" aria-current="page"> Home </a>
          </li>
          <li>
            <a href="#" class="block py-2 pr-4 pl-3 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0">
              About
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- add relative and z-30 for overlap FactoryDetailPage -->
  <div v-else class="bg-emerald-700 text-white border-gray-200 px-2 py-1 relative h-16">
    <div class="flex flex-wrap justify-between items-center mx-auto px-2 h-full">
      <button @click="stepBack" class="">
        <mdicon name="arrow-left" />
      </button>

      <button @click="cancel" class="text-white hidden sm:block">取消新增</button>
      <button @click="cancel" class="sm:hidden"><mdicon name="close" /></button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PageState, useAppState } from '@/store/appState'

const appState = useAppState()
const cancel = () => {
  appState.$patch({
    pageState: PageState.INITIAL,
  })
}
const stepBack = () => {
  appState.$patch({
    pageState: appState.pageState - 1,
  })
}
</script>
