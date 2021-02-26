import HTTP from "@/api";

const base = "https://dog.ceo/api/breeds";
const http = new HTTP(base);

export async function getBreedsList() {
  return await http.get("/list/all");
}

export async function getRandomDogsList(count: number) {
  return await http.get(`/image/random/${count}`);
}

export async function getRandomDogsListByBreed(count: number, breed: string) {
  return await http.get(`/${breed}/images/random/${count}`);
}
