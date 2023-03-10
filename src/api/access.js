// 权限管理
import { request } from "../utils/request";
// 获取表格数据
export const getTableList = (page=1) => {
    return request({
        url:`admin/rule/${page}`,
        method: "GET",
    })
}

// 切换 状态 值 
export const getChangeStatus =(id,status)=>{
    return request({
        url:`/admin/rule/${id}/update_status`,
        method: "POST",
        data:{
            status,
        }
    })
}


// 删除
export const getDelete =(id)=>{
    return request({
        url:`/admin/rule/${id}/delete`,
        method:"POST"
    })
}

// 添加
export const getAdd=(data)=>{
    return request({
        url:"admin/rule",
        method:"POST",
        data,
    })
}

// 修改
export const getEdit=(id,data)=>{
    return request({
        url:`/admin/rule/${id}`,
        method:"POST",
        data
    })
}
