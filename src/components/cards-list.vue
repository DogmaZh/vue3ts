<template>
  <div class="cards-list">
    <slot />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import throttle from "lodash.throttle";

export default defineComponent({
  name: "cards-list",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    triggerOffset: {
      type: Number,
      default: 100
    }
  },
  setup(props, { emit }) {
    const scrolledToBottom = ref(false);

    const isBottomOfWindow = () => {
      return (
        Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ) +
          props.triggerOffset +
          window.innerHeight >=
        document.documentElement.offsetHeight
      );
    };

    const triggerIsBottomOfWindow = () => {
      scrolledToBottom.value = isBottomOfWindow();
    };

    const scroll = () => {
      window.onscroll = throttle(triggerIsBottomOfWindow, 100);
    };

    watch(scrolledToBottom, () => {
      if (!props.loading) {
        emit("getMore");
      }
    });

    return {
      scrolledToBottom,
      isBottomOfWindow,
      triggerIsBottomOfWindow,
      scroll
    };
  },
  mounted() {
    this.scroll();
  }
});
</script>

<style lang="scss">
.cards-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}
</style>
