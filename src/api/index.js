import { request } from "../utils/request";
// 主控台 首页 头部数据
export const getStatistics1 = () => {
    return request({
        url:"/admin/statistics1",
        method: "GET",
    })
}

// 主控台 店铺及商品提示  店铺及商品提示 数据
export const getStatistics2 = () => {
    return request({
        url:"/admin/statistics2",
        method: "GET",
    })
}

// 主控台 订单统计 数据
export const getStatistics3 = (data) => {
    console.log(data)
    return request({
        url:`/admin/statistics3?type=${data.type}`,
        method: "GET",
    })
}