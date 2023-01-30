<template>
  <h2
    class="
        block
        p-4
        w-full
        text-3xl
        font-bold
        text-[#EFA3C8]
        text-center
        uppercase 
      "
    v-if="state.nameCategory"
  >
    {{ decodeURI(state.nameCategory) }}
  </h2>
  <div
    ref="products"
    class="products relative p-5 box-content grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <div
      class="rounded-lg shadow-lg bg-[#FFE5E2] max-w-full h-[450px]"
      v-for="(product, index) in getProducts"
      :key="index"
    >
      <a
        href="#!"
        class="grid"
      >
        <img
          class="rounded-t-lg h-[130px] justify-self-center pt-4"
          :src="product.image"
          alt=""
        />
      </a>
      <div class="p-6 grid">
        <h5 class="text-gray-400 text-xs text-right mb-2 mt-3">{{ product.category }}</h5>
        <h4 class="text-gray-900 text-xl font-medium mb-2 line-clamp-2 h-14">
          {{ product.title }}
        </h4>
        <p class="text-gray-700 text-base mb-4 line-clamp-3 h-18">
          {{product.description}}
        </p>
        <p
          :class="{'text-green-600 font-semibold' : product.rating.rate >= 4.7}"
          class="text-gray-700 text-base mb-4"
        >
          {{ formatPrice((product.price)) }}
        </p>
        <button
          type="button"
          class="
            inline-block
            px-6
            py-2.5
            bg-blue-600
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-blue-700
            hover:shadow-lg
            focus:bg-blue-700
            focus:shadow-lg
            focus:outline-none
            focus:ring-0
            active:bg-blue-800
            active:shadow-lg
            transition
            duration-150
            ease-in-out
            justify-self-end
          "
          @click="addProductCart(product)"
        >
          Adicionar
        </button>
      </div>
    </div>
  </div>
</template>
      
  <script>
import { reactive, onMounted, watch, computed } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    category: String,
  },
  setup(props) {
    const store = useStore();
    const state = reactive({
      lang: navigator.language,
      nameCategory: props.category,
    });

    const getProducts = computed(() => {
      return store.getters.getProducts;
    });
    const addProductCart = (product) =>
      store.dispatch("addProductCart", product);
    const formatPrice = (price) => {
      return price.toLocaleString(state.lang, {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    };

    watch(
      () => props.category,
      async (newCategory) => {
        state.nameCategory = newCategory;
        await store.dispatch("fetchProducts", {
          category: `${newCategory ? "/category/" : ""}${newCategory}`,
        });
      }
    );
    onMounted(async () => {
      await store.dispatch("fetchProducts", {
        category: `${props.category ? "/category/" : ""}${props.category}`,
      });
    });

    return {
      state,
      getProducts,
      addProductCart,
      formatPrice,
    };
  },
};
</script>
  
  <style scoped lang="scss">
</style>