import { createStore } from 'vuex'
import VuexPersister from 'vuex-persister'
import axios from "axios"
const vuexPersister = new VuexPersister({
    storage: window.localStorage
})

const hostName = import.meta.env.VITE_HOST_API

export default createStore({
    state: {
        banners: [],
        product: [],
        products: [],
        categories: [],
        cart: []
    },
    getters: {
        getBanners: (state) => state.banners,
        getProduct: (state) => state.product,
        getProducts: (state) => state.products,
        getCategories: (state) => state.categories,
        getCart: (state) => state.cart
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
        async fetchProduct({ state, commit }, {id}) {
            state.product = []
            try {
                const data = await axios.get(
                    `${hostName}/products/${id}`
                );
                commit("SET_PRODUCT", data.data);
            } catch (error) {
                console.log(error);
            }
        },
        async fetchProducts({ state, commit }, {category}) {
            state.products = []
            const categoryOption = category
            try {
                const data = await axios.get(
                    `${hostName}/products${categoryOption}`
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

        addProductCart({state, commit}, product) {
            commit('pushProductCart', product);
        },
        removeProductCart({state, commit}, product) {
            commit('popProductCart', product);
        },
    },
    mutations: {
        SET_BANNERS(state, banners) {
            state.banners = banners;
        },
        SET_PRODUCT(state, product) {
            state.product = product;
        },
        SET_PRODUCTS(state, products) {
            state.products = products;
        },
        SET_CATEGORIES(state, categories) {
            state.categories = categories;
        },
        pushProductCart(state, product) {
            const index = state.cart.findIndex(pdt => pdt.id === product.id)
            if (index < 0) {
                state.cart.push(product);
            } else {
                state.cart[index].quantity = product.quantity || 1
            }
        },
        popProductCart(state, product) {
            const index = state.cart.findIndex(pdt => pdt.id === product.id)
            state.cart.splice(index, 1)
        }
    },
    plugins: [vuexPersister.persist]
})