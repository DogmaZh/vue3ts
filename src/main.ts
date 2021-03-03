import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "@/App.vue";
import router from "@/router";
import { store } from "@/store";
import { baseIcon } from "@/components/base";
import { toTest } from "@/directives";

import "reset-css";

createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .component("base-icon", baseIcon)
  .directive("to-test", toTest)
  .mount("#app");
