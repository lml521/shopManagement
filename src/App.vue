<template>
  <div>
    <!-- <div>
       <button @click="getlogin">123</button>
      <div >{{$store.state.name}}</div>
    <router-link to='/Home'> Home</router-link>|
    <router-link to='/Contact'>Contact </router-link>
  </div> -->
  <router-view></router-view>
  </div>
</template>

<style scoped>
</style>
<script setup>
import {login} from "@/api/index"//引入api
import {useStore} from "vuex"
const store =useStore()
const getlogin=async()=>{
  let res =await login({
    password:"admin",username:"admin"
  })
  console.log(123,res)
  store.commit('setToken',res.data.token)

}
</script>
