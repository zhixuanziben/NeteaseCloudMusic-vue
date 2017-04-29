<template>
  <div class="music-list-wrap">
    <div>
      <div @click="playAllMusic">播放全部</div>
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
        this.playMusic(id, 0, true)
        for (let song of this.songs) {
          let {id, mp3Url, name, album, al, artists, ar} = song
          let imgUrl
          // 由于专辑列表与排行榜的数据结构存在一点差距，所以需要判断数据结构，然后解构赋值
          if (album) {
            ({blurPicUrl: imgUrl} = album)
          } else {
            ({picUrl: imgUrl} = al)
          }
          let musicObj = {id, url: mp3Url, name, artists: artists || ar, imgUrl: imgUrl}
          this.$store.dispatch('getMusicList', musicObj)
        }
      },
      playMusic (id, ind, ifAdd) {
        this.$http.get(`http://localhost:3000/music/url?id=${id}`)
          .then((res) => {
            if (this.songs[ind].album) {
              var artists = this.songs[ind].artists
              var imgUrl = this.songs[ind].album.blurPicUrl
            } else {
              imgUrl = this.songs[ind].al.picUrl
              artists = this.songs[ind].ar
            }
            const obj1 = {
              id: this.songs[ind].id,
              ind: this.$store.state.musicUrlList.length - this.songs.length,
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
            this.$store.dispatch('changeControllerStatus')
            if (ifAdd) {
              return
            }
            this.$store.dispatch('pushMusic', obj2)
          })
      }
    }
  }
</script>

<style lang="scss">
</style>
