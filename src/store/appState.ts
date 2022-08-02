import { defineStore } from 'pinia'

interface AppState {
  pageState: PageState
}

export const enum PageState {
  INITIAL,
  CREATE_FACTORY,
}

export const useAppState = defineStore({
  id: 'app',
  state: (): AppState => ({
    pageState: PageState.INITIAL,
  }),
  getters: {},
  actions: {},
})
