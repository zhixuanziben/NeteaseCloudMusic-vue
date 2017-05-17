<template>
  <div>
    <list-title title="专辑"></list-title>
    <div>
      <div>
        <img :src="data.album.picUrl">
      </div>
      <div>
        <div>{{data.album.name}}</div>
        <div>歌手：<span v-for="item in data.album.artists">{{item.name}}</span> ></div>
        <div>发行时间：{{(new Date(data.album.publishTime)).getFullYear()}}.{{(new Date(data.album.publishTime)).getMonth()+1}}.{{(new Date(data.album.publishTime)).getDate()}}</div>
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
          this.info = res.data.album.info
        })
    }
  }
</script>

<style>
  
</style>
