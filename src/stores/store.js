import { createStore } from "vuex";

export default createStore({
    state: {
        isAuthenticated: !!document.cookie
            .split("; ")
            .find((row) => row.startsWith("user_id=")),
    },
    mutations: {
        setIsAuthenticated(state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated;
        },
    },
    actions: {
        login({ commit }) {
            // your login code here
            commit("setIsAuthenticated", true);
        },
        logout({ commit }) {
            // your logout code here
            commit("setIsAuthenticated", false);
        },
    },
    getters: {
        isAuthenticated: (state) => state.isAuthenticated,
    },
});
