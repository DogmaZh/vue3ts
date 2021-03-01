<template>
  <div class="home">
    <h1 class="home__title">
      {{
        breedName
          ? breedName.charAt(0).toUpperCase() + breedName.slice(1)
          : "Random"
      }}
      Dogs List
    </h1>
    <cards-list
      v-if="inited"
      class="home__list"
      :loading="loading"
      @getMore="loadMore"
    >
      <card-item
        v-for="dog in dogsList"
        :key="dog"
        :src="dog"
        :is-favorite="favoriteList.indexOf(dog) !== -1"
        @onTriggerFavorite="onTriggerFavorite"
      ></card-item>
    </cards-list>
    <h3 v-if="loading || !inited" class="home__loading">Loading...</h3>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import ActionTypes from "@/store/action-types";
import cardItem from "@/components/card-item.vue";
import cardsList from "@/components/cards-list.vue";

import { ITEMS_ON_PAGE } from "@/constants";
import { Card } from "@/models";

export default defineComponent({
  name: "home",
  components: { cardItem, cardsList },
  setup() {
    const store = useStore();
    const breedName = computed(() => store.state.breedName);
    const loading = ref(false);
    const inited = ref(false);

    const getRandomDogsList = async (count: number, merge?: boolean) => {
      loading.value = true;
      await store.dispatch(ActionTypes.GetRandomDogsList, { count, merge });
      loading.value = false;
    };

    const loadMore = async () => {
      await getRandomDogsList(ITEMS_ON_PAGE, true);
    };

    const onTriggerFavorite = ({ src, isFavorite }: Card) => {
      const list = [...store.state.favoriteList];

      if (isFavorite) {
        list.splice(list.indexOf(src), 1);
      } else {
        list.push(src);
      }

      store.dispatch(ActionTypes.SetFavoriteList, list);
    };

    watch(breedName, () => {
      getRandomDogsList(ITEMS_ON_PAGE);
    });

    return {
      breedName,
      loading,
      inited,
      getRandomDogsList,
      loadMore,
      onTriggerFavorite,
      dogsList: computed(() => store.state.dogsList),
      favoriteList: computed(() => store.state.favoriteList)
    };
  },
  async mounted() {
    await this.getRandomDogsList(ITEMS_ON_PAGE);
    this.inited = true;
  }
});
</script>

<style lang="scss">
.home {
  &__title {
    font-weight: 500;
    font-size: 26px;
    line-height: 30px;
    margin-bottom: 36px;
  }

  &__list {
    margin-bottom: 40px;
  }

  &__loading {
    font-size: 21px;
    opacity: 0.6;
    text-align: center;
  }
}
</style>
