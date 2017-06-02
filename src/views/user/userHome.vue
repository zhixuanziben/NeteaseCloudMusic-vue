<template>
  <div>
    <header class="user-header" 
      :style="{'background-image':'url(' + userMsg.backgroundUrl + '?param=500y500' + ')'}">
      <span class="icon-左箭头" @click="back"></span>
      <div class="user-msg-wrap">
        <img v-lazy="userMsg.avatarUrl">
        <p>
          {{userMsg.nickname}}
          <span>{{userMsg.gender}}</span>
        </p>
        <p v-if="userMsg.expertTags">音乐达人: {{userMsg.expertTags.join('~')}}</p>
      </div>
      <div class="mask"></div>
    </header>
    <div class="user-nav">
      <div :class="{'user-nav-pointer': playlistShow}" @click="changNav(true)">音乐</div>
      <div :class="{'user-nav-pointer': !playlistShow}" @click="changNav(false)">关于TA</div>
    </div>
    <div
      v-if="playlistShow" 
      v-for="item of playlist" class="each-playlist" @click="goPlaylist(item.id)">
      <div class="each-playlist-img">
        <img v-lazy="item.coverImgUrl">
      </div>
      <div class="each-playlist-msg">
        <p class="playlist-name">{{item.name}}</p>
        <p class="playlist-msg">{{item.trackCount}}首, 播放{{item.playCount}}次</p>
      </div>
    </div>
    <div v-if="!playlistShow">
      <section v-if="userMsg.expertTags" class="each-msg">
        <h3>认证信息</h3>
        <p>
          {{userMsg.expertTags.join('~')}}
        </p>
      </section>
      <section v-if="userMsg.birthday" class="each-msg">
        <h3>个人信息</h3>
        <p>
          年龄：{{new Date(userMsg.birthday).getFullYear()}}.{{new Date(userMsg.birthday).getMonth() + 1}}.{{new Date(userMsg.birthday).getDate()}}
        </p>
      </section>
      <section v-if="userMsg.signature" class="each-msg">
        <h3>个人介绍</h3>
        <p>
          {{userMsg.signature}}
        </p>
      </section>
    </div>
  </div>  
</template>

<script>
  export default {
    data () {
      return {
        playlist: [],
        userMsg: {
          expertTags: []
        },
        playlistShow: true
      }
    },
    mounted () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.$http.get(`http://localhost:3000/user/playlist?uid=${this.$route.params.id}`)
          .then((res) => {
            this.playlist = res.data.playlist
            for (var list of res.data.playlist) {
              if (list.creator.userId) {
                this.userMsg = list.creator
                return
              }
            }
          })
      },
      goPlaylist (id) {
        this.$router.push({path: `/playlist/${id}`})
      },
      changNav (bol) {
        this.playlistShow = bol
      },
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    text-align: center;
    position: relative;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(0.01rem);
    color: #fff;
    .icon-左箭头 {
      position: absolute;
      left: 0.1rem;
      top: 0.1rem;
    }
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      background: #666;
      opacity: 0.5;
    }
  }
  .user-nav {
    display: flex;
    height: 0.6rem;
    line-height: 0.6rem;
    > div {
      flex: 1;
      text-align: center;
    }
    .user-nav-pointer {
      color: #df2d2d;
      border-bottom: 2px solid #df2d2d;  
    }
  }
  .each-playlist {
    display: flex;
    .each-playlist-img {
      width: 1.3rem;
      padding: 0.1rem;
      > img {
        width: 100%;
      }
    }
    .each-playlist-msg {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom: 1px solid #F9FAFC;
      .playlist-name {
        font-size: 0.2rem;
        margin-bottom: 0.1rem;
      }
      .playlist-msg {
        color: #666;
        font-size: 0.15rem;
      }
    }
  }
  .each-msg {
    margin-bottom: 0.2rem;
    padding-left: 0.1rem;
    > h3 {
      font-size: 0.25rem;
    }
    > p {
      color: #444;
    }
  }
</style>
