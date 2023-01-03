import { createStore } from 'vuex'
// 引入 enum  枚举值
 import  { keyToken } from "../enum/user.js"
const store = createStore({
  state () {
    return {
        token:localStorage.getItem(keyToken)||"",
    }
  },
  mutations: {
    // 存储token
    setToken(state,token){
      state.token=token,
      localStorage.setItem(keyToken,token)
    },
    // 退出登录
    logout(state){
      state.token="",
      localStorage.removeItem(keyToken)
    }
  }
})
 
export default store;