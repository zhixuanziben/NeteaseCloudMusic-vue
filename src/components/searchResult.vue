<template>
  <div>
    <div>
      <span>返回</span>
      <input type="text" v-model="val" @keyup.enter="submit()">
      <span>重新输入</span>
    </div>
    <div class="result-type">
      <div @click="">单曲</div>
      <div @click="toAlbum">专辑</div>
      <div @click="toArtists">歌手</div>
      <div @click="">歌单</div>
      <div>MV</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        val: ''
      }
    },
    mounted () {
      this.val = this.$route.query.val
      this.$router.push({path: '/searchResult/music', query: { val: this.$route.query.val }})
    },
    methods: {
      submit () {
        console.log('submit')
        this.$router.push({path: '/searchResult/music', query: { val: this.val }})
      },
      toAlbum () {
        console.log('cao')
        this.$router.push({path: '/searchResult/albums', query: { val: this.val }})
      },
      toArtists () {
        this.$router.push({path: '/searchResult/artists', query: { val: this.val }})
      }
    }
  }
</script>

<style scoped>
  .result-type {
    display: flex;
  }
  .result-type > div {
    flex: 1;
    text-align: center;
  }
</style>
