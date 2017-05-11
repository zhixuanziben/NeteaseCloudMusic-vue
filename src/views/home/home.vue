<template>
  <div class="home-wrap">
    <header class="home-header">
      <div @click="showLibrary">
        <span class="icon-网易云音乐_自制"></span>
      </div>
      <div @click="mine">
        <span class="icon-我的"></span>
      </div>
      <div @click="serch">
        <span class="icon-搜索_搜索"></span>
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
      },
      mine () {
        this.$router.push({path: '/user'})
      },
      serch () {
        this.$router.push({path: '/serchPage'})
      }
    }
  }
</script>

<style lang="scss">
  .home-wrap {
    width: 100%;
    height: 100%;
    font-size: 0.3rem;
  }
  .home-header {
    display: flex;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.5rem;
    background-color: #df2d2d;
  }
  .home-header > div {
    flex: 1;
    text-align: center;
    cursor: pointer;
    color: #fff;
  }
  .icon {
    height: 0.3rem;
    width: 0.3rem;
  }
</style>
