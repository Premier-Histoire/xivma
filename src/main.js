import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// FontAwesomeのインポート
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// すべてのFontAwesomeアイコンをライブラリに追加
library.add(fas)

const app = createApp(App)

// FontAwesomeコンポーネントをグローバルに登録
app.component('font-awesome-icon', FontAwesomeIcon)


app.use(router)
app.use(store)

app.mount('#app')
