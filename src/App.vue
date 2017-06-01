<template>
  <div id="app" class="app">
    <router-view :class="{'view-wrap': showController}"></router-view>
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
    padding-bottom: 0.8rem;
  }
  .loding {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
