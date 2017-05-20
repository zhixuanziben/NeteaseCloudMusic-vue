<template>
  <div>
    <music-list :songs="hotSongs"></music-list>
  </div>
</template>

<script>
  import musicList from '../../../components/musicList'
  export default {
    data () {
      return {
        hotSongs: []
      }
    },
    components: {
      musicList
    },
    mounted () {
      this.$http.get(`http://localhost:3000/artists/?id=${this.$route.params.id}`)
        .then((res) => {
          this.hotSongs = res.data.hotSongs
        })
    }
  }
</script>

<style lang="scss" scoped>
  
</style>
