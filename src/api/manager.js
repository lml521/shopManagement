// 管理员管理
import { request } from "../utils/request";
// 获取表格数据
export const getTableList = (page) => {
    return request({
        url:`/admin/manager/${page}`,
        method: "GET",
    })
}