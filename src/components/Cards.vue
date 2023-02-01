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
    class="
      order-cards
      flex
      w-full
      justify-end
      p-5
    "
    v-if="state.nameCategory"
  >
    <div class="inline-block relative w-full flex flex-row justify-end">
      <span class="block w-28 self-center">ordernar por: </span>
      <select
        class="
          block
          appearance-none
          w-36
          bg-white
          border
          border-gray-400
          hover:border-gray-500
          px-4
          py-2
          pr-8
          rounded
          shadow
          leading-tight
          focus:outline-none
          focus:shadow-outline
        "
        @change="orderProducts(e)"
        v-model="state.selectedValue"
      >
        <option value="title">Nome</option>
        <option value="price">Preço</option>
        <option value="rating.rate">Avaliações</option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  </div>
  <div
    ref="products"
    class="products relative p-5 box-content grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <div
      class="rounded-lg shadow-lg bg-[#FFE5E2] max-w-full h-[450px]"
      v-for="(product, index) in getProducts"
      :key="index"
    >
      <router-link
        class="grid"
        :to="{
            name: 'Product',
            params: {
                id: product.id
            }
        }"
      >
        <img
          class="rounded-t-lg h-[130px] justify-self-center pt-4"
          :src="product.image"
          alt=""
        />
      </router-link>
      <div class="p-6 grid">
        <router-link
          class="grid"
          :to="{
            name: 'Product',
            params: {
                id: product.id
            }
        }"
        >
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
        </router-link>
        <button
          type="button"
          class="
            inline-block
            px-6
            py-2.5
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:shadow-lg
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
          :class="(
            cart.includes(product.id) ?
              'bg-red-600 hover:bg-red-700 focus:bg-red-700' :
              'bg-blue-600 hover:bg-blue-700 focus:bg-blue-700'
          )"
          @click="productCart({...product, ...{quantity: 1}}, (cart.includes(product.id) ? 'remove' : 'add'))"
        >
          {{ (cart.includes(product.id) ? 'Remover' : 'Adicionar') }}
        </button>
      </div>
    </div>
  </div>
</template>
      
<script>
import { ref, reactive, onMounted, watch, computed } from "vue";
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
      products: ref([]),
      selectedValue: ref("title"),
    });

    const getProducts = computed(() => {
      state.products = store.getters.getProducts;
      return state.products;
    });
    const productCart = (product, action) => {
      if (action === "add") store.dispatch("addProductCart", product);
      if (action === "remove") store.dispatch("removeProductCart", product);
    };
    const cart = computed(() => store.getters.getCart.map((e) => e.id));
    const orderProducts = () => {
      const orderName = state.selectedValue
        .split(".")
        .map((e) => new Array(e))[0];
      if (orderName[0] === "rating") {
        state.products = state.products.sort((a, b) =>
          a[orderName]["rate"] > b[orderName]["rate"]
            ? -1
            : b[orderName]["rate"] > a[orderName]["rate"]
            ? 1
            : 0
        );
      } else {
        state.products = state.products.sort((a, b) =>
          a[orderName] > b[orderName] ? 1 : b[orderName] > a[orderName] ? -1 : 0
        );
      }
    };

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
      cart,
      getProducts,
      orderProducts,
      productCart,
      formatPrice,
    };
  },
};
</script>