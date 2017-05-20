<template>
  <div>
    <list-title title="专辑"></list-title>
    <div class="album-msg-wrap">
      <div class="album-pic">
        <img :src="album.picUrl">
      </div>
      <div class="album-msg">
        <h3>{{album.name}}</h3>
        <p>歌手：<span v-for="item in album.artists">{{item.name}}</span> ></p>
        <p>发行时间：{{(new Date(album.publishTime)).getFullYear()}}.{{(new Date(album.publishTime)).getMonth()+1}}.{{(new Date(album.publishTime)).getDate()}}</p>
      </div>
    </div>
    <musiclist-bar 
      :collectionCount="info.likedCount"
      :commentCount="info.commentCount"
      :shareCount="info.shareCount">
    </musiclist-bar> 
    <music-list :songs="data.songs"></music-list>
  </div>
</template>

<script>
  import musicList from '../../components/musicList'
  import listTitle from '../../components/listTitle'
  import musiclistBar from '../../components/musicListBar'
  export default {
    data () {
      return {
        data: '',
        album: '',
        info: ''
      }
    },
    components: {
      listTitle,
      musicList,
      musiclistBar
    },
    mounted () {
      this.$http.get(`http://localhost:3000/album/?id=${this.$route.params.id}`)
        .then((res) => {
          this.data = res.data
          this.album = res.data.album
          this.info = res.data.album.info
        })
    }
  }
</script>

<style lang="scss" scoped>
  .album-msg-wrap {
    display: flex;
    .album-pic {
      width: 40%;
      padding: 0.2rem;
      img {
        width: 100%;
      }
    }
    .album-msg {
      flex: 1;
      padding: 0.2rem;
    }
  }
</style>
