import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

/*
    Первое замечание, это если делаешь разделение фронта и бека, то создавай 2 отдельных репозитория,
    чтобы изменения производить отдельно.
 */

createApp(App).use(store).use(router).mount('#app')
