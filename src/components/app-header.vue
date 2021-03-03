<template>
  <header class="header">
    <div class="header__title" v-to-test="'page-title'" @click="toTop">
      {{ title }}
    </div>
    <div class="header__breed-select">
      <base-select
        v-to-test="'breed-select'"
        :modelValue="breedName"
        :items="breedsList"
        @update:modelValue="breedName = $event"
      />
      <div
        v-if="breedName"
        v-to-test="'breed-clear'"
        class="header__breed-clear"
        @click="breedName = ''"
      >
        Clear
      </div>
    </div>
    <nav class="header__links">
      <router-link
        v-for="item in items"
        v-to-test="`header-link-${item.route}`"
        class="header__link"
        active-class="header__link--active"
        :key="item.id"
        :to="{ name: item.route }"
        >{{ item.text }}</router-link
      >
    </nav>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { NavItem } from "@/models";
import { baseSelect } from "@/components/base";
import MutationTypes from "@/store/mutation-types";
import ActionTypes from "@/store/action-types";

export default defineComponent({
  name: "app-header",
  components: {
    baseSelect
  },
  props: {
    items: {
      type: Array as () => NavItem[]
    },
    title: {
      type: String
    }
  },
  setup() {
    const store = useStore();

    return {
      breedsList: computed(() => store.state.breedsList),
      getBreedsList: () => store.dispatch(ActionTypes.GetBreedsList),
      toTop: () =>
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        }),
      breedName: computed({
        get: () => store.state.breedName,
        set: (value: string) => store.commit(MutationTypes.SetBreedName, value)
      })
    };
  },
  async mounted() {
    await this.getBreedsList();
  }
});
</script>

<style lang="scss">
.header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 11px 40px;
  background-color: #c4c4c4;
  z-index: 100;

  &__title {
    font-weight: 800;
    font-size: 22px;
    margin-right: 30px;
    cursor: pointer;
  }

  &__breed-select {
    display: flex;
    align-items: center;
    min-width: 136px;
  }

  &__breed-clear {
    margin-left: 10px;
    cursor: pointer;
    text-decoration: underline;
  }

  &__links {
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  &__link {
    font-size: 17px;
    line-height: 20px;

    &:hover {
      text-decoration: underline;
    }

    &:not(:last-child) {
      margin-right: 20px;
    }

    &--active {
      text-decoration: underline;
    }
  }
}
</style>
