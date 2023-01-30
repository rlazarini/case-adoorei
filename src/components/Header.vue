<template>
  <header class="bg-white">
    <nav class="relative p-4 flex justify-start items-center bg-[#AEE2FF]">
      <div class="mr-1.5">
        <button
          class="navbar-burger flex items-center text-black p-2"
          @click="toggleMenu"
        >
          <svg
            class="block h-6 w-4 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>
      <router-link
        class="text-3xl font-bold leading-none flex items-center"
        :to="{
            name: 'Home'
        }"
      >
        <img
          src="/cart-logo.png"
          alt="E-commerce Template"
          class="h-10"
        >
        <h1 class="text-xl text-gray-500">{{ title }}</h1>
      </router-link>
      <form class="ml-auto mr-6 w-1/2 mt-1">
        <div class="relative">
          <input
            type="search"
            id="product-search"
            class="block outline-none w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Buscar produtos..."
            required
          >
          <button
            type="submit"
            class="absolute inset-y-0 right-4 flex items-center pl-3 pointer-events-none"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
      </form>
      <a
        class="text-3xl font-bold leading-none items-top"
        title="Sacola de compras"
        href="#"
      >
        x
        <img
          src="/checkout.png"
          alt="Sacola"
          class="h-10"
        >
      </a>
    </nav>
    <div
      class="navbar-menu relative z-50 transition"
      :class="{hidden: state.showMenu}"
    >
      <div class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
      <nav class="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
        <div class="flex items-center mb-8">

          <button
            class="navbar-close"
            @click="toggleMenu"
          >
            <svg
              class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div>
          <ul>
            <li
              class="mb-1"
              v-for="(category, index) in getCategories"
              :key="index"
            >
              <router-link
                class="
                    block
                    p-4
                    text-sm
                    font-semibold
                    text-gray-400
                    capitalize 
                    hover:bg-blue-50
                    hover:text-blue-600
                    rounded
                "
                :to="{
                    name: 'Category',
                    params: {
                        id: encodeURI(category)
                    }
                }"
                @click="toggleMenu"
              >{{ category }}</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>
  
  <script>
import { reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    title: String,
  },
  setup(props) {
    const store = useStore();
    const state = reactive({
      showMenu: true,
    });

    const toggleMenu = () => {
      state.showMenu = !state.showMenu;
    };
    const getCategories = computed(() => {
      return store.getters.getCategories;
    });

    onMounted(async () => {
      await store.dispatch("fetchCategories");
    });

    return { props, state, getCategories, toggleMenu };
  },
};
</script>