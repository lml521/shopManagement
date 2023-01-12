// 公告管理
import { request } from "@/utils/request";
// 获取表格数据
export const getTableList =(page)=>{
    return request({
        url:`/admin/notice/${page}`,
        method:"GET"
    })
}

// 添加
export const getAdd=(data)=>{
    return request({
        url:"/admin/notice",
        method:"POST",
        data,
    })
}

// 删除
export const getDelete =(id)=>{
    return request({
        url:`/admin/notice/${id}/delete`,
        method:"POST"
    })
}

// 修改
export const getEdit=(id,data)=>{
    return request({
        url:`/admin/notice/${id}`,
        method:"POST",
        data
    })
}

