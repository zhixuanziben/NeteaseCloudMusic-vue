<template>
  <div>
    <div>
      <div>
        <span>返回</span>
        <span>专辑</span>
      </div>
      <div>
        <div>
          <img :src="data.picUrl" style="height: 100px; width: 100px">
        </div>
        <div>
          <div>{{data.name}}</div>
          <div>歌手<span v-for="item in data.artists">{{item.name}}</span> ></div>
          <div>发行时间{{data.publishTime}}</div>
        </div>
      </div>
      <div></div>
    </div>
    <music-list :songs="data.songs"></music-list>
  </div>
</template>

<script>
  import musicList from '../../components/musicList'
  export default {
    data () {
      return {
        data: ''
      }
    },
    components: {
      musicList
    },
    mounted () {
      this.$http.get(`http://localhost:3000/album/?id=${this.$route.params.id}`)
        .then((res) => {
          this.data = res.data
        })
    }
  }
</script>

<style>
  
</style>
