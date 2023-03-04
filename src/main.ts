import { createApp } from 'vue';
import App from './views/app.vue';
import 'tailwindcss/tailwind.css';

import { createPinia } from 'pinia';
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

import { routerInstance } from './views/router';
app.use(routerInstance);

app.mount('#root');
