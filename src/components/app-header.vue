<template>
  <header class="header">
    <div class="header__title">{{ title }}</div>
    <div class="header__breed-select">
      <base-select
        :modelValue="breedName"
        :items="breedsList"
        @update:modelValue="breedName = $event"
      />
      <div v-if="breedName" class="header__breed-clear" @click="breedName = ''">
        Clear
      </div>
    </div>
    <nav class="header__links">
      <router-link
        class="header__link"
        v-for="item in items"
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

    const setBreedName = (value: string) =>
      store.commit(MutationTypes.SetBreedName, value);

    const getBreedsList = () => store.dispatch(ActionTypes.GetBreedsList);

    return {
      breedName: computed({
        get: () => store.state.breedName,
        set: setBreedName
      }),
      breedsList: computed(() => store.state.breedsList),
      getBreedsList,
      setBreedName
    };
  },
  async mounted() {
    await this.getBreedsList();
  }
});
</script>

<style lang="scss">
.header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 11px 40px;
  background-color: #c4c4c4;

  &__title {
    font-weight: 800;
    font-size: 22px;
    margin-right: 30px;
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
