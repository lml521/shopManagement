// 管理员管理
import { request } from "../utils/request";
// 获取表格数据
export const getTableList = (page) => {
    return request({
        url:`/admin/manager/${page}`,
        method: "GET",
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
        url:`/admin/manager/${id}/update_status`,
        method: "POST",
        data:{
            status,
        }
    })
}

// 删除
export const getDelete =(id)=>{
    return request({
        url:`/admin/manager/${id}/delete`,
        method:"POST"
    })
}

// 添加
export const getAdd=(data)=>{
    return request({
        url:"/admin/manager",
        method:"POST",
        data,
    })
}

// 修改
export const getEdit=(id,data)=>{
    return request({
        url:`/admin/manager/${id}`,
        method:"POST",
        data
    })
}
