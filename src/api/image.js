// 图书管理
import { request } from "../utils/request";
// 新增图片分类 提交
export const getSubmit =(data)=>{
    return request({
        url:'/admin/image_class',
        method: "POST",
        data
    })
}
// 图库管理 侧边数据
export const imageNameList = (page) => {
    return request({
        url:`/admin/image_class/${page}`,
        method: "GET",
    })
}

// 修改 侧边名称
export const getName = (data) => {
    return request({
        url:`/admin/image_class/${data.id}`,
        method: "POST",
        data,
    })
}

//  删除 侧边数据
export const deleteName = (id) => {
    return request({
        url:`/admin/image_class/${id}/delete`,
        method: "POST",
    })
}

// 图库管理 右侧数据
export const  getImageList =(id,page)=>{
    return request({
        url:`/admin/image_class/${id}/image/${page}`,
        method:"GET"
    })
}

// 重命名
export const getHandleRename = (name,id) => {
    return request({
        url:`/admin/image/${id}`,
        method: "POST",
        data:{
            name,
        }
    })
}

// 删除 图片
export const deleteImage = (data) => {
    return request({
        url:'/admin/image/delete_all',
        method: "POST",
        data
    })
}