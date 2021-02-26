<template>
  <div class="cards-list">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "cards-list"
};
</script>

<style lang="scss">
.cards-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}
</style>
