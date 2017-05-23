<template>
  <div class="music-list-wrap">
    <div>
      <div @click="playAllMusic" class="play-all" v-if="playallShow">
        <div class="play-all-icon">
          <span class="icon-play"></span>
        </div>
        <div class="play-all-msg">
          播放全部
        </div>
      </div>
      <div v-for="(item, index) in songs" class="each-music">
        <div class="each-music-index" v-if="indShow">{{index + 1}}</div>
        <div class="each-music-msg" @click="playMusic(item.id, index)">
          <div class="each-music-name">{{item.name}}</div>
          <div class="each-music-artists">
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
        <div class="each-music-more"  @click="openBottomSheet(item)">
          <span class="icon-省略"></span>
        </div>
      </div>
    </div>
    <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
      <mu-list @itemClick="closeBottomSheet">
        <mu-sub-header>
          歌曲: {{msg.name}}
        </mu-sub-header>
        <mu-list-item title="下一首播放" @click="next(msg)">
        </mu-list-item>
        <mu-list-item title="收藏到歌单" @click="collection(msg.id)"/>
        <mu-list-item title="评论" @click="toComment(msg.id)"/>
        <mu-list-item :title="'歌手:' + artists" @click="toArtist(artist[0].id)">
        </mu-list-item>
        <mu-list-item :title="'专辑:' + album" @click="toAlbum(albums.id)">
        </mu-list-item>
        <mu-list-item title="查看MV" @click="toMV(mvid)" v-if="mvid">
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>
    <more-msg :msg="$store.state.moreMsg" class="more-msg" v-if="isShow" @hidden="hideMore"></more-msg>
  </div>
</template>

<script>
  import moreMsg from './moreMsg'
  export default {
    data () {
      return {
        isShow: false,
        bottomSheet: false,
        artists: '',
        album: ''
      }
    },
    props: {
      songs: {
        type: Array
      },
      indShow: {
        type: Boolean,
        default: true
      },
      playallShow: {
        type: Boolean,
        default: true
      }
    },
    components: {
      moreMsg
    },
    computed: {
      msg () {
        return this.$store.state.moreMsg
      },
      artist () {
        return this.$store.state.moreMsg.artists || this.$store.state.moreMsg.ar
      },
      albums () {
        return this.$store.state.moreMsg.album || this.$store.state.moreMsg.al
      },
      mvid () {
        return this.$store.state.moreMsg.mvid || this.$store.state.moreMsg.mv
      }
    },
    methods: {
      playAllMusic () {
        const {id} = this.songs[0]
        this.playMusic(id, 0, true, this.$store.state.musicUrlList.length)
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
      // id是音乐id，ind是即将播放的音乐在页面音乐列表的序列号，ifadd表示是否要添加这个即将播放的音乐到列表，len表示音乐仓库的长度
      playMusic (id, ind, ifAdd, len) {
        console.log(ind)
        this.$http.get(`http://localhost:3000/music/url?id=${id}`)
          .then((res) => {
            console.log(ind)
            // 这个ind是页面音乐列表的序列
            if (this.songs[ind].album) {
              var artists = this.songs[ind].artists
              var imgUrl = this.songs[ind].album.blurPicUrl
            } else {
              imgUrl = this.songs[ind].al.picUrl
              artists = this.songs[ind].ar
            }
            console.log(this.$store.state.musicUrlList.length)
            let nowInd = null
            if (len || len === 0) {
              nowInd = len
            } else {
              nowInd = this.$store.state.musicUrlList.length
            }
            console.log(len)
            console.log(nowInd)
            // 下面这个ind是当前播放音乐在音乐仓库的序列
            const obj1 = {
              id: this.songs[ind].id,
              ind: nowInd,
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
            this.$store.dispatch('changePlayStatus', true)
            this.$store.dispatch('changeControllerStatus', true)
            if (ifAdd) {
              return
            }
            this.$store.dispatch('pushMusic', obj2)
          })
      },
      showMore (obj) {
        this.$store.dispatch('getMoreMsg', obj)
        // this.isShow = !this.isShow
        console.log(this.isShow)
      },
      hideMore () {
        this.isShow = false
      },
      closeBottomSheet () {
        this.bottomSheet = false
      },
      openBottomSheet (obj) {
        this.$store.dispatch('getMoreMsg', obj)
        const ar = this.msg.ar ? this.msg.ar : this.msg.artists
        let arr = []
        for (var item of ar) {
          arr.push(item.name)
        }
        this.artists = arr.join('/')
        this.album = this.msg.al ? this.msg.al.name : this.msg.album.name
        this.bottomSheet = true
      },
      next ({artists, id, name, album: {picUrl}, mp3Url}) {
        const ind = this.$store.state.nowMusic.ind
        const obj = {
          artists,
          id,
          imgurl: picUrl,
          name,
          url: mp3Url,
          ind
        }
        this.$store.dispatch('nextPlayMusic', obj)
        this.$emit('hidden')
      },
      collection (id) {
        this.$http.get(`http://localhost:3000/playlist/tracks?op=add&pid=495727117&tracks=${id}`)
          .then((res) => {
            console.log(res.data)
            this.$emit('hidden')
          })
      },
      toComment (id) {
        this.$store.dispatch('saveCommentType', 0)
        this.$router.push({path: `/comment/${id}`})
      },
      toArtist (id) {
        console.log(id)
        this.$router.push({path: `/artist/${id}`})
      },
      toAlbum (id) {
        this.$router.push({path: `/album/${id}`})
      },
      toMV (id) {
        this.$router.push({path: `/mv/${id}`})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .left-icon {
    line-height: 0.8rem;
    text-align: center;
    width: 0.8rem;
    height: 0.8rem;
    color: #999;
    font-size: 0.2rem;
  }
  $border: 1px solid #e1e6e4;
  .play-all {
    display: flex;
    border-bottom: $border;
    background-color: #f1f6f4;
    .play-all-icon {
      @extend .left-icon
    }
    .play-all-msg {
      flex: 1;
      font-size: 0.18rem;
      line-height: 0.8rem;
    }
  }
  .each-music {
    display: flex;
    height: 0.8rem;
    background-color: #f1f6f4;
    .each-music-index {
      @extend .left-icon
    }
    .each-music-msg {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: $border;
      .each-music-name {
        color: #343937;
        font-size: 0.16rem;
        font-weight: 500;
      }
      .each-music-artists {
        color: #a1a6a4;
        font-size: 0.12rem;
      }
    }
    .each-music-more {
      color: #babfbd;
      line-height: 0.8rem;
      border-bottom: $border;
      width: 0.3rem;
      font-size: 0.25rem;
    }
  }
</style>
