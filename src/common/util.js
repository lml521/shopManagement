// 引入通知组件
import { ElNotification, ElMessageBox } from 'element-plus'
// 引入loading插件
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// 消息提示统一方法
// dangerouslyUseHTMLString表示是否将 message 属性作为 HTML 片段渲染出来
export function toast(message, type = "success", dangerouslyUseHTMLString = true){
    ElNotification({
        message,
        type,
        // 三秒后关闭
        duration:3000,
        dangerouslyUseHTMLString
    })
}

// 消息提示框
export function showModal(content = "提示内容", type = "warning", title = ""){
    return ElMessageBox.confirm(
        content,
        title,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type,
        }
      )
}

NProgress.configure({
        easing: "ease", // 动画方式
        speed: 500, // 递增进度条的速度
        showSpinner: true, // 是否显示加载ico
        trickleSpeed: 200, // 自动递增间隔
        minimum: 0.3, // 初始化时的最小百分比
      });

// 显示全屏loading
export function showFullLoading(){
    NProgress.start()
}

// 隐藏全屏loading
export function hideFullLoading(){
    NProgress.done()
}