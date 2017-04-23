<template>
  <div>
    <div class="personal-header">
      <div>
        私人FM
      </div>
      <div>
        每日歌曲推荐
      </div>
      <div>
        云音乐热歌榜
      </div>
    </div>
    <div>
      <h2>推荐歌单</h2>
      <div>
        <div v-for="item in songList" @click="goListContent(item.id)">
          <img :src="item.picUrl" alt="" style="width: 200px; height: 200px">
          <span>{{item.playcount/10000}}万</span>
          <div>{{item.name}}</div>
        </div>
      </div>
    </div>
    <div>
      <h2>最新音乐</h2>
      <div>
        <div v-for="item in newAlbums" @click="toAlbumMsg(item.id)">
          <img :src="item.picUrl" alt="" style="width: 200px; height: 200px">
          <div>{{item.name}}</div>
          <span v-for="(artists, index) in item.artists">{{artists.name}}<span v-if="index < (item.artists.length - 1)">/</span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        songList: [],
        newAlbums: []
      }
    },
    mounted () {
      this.$http.get('http://localhost:3000/recommend/resource').then((res) => {
        this.songList = res.data.recommend
      })
      this.$http.get('http://localhost:3000/new_albums?offset=0&limit=6').then((res) => {
        this.newAlbums = res.data.albums
      })
    },
    methods: {
      goListContent (ind) {
        console.log(`/playList/${ind}`)
        this.$router.push({path: `/playList/${ind}`})
      },
      toAlbumMsg (id) {
        this.$router.push({path: `/album/${id}`})
      }
    }
  }
</script>

<style scope>
  .personal-header {
    display: flex;
  }
  .personal-header > div {
    flex: 1;
    text-align: center;
  }
</style>
