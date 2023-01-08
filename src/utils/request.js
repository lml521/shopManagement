import axios from 'axios'
// 引入 enum  枚举值
import  { keyToken } from "@/enum/user.js"
import { toast } from "@/common/util"
export function request(config) {
    // 1.创建axios的实例
    const instance = axios.create({
        baseURL:'/api',
        timeout: 50000,
        method:config.method||"GET",
    })
    // 2.1.请求拦截的作用
    instance.interceptors.request.use(config => {
        const token =localStorage.getItem(keyToken)
        if (token) {
            config.headers.token = token
          }
       return config
    }, err => {
        return Promise.reject(err)
    })
    // 2.2.响应拦截
    instance.interceptors.response.use(res => {
        console.log(res)
        return Promise.resolve(res.data)
    }, err => {
        if(err.response.data.errorCode==20000||err.response.data.errorCode==40000){
            toast(err.response.data.msg,'error',)
        }
        return Promise.reject(err)
    })
    // 3.发送真正的网络请求
    return instance(config)
}