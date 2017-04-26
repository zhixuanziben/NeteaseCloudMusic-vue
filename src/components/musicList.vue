<template>
  <div class="music-list-wrap">
    <div>
      <div @click="playAllMusic">播放全部{{songs.length}}</div>
      <div v-for="(item, index) in songs" @click="playMusic(item.id, index)">
        <div>{{index + 1}}</div>
        <div>
          <div>{{item.name}}</div>
          <div>
            <div v-if="item.artists">
              <span v-for="(artists, index) in item.artists">{{artists.name}}<span v-if="index < (item.artists.length - 1)">/</span></span>
            - <span>{{item.album.name}}</span>
            </div>
            <div v-else>
              <span v-for="(artists, index) in item.ar">{{artists.name}}<span v-if="index < (item.ar.length - 1)">/</span></span>
            - <span>{{item.al.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['songs'],
    methods: {
      playAllMusic () {
        const {id} = this.songs[0]
        this.playMusic(id, this.$store.state.musicUrlList.length)
        for (var i = 0; i < this.songs.length; i++) {
          if (this.songs[i].album) {
            var artists = this.songs[i].artists
            var imgUrl = this.songs[i].album.blurPicUrl
          } else {
            imgUrl = this.songs[i].al.picUrl
            artists = this.songs[i].ar
          }
          let musicObj = {
            id: this.songs[i].id,
            url: this.songs[i].mp3Url,
            name: this.songs[i].name,
            artists: artists,
            imgUrl: imgUrl
          }
          this.$store.dispatch('getMusicList', musicObj)
        }
      },
      playMusic (id, ind) {
        this.$http.get(`http://localhost:3000/music/url?id=${id}`)
          .then((res) => {
            this.url = res.data.url
            if (this.songs[ind].album) {
              var artists = this.songs[ind].artists
              var imgUrl = this.songs[ind].album.blurPicUrl
            } else {
              imgUrl = this.songs[ind].al.picUrl
              artists = this.songs[ind].ar
            }
            console.log(imgUrl)
            const obj1 = {
              id: this.songs[ind].id,
              ind: this.$store.state.musicUrlList.length,
              nowMusicUrl: res.data.data[0].url,
              nowName: this.songs[ind].name,
              nowArtists: artists,
              nowImgurl: imgUrl
            }
            const obj2 = {
              imgUrl: imgUrl,
              id: id,
              url: res.data.data[0].url,
              name: this.songs[ind].name,
              artists: artists
            }
            this.$store.dispatch('changeMusic', obj1)
            this.$store.dispatch('pushMusic', obj2)
          })
      }
    }
  }
</script>

<style lang="scss">
</style>
