import { request } from "./request.js";

export const login = (data) => {
    return request({
        url:"admin/login",
        method: "POST",
       data
    })
}