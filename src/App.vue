<template>
  <div id="app" class="app">
    <keep-alive>
      <router-view v-if="!$route.meta.notKeepAlive"></router-view>
    </keep-alive>
    <router-view v-if="$route.meta.notKeepAlive"></router-view>
    <music-controller class="player" v-show="showController"></music-controller>
  </div>
</template>

<script>
  import musicController from './components/musicController'
  export default {
    components: {
      musicController
    },
    computed: {
      showController () {
        return this.$store.state.isController
      }
    }
  }
</script>

<style lang="scss">
  .player {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #F9FAFC;
    
  }
  .view-wrap {
    margin-bottom: 0.8rem;
  }
</style>
