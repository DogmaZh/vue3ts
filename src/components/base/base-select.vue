<template>
  <div class="base-select">
    <select
      class="base-select__select"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="item in items" :key="item">{{ item }}</option>
    </select>
    <base-icon
      class="base-select__control base-select__control-arrow"
      width="11"
      height="6"
      view-box="0 0 11 6"
      ><arrow-icon></arrow-icon
    ></base-icon>
  </div>
</template>

<script lang="ts">
import { arrowIcon } from "@/components/icons";

export default {
  name: "base-select",
  emits: ["update:modelValue"],
  components: { arrowIcon },
  props: {
    items: {
      type: Array,
      default: Array as () => string[]
    },
    modelValue: {
      type: String
    }
  }
};
</script>

<style lang="scss">
.base-select {
  width: 100%;
  position: relative;

  & * {
    cursor: pointer;
  }

  &__select {
    width: 100%;
    background-color: #fff;
    border-radius: 6px;
    border: 1px solid #8a8686;
    padding: 4px 6px;
    padding-right: 25px;
    font-size: 14px;
    line-height: 16px;
    outline: none;
    -webkit-appearance: none;
  }

  &__control-arrow {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translate(0, -50%);
    pointer-events: none;
  }
}
</style>
