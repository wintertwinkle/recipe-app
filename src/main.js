import { createApp } from "vue"
import App from "./App.vue"
import store from "./store"
import router from "./router"

// Every Vue application starts by creating a new application instance with the `createApp` function
createApp(App).use(store).use(router).mount("#app")
