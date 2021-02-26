<template>
  <div class="card-item">
    <div class="card-item__image-container">
      <img class="card-item__image" :src="src" @click="triggerFavorite" />
      <div class="card-item__to-favorite">
        <base-icon
          class="card-item__to-favorite-icon"
          width="48"
          height="48"
          view-box="0 0 24 24"
          icon-color="#FFFFFF"
        >
          <from-favorite-icon v-if="isFavorite" />
          <to-favorite-icon v-else />
        </base-icon>
      </div>
      <base-icon
        v-if="isFavorite"
        class="card-item__is-favorite"
        width="24"
        height="24"
        view-box="0 0 24 24"
        icon-color="#9E2F7D"
        ><heart-icon></heart-icon
      ></base-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  toFavoriteIcon,
  fromFavoriteIcon,
  heartIcon
} from "@/components/icons";

export default defineComponent({
  name: "card-item",
  components: { toFavoriteIcon, fromFavoriteIcon, heartIcon },
  props: {
    src: {
      type: String
    },
    isFavorite: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    triggerFavorite() {
      this.$emit("onTriggerFavorite", {
        src: this.src,
        isFavorite: this.isFavorite
      });
    }
  }
});
</script>

<style lang="scss">
.card-item {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  $this: &;

  &__image {
    position: relative;
    width: 100%;
    height: auto;
    border-radius: 6px;
    box-shadow: 0px 4px 4px rgba(27, 22, 22, 0.25);
    z-index: 1;
    cursor: pointer;

    &:hover {
      + #{$this}__to-favorite {
        opacity: 0.5;
        z-index: 10;
      }
    }
  }

  &__image-container {
    position: relative;
    display: flex;
  }

  &__to-favorite {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #9e2f7d;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    z-index: 0;
    pointer-events: none;
  }

  &__is-favorite {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
  }
}
</style>
