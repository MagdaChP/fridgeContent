import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import store from "./store";
import router from "./AppRouter";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faEdit,
  faTimes,
  faCheck,
  faPlus,
  faCog,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "simplebar";
import "simplebar/dist/simplebar.css";

library.add(faTrash, faEdit, faTimes, faCheck, faPlus, faCog, faArrowLeft);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(VueRouter);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");

router.beforeEach((to, from, next) => {
  if (store.state.userId === "") {
    next("/login");
  } else {
    next();
  }
});
