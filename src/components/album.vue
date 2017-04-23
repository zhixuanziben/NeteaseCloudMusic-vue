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
    <div>
      <div>
        <div>play图标</div>
        <div>播放全部(共{{data.size}}首)</div>
      </div>
      <div v-for="(item, index) in data.songs" @click="playMusic(item.id, index, item.name, item.artists, item.album.blurPicUrl)">
        <div>
          {{index + 1}}
        </div>
        <div>
          <div>{{item.name}}</div>
          <div>
            <span v-for="it in item.artists">{{it.name}}</span>
          </div>
        </div>
        <div>
          拓展
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        data: ''
      }
    },
    mounted () {
      this.$http.get(`http://localhost:3000/album/?id=${this.$route.params.id}`)
        .then((res) => {
          this.data = res.data.album
          console.log(res.data.album)
        })
    },
    methods: {
      playMusic (id, ind, name, ar, pic) {
        console.log(id)
        const that = this
        this.$http.get(`http://localhost:3000/music/url?id=${id}`)
        .then(function (res) {
          that.url = res.data.url
          const obj1 = {
            id: id,
            ind: that.$store.state.musicUrlList.length,
            nowMusicUrl: res.data.data[0].url,
            nowName: name,
            nowArtists: ar,
            nowImgurl: pic
          }
          const obj2 = {
            imgUrl: pic,
            id: id,
            url: res.data.data[0].url,
            name: name,
            artists: ar
          }
          that.$store.dispatch('changeMusic', obj1)
          that.$store.dispatch('pushMusic', obj2)
        })
      }
    }
  }
</script>

<style>
  
</style>
