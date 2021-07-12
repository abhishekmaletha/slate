import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import io from "socket.io-client";
// createApp.prototype.$socket = io(`http://localhost:4000/`);
const app = createApp(App);
app.use(store).use(router).mount("#app");
app.config.globalProperties.$socket = io.connect("http://localhost:4000");
app.config.globalProperties.$globalVariable = 'maletha';