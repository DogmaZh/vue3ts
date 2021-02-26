import { ActionContext } from "vuex";
import { RootState } from "./types";
import ActionTypes from "./action-types";
import MutationTypes from "./mutation-types";
import { getBreedsList, getRandomDogsList } from "@/api/breeds";

import { getRandomDogsListByBreed } from "@/api/breed";

interface BreedRequest {
  count: number;
  breed: string;
}

export default {
  async [ActionTypes.GetBreedsList]({
    commit
  }: ActionContext<RootState, RootState>): Promise<void> {
    const { message } = await getBreedsList();
    commit(MutationTypes.SetBreedsList, Object.keys(message));
  },
  async [ActionTypes.GetRandomDogsList](
    { commit }: ActionContext<RootState, RootState>,
    count: number
  ): Promise<void> {
    const { message } = await getRandomDogsList(count);
    commit(MutationTypes.SetDogsList, message);
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
  },
  async [ActionTypes.getRandomDogsListByBreed](
    { commit }: ActionContext<RootState, RootState>,
    { count, breed }: BreedRequest
  ) {
    const { message } = await getRandomDogsListByBreed(count, breed);
    commit(MutationTypes.SetDogsList, message);
  }
};
