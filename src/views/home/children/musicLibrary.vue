<template>
  <div class="library-wrap">
    <div class="library-navwrap">
      <header class="library-header">
        <router-link :to="{name: 'personalAdvice'}">个性推荐</router-link>
        <router-link :to="{name: 'songList'}">歌单</router-link>
        <router-link :to="{name: 'songList'}">主播电台</router-link>
        <router-link :to="{name: 'list'}">排行榜</router-link>
      </header>
    </div> 
    <router-view class="library-view"></router-view>
  </div>
</template>

<script>
  export default {
    methods: {
      toPersonalAdvice () {
        this.$router.push({name: 'personalAdvice'})
      },
      toSongList () {
        this.$router.push({name: 'songList'})
      },
      toList () {
        this.$router.push({name: 'list'})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .library-wrap {
    font-size: 0.14rem;
    .library-navwrap {
      position: fixed;
      top: 1rem;
      width: 100%;
      z-index: 999;
      .library-header {
        display: flex;
        height: 0.8rem;
        line-height: 0.4rem;
        background-color: #fcfdfd;
        color: #666;
        font-size: 0.18rem;
        > a {
          flex: 1;
          color: #666;
          line-height: 0.8rem;
          text-align: center;
        }
        .router-link-active {
          color: #df2d2d;
          text-decoration: none;
          border-bottom: 2px solid #df2d2d;
        }
      }
    }
    .library-view {
      margin-top: 1.8rem;
    }
  }
</style>
