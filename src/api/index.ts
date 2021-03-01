import axios from "axios";

export default class HTTP {
  base: string;

  constructor(base: string) {
    this.base = base;
  }

  async get(url: string, options?: object) {
    try {
      const { data } = await axios.get(`${this.base + url}`, options);

      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async post(url: string, options?: object) {
    try {
      const { data } = await axios.post(`${this.base + url}`, options);

      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
