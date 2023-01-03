import axios from 'axios'
// 引入 enum  枚举值
import  { keyToken } from "@/enum/user.js"
export function request(config) {
    // 1.创建axios的实例
    const instance = axios.create({
        baseURL:`http://shopadmin.dishawang.com/api/`,
        timeout: 50000,
        method:config.method||"GET"
    })
    // 2.1.请求拦截的作用
    instance.interceptors.request.use(config => {
        console.log(config)
        const token =localStorage.getItem('keyToken')
        if(token){
            token=token
        }
        return config
    }, err => {
        console.log(err);
    })
    // 2.2.响应拦截
    instance.interceptors.response.use(res => {
        console.log(res)
        return res.data
    }, err => {
        console.log(err);
    })
    // 3.发送真正的网络请求
    return instance(config)
}