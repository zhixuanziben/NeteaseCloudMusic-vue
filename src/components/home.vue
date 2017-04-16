<template>
  <div class="home-wrap">
    <header class="home-header">
      <div @click="showLibrary">音乐馆</div>
      <div>我的</div>
      <div>
        <icon name="serch" class="icon"></icon>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    methods: {
      showLibrary () {
        this.$router.push({path: '/musicLibrary'})
      }
    }
  }
</script>

<style scope>
  .home-wrap {
    width: 100%;
    font-size: 0.16rem;
  }
  .home-header {
    display: flex;
    height: 0.5rem;
    line-height: 0.5rem;
    background-color: #df2d2d;
  }
  .home-header > div {
    flex: 1;
    text-align: center;
    cursor: pointer;
    color: #fff;
  }
  .icon {
    height: 0.16rem;
    width: 0.16rem;
  }
</style>
