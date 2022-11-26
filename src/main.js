import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import Editor from "@tinymce/tinymce-vue";

const opts = {
  icons: {
    iconfont: "mdi"
  },
  theme: { dark: true }
};

Vue.use(Vuetify);
Vue.component("editor", Editor);

new Vue({
  vuetify: new Vuetify(opts),
  render: (h) => h(App)
}).$mount("#app");
