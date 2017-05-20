<template>
  <div class="mv-details-wrap">
    <div class="mv-details-header">
      {{name}}
    </div>
    <div class="mv-details-msg">
      <div class="mv-details-arts">
        歌手：<span v-for="(artist, index) in artists">{{artist.name}}<span v-if="index < (artists.length - 1)">/</span></span>
      </div>
      <div class="mv-details-count">
        播放：{{playCount}}次
      </div>
    </div>
    <div class="mv-details-time">
      发行时间: {{publishTime}}
    </div>
    <div class="mv-details-desc">
      {{desc}}
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        name: '',
        artistName: '',
        artists: [],
        playCount: '',
        subCount: '',
        publishTime: '',
        desc: ''
      }
    },
    activated () {
      this.$http.get(`http://localhost:3000/mv?mvid=${this.$route.params.id}`).then((res) => {
        this.MVURL = `http://localhost:3000/mv/url?url=${res.data.data.brs[240]}`
        console.log(res.data.data)
        this.name = res.data.data.name
        this.artistName = res.data.data.artistName
        this.artists = res.data.data.artists
        this.playCount = res.data.data.playCount
        this.publishTime = res.data.data.publishTime
        this.desc = res.data.data.desc
      })
    },
    created: function () {
      console.log(1)
    },
    mounted: function () {
      console.log(2)
    },
    deactivated: function () {
      console.log(4)
    }
  }
</script>

<style lang="scss" scoped>
  .mv-details-wrap {
    padding: 0 0.1rem;
    color: #333;
    .mv-details-header {
      margin-top: 0.2rem;
      font-size: 0.28rem;
    }
    .mv-details-msg {
      margin-top: 0.1rem;
      display: flex;
      font-size: 0.13rem;
      color: #999;
      .mv-details-arts {
        color: #0c73c2;
        border-right: 1px solid #999;
        width: 50%;
      }
      .mv-details-count {
        padding-left: 0.3rem;
        width: 50%;
      }
    }
    .mv-details-time {
      color: #999;
      font-size: 0.12rem;
      margin-top: 0.1rem;
    }
    .mv-details-desc {
      margin-top: 0.1rem;
      font-size: 0.15rem;
    }
  }
</style>
