<template>
  <header class="bg-white fixed w-full z-50">
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
            class="block appearance-none outline-none w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
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
        class="text-3xl font-bold group leading-none items-top relative inline-block"
        title="Sacola de compras"
        href="#"
      >
        <img
          src="/checkout.png"
          alt="Sacola"
          class="h-10"
        >
        <span
          class="
                absolute
                -top-1
                -right-1
                px-2
                py-1
                text-[10px]
                leading-none
                text-white
                transform
                bg-red-600
                rounded-full
            "
          v-if="cart.length"
        >
          {{ cart.map(e => e.quantity || 1).reduce((a,b) => a + b, 0) }}
        </span>

        <div class="absolute w-full hidden group-hover:block rounded-b border-t-0 z-10 right-0 w-auto bg-whtie z-50">
          <div
            class="shadow-xl w-72 rounded-lg bg-white"
            v-if="cart.length > 0"
          >
            <div
              class="p-2 flex bg-white hover:bg-gray-100 cursor-pointer border-b border-gray-100"
              v-for="(item, index) in cart"
              :key="index"
            >
              <div class="p-2 w-12">
                <img :src="item.image">
              </div>
              <div class="flex-auto text-sm w-32">
                <div class="font-bold line-clamp-2 h-11">{{item.title}}</div>
                <div class="text-sm font-normal text-gray-400">Qt: {{item.quantity || 1}}</div>
              </div>
              <div class="flex flex-col w-18 font-medium items-end">
                <div
                  title="Remover"
                  class="w-4 h-4 mb-6 hover:bg-red-200 rounded-full cursor-pointer text-red-700"
                  @click="removeProductCart(item)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-trash-2"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                    </path>
                    <line
                      x1="10"
                      y1="11"
                      x2="10"
                      y2="17"
                    ></line>
                    <line
                      x1="14"
                      y1="11"
                      x2="14"
                      y2="17"
                    ></line>
                  </svg>
                </div>
                <span
                  class="text-sm"
                  :title="formatPrice(item.price * (item.quantity || 1))"
                >
                  {{ formatPrice(item.price * (item.quantity || 1)) }}
                </span>
              </div>
            </div>
            <div class="p-4 justify-center flex">
              <button
                class="
                text-base 
                focus:outline-none
                flex
                justify-center
                px-4
                py-2
                rounded
                font-bold
                cursor-pointer 
                hover:bg-[#FCA3CC]
                hover:text-gray-100
                bg-[#FBBEDF] 
                text-gray-700
                border
                duration-200
                ease-in-out 
                border-gray-400	
                transition
                "
                :title="'Comprar ' + formatPrice(state.price)"
              >
                Comprar {{ formatPrice(state.price) }}
              </button>
            </div>
          </div>
          <div
            class="shadow-xl w-72 rounded-lg bg-white"
            v-else
          >
            <div class="p-2 flex flex-col bg-transparent min-h-[200px] place-content-center">
              <p class="text-center text-base text-gray-500 font-light">Seu carrinho está vazio</p>
            </div>
          </div>
        </div>
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
import { reactive, ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    title: String,
  },
  setup(props) {
    const store = useStore();
    const state = reactive({
      showMenu: true,
      lang: navigator.language,
      price: ref(0),
    });
    const cart = computed(() => {
      const cartObj = store.getters.getCart;
      state.price = cartObj
        .map((e) => e.price * (e.quantity || 1))
        .reduce((a, b) => a + b, 0);
      return cartObj;
    });
    const removeProductCart = (product) => {
      store.dispatch("removeProductCart", product);
    };
    const toggleMenu = () => {
      state.showMenu = !state.showMenu;
    };
    const getCategories = computed(() => {
      return store.getters.getCategories;
    });

    const formatPrice = (price) => {
      return price.toLocaleString(state.lang, {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    };

    onMounted(async () => {
      await store.dispatch("fetchCategories");
    });

    return {
      props,
      state,
      cart,
      formatPrice,
      removeProductCart,
      getCategories,
      toggleMenu,
    };
  },
};
</script>