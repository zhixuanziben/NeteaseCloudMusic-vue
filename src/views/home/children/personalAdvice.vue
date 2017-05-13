<template>
  <div>
    <div class="personal-header">
      <div class="personal-header-fm">
        <div class="personal-header-icon">
          <span class="icon-收音机"></span>
        </div>
        <span>私人FM</span>
      </div>
      <div @click="recommendSongs" class="personal-header-songs">
        <div>
          {{(new Date()).getDate()}}
        </div>
        <span>每日歌曲推荐</span>
      </div>
      <div @click="goHotList" class="personal-header-hot">
        <div>
          <span class="icon-排行榜"></span>
        </div>
        <span>云音乐热歌榜</span>
      </div>
    </div>
    <section class="advice-songList-wrap session">
      <div class="advice-header">
        <span class="icon-日推"></span> 
        <span class="advice-title">推荐歌单</span>
        <span @click="more">更多</span>
        <span class="icon-右键"></span>
      </div>
      <div class="advice-songList-box">
        <div v-for="item in songList" @click="goListContent(item.id)" class="advice-songList">
          <img :src="item.picUrl" alt="">
          <span class="advice-songList-count">
            <span class="icon-耳机"></span>
            <span v-if="item.playCount > 100000">
              {{Math.floor(item.playCount/10000)}}万
            </span>
            <span v-else>
              {{item.playCount}}
            </span>
          </span>
          <div>{{item.name}}</div>
        </div>
      </div>
    </section>
    <section class="session">
      <div class="advice-header">
        <span class="icon-专辑"></span>
        <span class="advice-title">最新音乐</span>
        <span>更多</span>
        <span class="icon-右键"></span>
      </div>
      <div class="each-new-music-wrap">
        <div v-for="item in newAlbums" @click="toAlbumMsg(item.id)" class="each-new-music">
          <img :src="item.picUrl" alt="">
          <div class="each-new-music-name">{{item.name}}</div>
          <div class="each-new-music-artists">
            <span v-for="(artists, index) in item.artists">{{artists.name}}<span v-if="index < (item.artists.length - 1)">/</span></span>
          </div>
        </div>
      </div>
    </section>
    <section class="advice-songList-wrap session">
      <div class="advice-header">
        <span class="icon-视频"></span> 
        <span class="advice-title">推荐MV</span>
        <span @click="more">更多</span>
        <span class="icon-右键"></span>
      </div>
      <div class="advice-songList-box">
        <div v-for="item in MVList" @click="getMvUrl(item.id)" class="advice-songList">
          <img :src="item.picUrl" alt="">
          <span class="advice-songList-count">
            <span class="icon-视频"></span>
            <span v-if="item.playCount > 100000">
              {{Math.floor(item.playCount/10000)}}万
            </span>
            <span v-else>
              {{item.playCount}}
            </span>
          </span>
          <div>{{item.name}}</div>
          <span class="each-mv-artists" v-for="(artists, index) in item.artists">{{artists.name}}<span v-if="index < (item.artists.length - 1)">/</span></span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        songList: [],
        newAlbums: [],
        MVList: [],
        MVURL: ''
      }
    },
    mounted () {
      this.$http.get('http://localhost:3000/personalized').then((res) => {
        this.songList = res.data.result
      })
      this.$http.get('http://localhost:3000/top/album?offset=0&limit=6').then((res) => {
        this.newAlbums = res.data.albums
      })
      this.$http.get('http://localhost:3000/personalized/mv').then((res) => {
        this.MVList = res.data.result
      })
    },
    methods: {
      goListContent (ind) {
        console.log(`/playList/${ind}`)
        this.$router.push({path: `/playList/${ind}`})
      },
      toAlbumMsg (id) {
        this.$router.push({path: `/album/${id}`})
      },
      recommendSongs () {
        this.$router.push({path: `/recommendSongs`})
      },
      goHotList () {
        this.$router.push({path: '/listContent/1'})
      },
      more () {
        this.$router.push({path: '/musicLibrary/songList'})
      },
      getMvUrl (id) {
        this.$router.push({path: `/mv/${id}`})
      }
    }
  }
</script>

<style lang="scss">
  .personal-header {
    display: flex;
    padding: 0.4rem 0 0 0;
    > div {
      flex: 1;
      text-align: center;
      color: #333;
      border-bottom: 1px solid #d9dbdc;
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        margin-bottom: 0.1rem;
        border: 2px solid #ce3d3e;
        width: 1rem;
        height: 1rem;
        font-size: 0.5rem;
        color: #ce3d3e;
        border-radius: 50%;
      }
      > span {
        display: block;
        margin-bottom: 0.2rem;
        color: #333;
        font-size: 0.18rem;
      }
    }
  }
  .session {
    padding: 0 0.2rem;
  }
  .advice-header {
    display: flex;
    font-size: 0.2rem;
    height: 0.6rem;
    line-height: 0.6rem;
    .advice-title {
      flex: 1;
    }
    .icon-右键,
    .icon-日推,
    .icon-专辑,
    .icon-视频 {
      line-height: 0.63rem;
      margin-right: 0.1rem;
    }
  }
  .advice-songList-box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .advice-songList {
      width: 48.5%;
      position: relative;
      margin-bottom: 0.15rem;
      font-size: 0.15rem;
      img {
        width: 100%;
        overflow: hidden;
        border: 1px solid #E5E9F2;
      }
      .advice-songList-count {
        position: absolute;
        right: 0;
        top: 0;
        color: #fff;
      }
    }
  }
  .each-new-music-wrap {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .each-new-music {
      width: 32%;
      margin-bottom: 0.2rem;
      img {
        width: 100%;
        border: 1px solid #E5E9F2;
      }
      .each-new-music-name,
      .each-new-music-artists {
        width: 90%;
        margin: 0 auto;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
    }
  }
  .each-new-music-artists,
  .each-mv-artists {
    color: #999;
  }
</style>
