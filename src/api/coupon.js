// 管理员管理
import { request } from "../utils/request";
// 获取表格数据
export const getTableList = (page) => {
    return request({
        url:`/admin/coupon/${page}`,
        method: "GET",
    })
} 

// 删除
export const getDelete =(id)=>{
    return request({
        url:`admin/coupon/${id}/delete`,
        method:"POST",
    })
}

// 添加
export const getAdd=(data)=>{
    return request({
        url:"/admin/coupon",
        method:"POST",
        data,
    })
}

// 修改
export const getEdit=(id,data)=>{
    return request({
        url:`/admin/coupon/${id}`,
        method:"POST",
        data
    })
}
// 失效
export const getLoseEfficacy=(id,data)=>{
    
    return request({
        url:`/admin/coupon/${id}/update_status`,
        method:"POST",
        data
    })
}