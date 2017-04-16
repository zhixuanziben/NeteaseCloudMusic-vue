<template>
  <div>
    <div class="personal-header">
      <div @click="getPersonalFM">
        私人FM
      </div>
      <div>
        每日歌曲推荐
      </div>
      <div>
        云音乐热歌榜
      </div>
    </div>
    <audio src="http://m10.music.126.net/20170416113847/33a878f217e8d356f5380597d9166b16/ymusic/f1ae/0bd1/31a9/5d64960d0cbebc0d089bc85a6ef54680.mp3"  controls autoplay>adsasd</audio>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        url: ''
      }
    },
    mounted () {
    },
    methods: {
      getPersonalFM () {
        // this.$http.jsonp('http://www.zhixuanvip.com/recommend/resource')
        // .then(function (res) {
          // console.log(res)
        // })
        this.$http.get('http://www.zhixuanvip.com/music/url?id=347230')
        .then(function (res) {
          console.log(res.data.data[0].url)
          this.url = res.data.data[0].url
        })
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
