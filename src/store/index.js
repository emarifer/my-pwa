import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    localNotes: JSON.parse(localStorage.getItem('localNotes') || "[]"),
    customAlert: {
      alert: false,
      message: '',
      color: ''
    },
  },
  mutations: {
    getToken(state, payload) {
      state.token = payload;
    },
    setLocalNotes(state, payload) {
      state.localNotes = payload;
    },
    setAlert(state, payload) {
      state.customAlert = payload;
    }
  },
  actions: {
    setToken({ commit }, payload) {
      localStorage.setItem('token', payload);
      commit('getToken', payload);
    },
    setCustomAlert({ commit }, payload) {
      commit('setAlert', payload);
    },
    setNotes({ commit }, payload) {
      const stringNotes = JSON.stringify(payload);
      localStorage.setItem('localNotes', stringNotes)
      commit('setLocalNotes', payload);
    },
    signOut({ commit }) {
      localStorage.removeItem('token');
      commit('getToken', '');
    },
  },
});
