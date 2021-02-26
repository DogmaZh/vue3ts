import axios from "axios";

export default class HTTP {
  base: string;

  constructor(base: string) {
    this.base = base;
  }

  async get(url: string, options?: object) {
    const { data } = await axios.get(`${this.base + url}`, options);
    return data;
  }

  async post(url: string, options?: object) {
    const { data } = await axios.post(`${this.base + url}`, options);
    return data;
  }
}
