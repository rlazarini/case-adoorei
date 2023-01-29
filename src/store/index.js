import { createStore } from 'vuex'
import axios from "axios"

const hostName = import.meta.env.VITE_HOST_API

export default createStore({
    state: {
        banners: [],
        products: [],
        categories: []
    },
    getters: {
        getBanners: (state) => state.banners,
        getProducts: (state) => state.products,
        getCategories: (state) => state.categories
    },
    actions: {
        async fetchBanners({ commit }) {
            try {
                const data = await axios.get(
                    `${hostName}/products/category/electronics?limit=5`
                );
                commit("SET_BANNERS", data.data);
            } catch (error) {
                console.log(error);
            }
        },
        async fetchProducts({ commit }) {
            try {
                const data = await axios.get(
                    `${hostName}/products`
                );
                commit("SET_PRODUCTS", data.data);
            } catch (error) {
                console.log(error);
            }
        },
        async fetchCategories({ commit }) {
            try {
                const data = await axios.get(
                    `${hostName}/products/categories`
                );
                commit("SET_CATEGORIES", data.data);
            } catch (error) {
                console.log(error);
            }
        },
    },
    mutations: {
        SET_BANNERS(state, banners) {
            state.banners = banners;
        },
        SET_PRODUCTS(state, products) {
            state.products = products;
        },
        SET_CATEGORIES(state, categories) {
            state.categories = categories;
        },
    }
})