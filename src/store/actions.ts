import { ActionContext } from "vuex";
import { RootState } from "./types";
import ActionTypes from "./action-types";
import MutationTypes from "./mutation-types";

import { getBreedsList, getRandomDogsList } from "@/api/breeds";
import { getRandomDogsListByBreed } from "@/api/breed";

interface DogsRequest {
  count: number;
  merge: boolean;
}

export default {
  async [ActionTypes.GetBreedsList]({
    commit
  }: ActionContext<RootState, RootState>): Promise<void> {
    const { message } = await getBreedsList();
    commit(MutationTypes.SetBreedsList, Object.keys(message));
  },
  async [ActionTypes.GetRandomDogsList](
    { commit, state }: ActionContext<RootState, RootState>,
    { count, merge }: DogsRequest
  ): Promise<void> {
    const request = state.breedName
      ? getRandomDogsListByBreed
      : getRandomDogsList;

    const { message } = await request(count, state.breedName);
    let newList = [];

    if (merge) {
      const { dogsList } = state;
      newList = [...dogsList, ...message];
    } else {
      newList = message;
    }

    commit(MutationTypes.SetDogsList, newList);
  },
  [ActionTypes.GetFavoriteList]({
    commit
  }: ActionContext<RootState, RootState>): void {
    const list = JSON.parse(localStorage.getItem("favoriteList") || "{}");
    commit(MutationTypes.SetFavoriteList, list);
  },
  [ActionTypes.SetFavoriteList](
    { commit }: ActionContext<RootState, RootState>,
    list: string[]
  ): void {
    commit(MutationTypes.SetFavoriteList, list);
    const stringifiedList = JSON.stringify(list);
    localStorage.setItem("favoriteList", stringifiedList);
  }
};
