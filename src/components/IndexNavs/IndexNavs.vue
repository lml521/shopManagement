<template>
    <div class="mt-4">
        <el-row :gutter="20">
    <el-col :span="3" v-for="(item,index) in iconNavs" :key="index">
        <div class="grid-content ep-bg-purple" >
             <el-card shadow="hover" @click="$router.push(item.path)">
                <div class="flex flex-column align-center justify-center ">
                    <el-icon size="16" :class="item.color">
                        <!-- 动态组件 -->
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span class="text-sm mt-2">{{ item.title }}</span>
                </div>
             </el-card> 
        </div>
    </el-col>
   
  </el-row>
        <!---->
    </div>
</template>

<script setup>

const iconNavs = [
        {
            icon:"user",
            color:"text-light-blue-500",
            title:"用户",
            path:"/user/list"
        },
        {
            icon:"shopping-cart",
            color:"text-violet-500",
            title:"商品",
            path:"/goods/list"
        },
        {
            icon:"tickets",
            color:"text-fuchsia-500",
            title:"订单",
            path:"/order/list"
        },
        {
            icon:"chat-dot-square",
            color:"text-teal-500",
            title:"评价",
            path:"/comment/list"
        },
        {
            icon:"picture",
            color:"text-rose-500",
            title:"图库",
            path:"/image/list"
        },
        {
            icon:"bell",
            color:"text-green-500",
            title:"公告",
            path:"/notice/list"
        },
        {
            icon:"set-up",
            color:"text-grey-500",
            title:"配置",
            path:"/setting/base"
        },
        {
            icon:"files",
            color:"text-yellow-500",
            title:"优惠券",
            path:"/coupon/list"
        }
    ]
</script>