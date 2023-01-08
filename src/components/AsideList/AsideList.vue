<template>
    <div class="aside-list " :class="{'active':active}">
        <span  class="truncate">
            <slot/>
        </span>
        <div style="white-space:nowrap" >

            <span class="px-1" @click="$emit('handleEdit')">
            <el-icon color="#409eff" >
                <Edit />
            </el-icon>
            </span>

            <span class="px-1" @click="$emit('handleDelete')">
             <el-icon color="#409eff">
                 <Close />
            </el-icon> 
            </span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    active:{
        type:Boolean,
        defalut:false,
    }
});

</script>

<style lang='scss' scoped>
.aside-list{
    border-bottom: 1px solid #f4f4f4;
    cursor: pointer;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    font-size: .875rem;
    line-height: 1.25rem;
    padding: .75rem;
    --tw-text-opacity: 1;
    color: rgba(75,85,99,var(--tw-text-opacity));
}
.active{
    --tw-bg-opacity: 1;
    background-color: rgba(239,246,255,var(--tw-bg-opacity));
}
</style>