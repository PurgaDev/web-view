import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import './style.css'
import App from './App.vue'
import router from './router';

const app = createApp(App);

app.use(router)
app.mount('#app')
