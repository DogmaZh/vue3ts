<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    :aria-labelledby="iconName"
    role="presentation"
  >
    <title :id="iconName" lang="en">{{ iconName }} icon</title>
    <g :fill="iconColor">
      <slot @initViewbox="onInitViewbox" />
    </g>
  </svg>
</template>

<script lang="ts">
export default {
  name: "base-icon",
  props: {
    iconName: {
      type: String
    },
    width: {
      type: [Number, String],
      default: 15
    },
    height: {
      type: [Number, String],
      default: 15
    },
    iconColor: {
      type: String,
      default: "currentColor"
    },
    viewBox: {
      type: String,
      default: "0 0 15 15"
    }
  }
};
</script>
