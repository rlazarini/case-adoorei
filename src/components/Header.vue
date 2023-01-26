<template>
  <header class="bg-white">
    <nav class="relative px-4 py-4 flex justify-start items-center bg-cyan-200">
      <div class="">
        <button
          class="navbar-burger flex items-center text-black p-3"
          @click="toggleMenu"
        >
          <svg
            class="block h-4 w-4 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>
      <a
        class="text-3xl font-bold leading-none"
        href="#"
      >
        <img
          src="cart-logo.png"
          alt="E-commerce Template"
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
            <li class="mb-1">
              <a
                class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                href="#"
              >Home</a>
            </li>
            <li class="mb-1">
              <a
                class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                href="#"
              >About Us</a>
            </li>
            <li class="mb-1">
              <a
                class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                href="#"
              >Services</a>
            </li>
            <li class="mb-1">
              <a
                class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                href="#"
              >Pricing</a>
            </li>
            <li class="mb-1">
              <a
                class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                href="#"
              >Contact</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    Logo LOLs - {{ title }}
  </header>
</template>
  
  <script>
import { reactive } from "vue";
export default {
  props: {
    title: String,
  },
  setup(props) {
    const state = reactive({
      showMenu: true,
    });
    function toggleMenu() {
      state.showMenu = !state.showMenu;
    }
    return { props, state, toggleMenu };
  },
};
</script>