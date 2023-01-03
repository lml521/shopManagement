<template>
  <div>
    <div>
      <div >{{$store.state.name}}</div>
    <router-link to='/Home'> Home</router-link>|
    <router-link to='/Contact'>Contact </router-link>
  </div>
  <router-view></router-view>
  </div>
  
</template>

<style scoped>
</style>
<script setup>
</script>
