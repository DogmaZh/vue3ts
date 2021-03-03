<template>
  <div class="favorites">
    <h1 class="favorites__title" v-to-test="'favorites-title'">
      Favorite Dogs List
    </h1>
    <cards-list v-if="favoriteList.length > 0" v-to-test="'favorites-list'">
      <card-item
        v-for="dog in favoriteList"
        :key="dog"
        :src="dog"
        :is-favorite="favoriteList.indexOf(dog) !== -1"
        @onTriggerFavorite="onTriggerFavorite"
      ></card-item>
    </cards-list>
    <h3 v-else v-to-test="'favorites-not-found'" class="favorites__not-found">
      Add more dogs to your favorite!
    </h3>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import ActionTypes from "@/store/action-types";
import { Card } from "@/models";

import { cardsList } from "@/components/cards-list";
import { cardItem } from "@/components/card-item";

export default defineComponent({
  name: "Favorites",
  components: { cardItem, cardsList },
  setup() {
    const store = useStore();

    const onTriggerFavorite = ({ src, isFavorite }: Card) => {
      const list = [...store.state.favoriteList];

      if (isFavorite) {
        list.splice(list.indexOf(src), 1);
      } else {
        list.push(src);
      }

      store.dispatch(ActionTypes.SetFavoriteList, list);
    };

    return {
      onTriggerFavorite,
      favoriteList: computed(() => store.state.favoriteList),
      getFavoriteList: () => store.dispatch(ActionTypes.GetFavoriteList)
    };
  },
  mounted() {
    this.getFavoriteList();
  }
});
</script>

<style lang="scss">
.favorites {
  &__title {
    font-weight: 500;
    font-size: 26px;
    line-height: 30px;
    margin-bottom: 36px;
  }

  &__not-found {
    font-size: 21px;
    text-decoration: underline;
  }
}
</style>
