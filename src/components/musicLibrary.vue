<template>
  <div class="library-wrap">
    <header class="library-header">
      <div @click="toPersonalAdvice">个性推荐</div>
      <div>歌单</div>
      <div @click="toList">排行榜</div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    methods: {
      toPersonalAdvice () {
        this.$router.push({name: 'personalAdvice'})
      },
      toList () {
        this.$router.push({name: 'list'})
      }
    }
  }
</script>

<style scope>
  .library-wrap {
    font-size: 0.14rem;
  }
  .library-header {
    display: flex;
    height: 0.3rem;
    line-height: 0.3rem;
    background-color: #f7f7f7;
    color: #666666;
  }
  .library-header > div {
    flex: 1;
    text-align: center;
  }
</style>
