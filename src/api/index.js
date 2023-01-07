import { request } from "../utils/request";
// 主控台 首页 头部数据
export const statistics1 = (data) => {
    return request({
        url:"/admin/statistics1",
        method: "GET",
    })
}