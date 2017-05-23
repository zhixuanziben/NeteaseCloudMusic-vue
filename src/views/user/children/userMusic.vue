<template>
  <div>
    <input placeholder="account" v-model="account"></input>
    <input placeholder="password" v-model="password"></input>
    <button @click="login">立即登录</button>
    <button @click="ceshi">用户信息</button>
  </div>  
</template>

<script>
  export default {
    data () {
      return {
        account: '',
        password: '',
        id: '352477511'
      }
    },
    methods: {
      login () {
        this.$http.get(`http://localhost:3000/login/cellphone?phone=${this.account}&password=${this.password}`)
          .then(res => console.log(res))
      },
      ceshi () {
        this.$http.get(`http://localhost:3000/recommend/resource`)
          .then(res => console.log(res))
      }
    }
  }
</script>

<style>
  
</style>
