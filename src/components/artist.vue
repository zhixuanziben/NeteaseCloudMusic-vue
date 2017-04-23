<template>
  <div>
    <div>
      <div>
        <span>返回</span>
        <span>{{data.artist.name}}</span>
        <img :src="data.artist.img1v1Url" alt="">
      </div>
      <div>
        <div>
          热门{{data.hotSongs.length}}
        </div>
        <div>
          专辑{{data.artist.albumSize}}
        </div>
        <div>
          MV
        </div>
      </div>
    </div>
    <div>
      <div v-for="(item, index) in data.hotSongs" @click="playMusic(item.id, index, item.name, item.artists, item.album.blurPicUrl)">
        <div>
          {{index + 1}}
        </div>
        <div>
          <div>{{item.name}}</div>
          <div>
            <span v-for="it in item.artists">{{it.name}}</span>-
            <span>{{item.album.name}}</span>
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
      this.$http.get(`http://localhost:3000/artists/?id=${this.$route.params.id}`)
        .then((res) => {
          this.data = res.data
          console.log(res.data)
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
