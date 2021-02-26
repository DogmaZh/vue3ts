import HTTP from "@/api";

const base = "https://dog.ceo/api/breed";
const http = new HTTP(base);

export async function getRandomDogsListByBreed(count: number, breed: string) {
  return await http.get(`/${breed}/images/random/${count}`);
}
