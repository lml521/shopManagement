import { request } from "../utils/request";
// 图库管理 侧边数据
export const imageNameList = (page) => {
    return request({
        url:`/admin/image_class/${page}`,
        method: "GET",
    })
}

// 图库管理 右侧数据
export const  getImageList =(id,page)=>{
    return request({
        url:`/admin/image_class/${id}/image/${page}`,
        method:"GET"
    })
}