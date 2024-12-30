import { createStore } from 'vuex';

const store = createStore({
  state: {
    isLoading: true, // L'état initial
  },
  mutations: {
    setLoading(state, status) {
      state.isLoading = status;
    },
  },
  getters: {
    isLoading: (state) => state.isLoading,
  },
});

export default store;
