import MutationTypes from "./mutation-types";
import { RootState } from "./types";

export default {
  [MutationTypes.SetBreedName](state: RootState, name: string) {
    state.breedName = name;
  },
  [MutationTypes.SetBreedsList](state: RootState, list: string[]) {
    state.breedsList = list;
  },
  [MutationTypes.SetDogsList](state: RootState, list: string[]) {
    state.dogsList = list;
  },
  [MutationTypes.SetFavoriteList](state: RootState, list: string[]) {
    state.favoriteList = list;
  }
};
