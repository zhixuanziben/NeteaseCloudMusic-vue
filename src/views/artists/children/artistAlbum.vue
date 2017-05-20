<template>
  <div>
    <div v-for="item in albums" @click="toAlbumMsg(item.id)" class="each-album">
      <div class="each-album-pic">
        <img :src="item.blurPicUrl" alt="">
      </div>
      <div class="each-album-msg">
        <h3>
          {{item.name}}
        </h3>
        <p>
          {{new Date(item.publishTime).getFullYear()}}.{{new Date(item.publishTime).getMonth() + 1}}.{{new Date(item.publishTime).getDate()}}
          歌曲{{item.size}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        albums: []
      }
    },
    mounted () {
      this.$http.get(`http://localhost:3000/artist/album?id=${this.$route.params.id}`)
        .then((res) => {
          console.log(res.data)
          this.albums = res.data.hotAlbums
        })
    }
  }
</script>

<style lang="scss" scoped>
  .each-album {
    display: flex;
    .each-album-pic {
      width: 1rem;
      height: 1rem;
      padding: 0.1rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .each-album-msg {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom: 1px solid #999;
      > p {
        font-size: 0.12rem;
        color: #999;
      }
    }
  }
</style>
