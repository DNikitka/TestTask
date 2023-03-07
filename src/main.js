import { createApp } from 'vue'
import App from './App.vue'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { CoSortAlphaDown, CoSortAlphaUp } from "oh-vue-icons/icons";

addIcons(CoSortAlphaDown, CoSortAlphaUp);

import './assets/main.css'

createApp(App)
    .component("v-icon", OhVueIcon)
    .mount('#app')
