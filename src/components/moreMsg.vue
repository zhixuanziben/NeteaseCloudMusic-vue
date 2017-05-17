<template>
  <div class="more-msg">
    <div class="more-msg-name">
      歌曲:{{msg.name}}
    </div>
    <div class="each-msg" @click="next(msg)">
      <span class="icon-next"></span>
      <div>下一首播放</div>
    </div>
    <div class="each-msg" @click="collection(msg.id)">
      <span class="icon-collection"></span>
      <div>收藏到歌单</div>
    </div>
    <div class="each-msg" @click="toComment(msg.id)">
      <span class="icon-comment"></span>
      <div>评论</div>
    </div>
    <div class="each-msg" @click="toArtist(msg.artists[0].id)">
      <span class="icon-我的"></span>
      <div class="each-msg-artist">
        歌手：<artists :artists="msg.artists"></artists>
      </div>   
    </div>
    <div class="each-msg" @click="toAlbum(msg.album.id)">
      <span class="icon-专辑"></span>
      <div>
        专辑：{{msg.album.name}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      msg: {
        type: Object
      }
    },
    methods: {
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
      },
      collection (id) {
        this.$http.get(`http://localhost:3000/playlist/tracks?op=add&pid=495727117&tracks=${id}`)
          .then((res) => {
            console.log(res.data)
          })
      },
      toComment (id) {
        this.$router.push({path: `/comment/${id}`})
      },
      toArtist (id) {
        this.$router.push({path: `/artist/${id}`})
      },
      toAlbum (id) {
        this.$router.push({path: `/album/${id}`})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .more-msg-name {
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.3rem;
    margin-left: 0.3rem;
  }
  .each-msg {
    display: flex;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.3rem;
    margin: 0.2rem 0;
    > span {
      color: red;
      width: 1rem;
      text-align: center;
      line-height: 0.6rem;
    }
    > div {
      flex: 1;
      border-bottom: 1px solid #666;
    }
    .each-msg-artist {
      display: flex;
    }
  }
</style>
