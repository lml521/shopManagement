// 管理员管理
import { request } from "../utils/request";
// 获取表格数据
export const getTableList = (page) => {
    return request({
        url:`/admin/skus/${page}`,
        method: "GET",
    })
}
// 请求 权限 数据
export const getRuleList = (page) => {
    return request({
        url:`/admin/skus/1`,
        method: "GET",
    })
}
// 设置权限
export const setRules = (data) => {
    return request({
        url:`admin/role/set_rules`,
        method: "POST",
        data
    })
}
// 切换 状态 值
export const getChangeStatus=(id,status)=>{
    return request({
        url:`/admin/skus/${id}/update_status`,
        method: "POST",
        data:{
            status,
        }
    })
}
// 删除
export const getDelete =(data)=>{
    return request({
        url:`admin/skus/delete_all`,
        method:"POST",
        data
    })
}
// 添加
export const getAdd=(data)=>{
    return request({
        url:"/admin/skus",
        method:"POST",
        data,
    })
}
// 修改
export const getEdit=(id,data)=>{
    return request({
        url:`/admin/skus/${id}`,
        method:"POST",
        data
    })
}
