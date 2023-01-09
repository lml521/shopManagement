import { router, addRoutes } from "@/router"
// 引入 NProgress  进度条
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";
import { toast, showFullLoading, hideFullLoading } from "@/common/util"
import store from "@/store"


let hasGetInfo = false
router.beforeEach(async (to, from, next)=>{
    // 显示loading
    showFullLoading()
    
    const token = localStorage.getItem("token")

    // 如果没有token而且不是在登录页,那么强制跳转回登录页
    if(!token && to.path != "/login" ){
        toast("请先登录","error")
        return next({ path:"/login" })
    }

    // 防止重复登录的判断
    if(token && to.path == "/login"){
        toast("请勿重复登录","error")
        return next({ path:from.path ? from.path : "/" })
    }

    let hasNewRoutes = false

    if(token && !hasGetInfo){
        let { menus } = await store.dispatch("getinfo")
        hasGetInfo = true
        hasNewRoutes = addRoutes(menus)
    }

    let title = (to.meta.title ? to.meta.title : "") + "-商品后台"
    // 给document.title赋值
    document.title = title
    // 如果有新的路由手动指定路由，否则调用next
    hasNewRoutes ? next(to.fullPath) : next()
})

router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  hideFullLoading()
});