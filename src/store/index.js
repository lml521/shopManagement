import { createStore } from 'vuex'
// 引入 enum  枚举值
 import  { keyToken } from "@/enum/user.js"
const store = createStore({
  state () {
    return {
        token:"",

    }
  },
  mutations: {
    setToken(state,token){
      state.token=token,
      localStorage.setItem(keyToken,token)
    }
  }
})
 
export default store;