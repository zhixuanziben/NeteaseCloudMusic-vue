<template>
  <div id="app">
    <router-view class="view-wrap"></router-view>
    <music-controller class="player"></music-controller>
  </div>
</template>

<script>
  import musicController from './components/musicController'
  export default {
    components: {
      musicController
    }
  }
</script>

<style>
  .player {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #F9FAFC;
    
  }
  .view-wrap {
    margin-bottom: 1.2rem;
  }
</style>
