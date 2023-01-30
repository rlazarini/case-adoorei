<template>
  <div
    ref="carousel"
    class="carousel slide relative p-5 box-content h-[280px]"
  >
    <div class="carousel-inner relative w-full overflow-hidden flex justify-start box-content shadow-lg">
      <div
        class="
            carousel-item
            relative
            flex
            flex-[0_0_auto]
            w-full
            h-[280px]
            p-5
            pb-9
            items-center
            rounded-lg
            justify-between	
            bg-[#9254C8]
            transition-all
        "
        v-for="(banner, index) in getBanners"
        :key="index"
      >
        <img
          :src="banner.image"
          alt=""
          class="ml-8 w-auto h-full object-contain"
        >
        <div class="carousel-item__content w-4/12 h-full mr-20 flex flex-col pt-3">
          <h5
            :title=" banner.title"
            class="text-lg text-gray-200 drop-shadow-sm line-clamp-2"
          >
            {{ banner.title }}
          </h5>
          <p
            :title=" banner.description"
            class="text-xs text-gray-200 drop-shadow-sm line-clamp-5"
          >
            {{ banner.description }}
          </p>
          <p class="text-base mt-auto text-white place-self-end rounded-full bg-[#F900BF] px-4 py-2">
            {{ formatPrice(banner.price) }}
          </p>
        </div>
      </div>
      <div class="carousel-bullets w-full absolute left-0 bottom-0 flex justify-center">
        <button
          class="
            transition-all
            cursor-pointer
            box-content
            w-[30px]
            h-[3px]
            p-0
            mx-1
            -indent-[999px]
            bg-white
            bg-clip-padding
            border-x-0
            border-y-[12px]
            border-transparent	
          "
          :class="{active: index === state.bannerIndex}"
          :data-bullet="index"
          v-for="(banner, index) in getBanners"
          :key="index"
          @click="bannerMove(index)"
        ></button>
      </div>
    </div>
  </div>
</template>
    
<script>
import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const state = reactive({
      lang: navigator.language,
      bannerIndex: ref(0),
    });
    const carousel = ref(null);

    const getBanners = computed(() => {
      return store.getters.getBanners;
    });
    const formatPrice = (price) => {
      return price.toLocaleString(state.lang, {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    };

    const bannerMove = (pos) => {
      carousel.value.querySelector(".carousel-item").style.marginLeft = `${
        pos * 100 * -1
      }%`;
      state.bannerIndex = pos;
    };

    onMounted(async () => {
      await store.dispatch("fetchBanners");
    });

    return { state, carousel, getBanners, bannerMove, formatPrice };
  },
};
</script>

<style scoped lang="scss">
.carousel {
  &-bullets {
    button {
      opacity: 0.5;

      &.active {
        opacity: 1;
      }
    }
  }
}
</style>