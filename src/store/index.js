import { createStore } from 'vuex'
// 引入 enum  枚举值
 import  { keyToken , keyInfo} from "@/enum/user.js"
const store = createStore({
  state () {
    return {
        token:localStorage.getItem(keyToken)||"",
        info:JSON.parse(localStorage.getItem(keyInfo))||{},
    }
  },
  getters:{
    // token
    getToken(state){
      return state.token
    },
    // info
    getInfo(state){
      console.log(state.info)
      return state.info
    }
  },
  mutations: {
    // 存储token
    setToken(state,token){
      state.token=token
      localStorage.setItem(keyToken,token)
    },
    // 存储用户信息
    setInfo(state,info){
      state.info=info
      
      localStorage.setItem(keyInfo,JSON.stringify(info))
    },
    // 退出登录
    logout(state){
      state.token=""
      state.info={}
      localStorage.clear()
    }
  }
})
export default store;