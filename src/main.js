import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Laadt automatisch src/router/index.js in

const app = createApp(App)

app.use(router)

app.mount('#app')


// Importeer jouw units component uit de juiste map (views of components)
import UnitsIndex from './views/units.vue'

const routes = [
    { path: '/', component: UnitsIndex },
    { path: '/units', component: UnitsIndex }
]



