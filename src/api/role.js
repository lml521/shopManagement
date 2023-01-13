// 管理员管理
import { request } from "../utils/request";
// 获取表格数据
export const getTableList = (page) => {
    return request({
        url:`/admin/role/${page}`,
        method: "GET",
    })
}
// 请求 权限 数据 
export const getRuleList = (page) => {
    return request({
        url:`/admin/rule/1`,
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

// 搜索 
export const getSearch=(page,title)=>{
    return request({
        url:`admin/manager/${page}?keyword=${title}`,
        method: "GET",
    })
}

// 切换 状态 值 
export const getChangeStatus=(id,status)=>{
    return request({
        url:`/admin/role/${id}/update_status`,
        method: "POST",
        data:{
            status,
        }
    })
}

// 删除
export const getDelete =(id)=>{
    return request({
        url:`/admin/role/${id}/delete`,
        method:"POST"
    })
}

// 添加
export const getAdd=(data)=>{
    return request({
        url:"/admin/role",
        method:"POST",
        data,
    })
}

// 修改
export const getEdit=(id,data)=>{
    return request({
        url:`/admin/role/${id}`,
        method:"POST",
        data
    })
}
