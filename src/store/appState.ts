import { defineStore } from 'pinia'

interface AppState {
  pageState: PageState
}

export const enum PageState {
  INITIAL,
  CREATE_FACTORY_1,
  CREATE_FACTORY_2,
  CREATE_FACTORY_3,
}

export const useAppState = defineStore({
  id: 'app',
  state: (): AppState => ({
    pageState: PageState.CREATE_FACTORY_2,
  }),
  getters: {},
  actions: {},
})
