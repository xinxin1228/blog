import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import axios from "axios"

const app = createApp(App)
installElementPlus(app)

// 服务器前缀设置
const baseURL = process.env.NODE_ENV ==="development"?"http://localhost:3000":""

axios.defaults.baseURL = baseURL
axios.defaults.withCredentials = true // 携带cookie
app.config.globalProperties.$axios = axios // 为所有实例添加axios

app.use(store).use(router).mixin({
  data(){
    return{
      baseURL
    }
  }
}).mount('#app')
