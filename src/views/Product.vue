<template>
  <h2 class="
        block
        p-4
        w-full
        text-3xl
        font-bold
        text-[#EFA3C8]
        text-center
        uppercase 
      ">
    {{ getProduct.title }}
  </h2>
  <div
    id="product"
    class="
        product
        flex
        m-auto	
        w-9/12
        lg:w-11/12
        md:w-full
        py-4
        px-24
        lg:px-20
        justify-between
    "
  >
    <div class="
        product-image
        p-20
        max-w-md
        border-2
        border-solid
        border-cyan-200
    ">
      <img
        :src="getProduct.image"
        alt=""
      />
    </div>
    <div class="
        product-description
        flex
        flex-col
        pl-4
        h-auto
        max-w-md
    ">
      <div class="
        product-description__category
        text-gray-400
        text-xs
        text-right
        mb-2
    ">
        {{ getProduct.category }}
      </div>
      <div class="product-description__text mt-5">
        <p class="
            text-gray-800
            text-xs
        ">
          Descrição
        </p>
        <p class="
            text-gray-600
            text-base
            mb-5
        ">
          {{ getProduct.description }}
        </p>
      </div>
      <div class="product-description__actions flex justify-end mt-auto mb-4">
        <span class="font-bold text-xl">{{ formatPrice(getProduct.price) }}</span>
      </div>
      <div class="product-description__actions flex justify-end">
        <div class="
            product-description__actions-select
            flex
            flex-row
            w-24
            mr-5
            border-2
            border-solid
            border-gray-400
            rounded-lg
            relative
            bg-transparent
        ">
          <button
            class="
            bg-transparent
            text-gray-700
            hover:text-gray-700
            hover:bg-gray-200
            h-full
            w-20
            rounded-l
            cursor-pointer
            outline-none
            "
            @click="changeQtd(-1)"
          >
            <span class="m-auto text-2xl font-thin leading-4">−</span>
          </button>

          <span class="w-16 text-center m-auto text-lg font-thin">{{state.qtd}}</span>
          <button
            class="
            bg-transparent
            text-gray-700
            hover:text-gray-700
            hover:bg-gray-200
            h-full
            w-20
            rounded-l
            cursor-pointer
            outline-none
            "
            @click="changeQtd(1)"
          >
            <span class="m-auto text-2xl font-thin leading-4">+</span>
          </button>
        </div>
        <div class="product-description__actions-button">

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
            bg-blue-600
            hover:bg-blue-700
            focus:bg-blue-700
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
            @click="productCart({...getProduct, ...{quantity: state.qtd}})"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { defineComponent, computed, reactive, onMounted } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: ["id"],
  name: "Product",
  setup(props) {
    const store = useStore();
    const state = reactive({
      lang: navigator.language,
      qtd: 1,
    });
    const cart = computed(() => store.getters.getCart.map((e) => e.id));
    const getProduct = computed(() => {
      return store.getters.getProduct;
    });

    const productCart = (product) => {
      store.dispatch("addProductCart", product);
    };
    const changeQtd = (amount) => {
      const calculated = state.qtd + amount;
      state.qtd = calculated <= 0 ? 1 : calculated;
    };
    const formatPrice = (price) => {
      return price.toLocaleString(state.lang, {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    };
    onMounted(async () => {
      await store.dispatch("fetchProduct", {
        id: props.id,
      });
    });

    return {
      state,
      cart,
      getProduct,
      productCart,
      changeQtd,
      formatPrice,
    };
  },
});
</script>