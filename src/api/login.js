import { request } from "../utils/request";
// 登录
export const login = (data) => {
    return request({
        url:"/admin/login",
        method: "POST",
       data
    })
}
// 获取用户信息
export const getinfo=()=>{
    return request({
        url:"/admin/getinfo",
        method: "POST",
    })
}
// 退出登录
export const logout=()=>{
    return request({
        url:"/admin/logout",
        method: "POST",
    })
}

// 修改密码
export const updatePassword=(data)=>{
    return request({
        url:"/admin//updatepassword",
        method: "POST",
        data
    })
}