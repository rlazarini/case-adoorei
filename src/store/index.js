import { createStore } from 'vuex'
import axios from "axios"

const hostName = import.meta.env.VITE_HOST_API

export default createStore({
    state: {
        banners: []
    },
    getters: {
        getBanners: (state) => state.banners
    },
    actions: {
        async fetchBanners({ commit }) {
            try {
                const data = await axios.get(
                    `${hostName}/products?limit=5`
                );
                commit("SET_BANNERS", data.data);
            } catch (error) {
                console.log(error);
            }
        },
    },
    mutations: {
        SET_BANNERS(state, banners) {
            state.banners = banners;
        },
    }
})