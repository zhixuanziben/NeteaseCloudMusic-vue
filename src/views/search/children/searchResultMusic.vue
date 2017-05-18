<template>
  <div class="songs-wrap">
    <div v-for="(item, index) in songs" 
      class="each-music">
      <div class="each-music-msg"
        @click="playMusic(item.id, index, item.name, item.artists, item.album.blurPicUrl)" >
        <h3>{{item.name}}</h3>
        <div class="each-music-artists">
          <artists :artists="item.artists"></artists>-
          <span>{{item.album.name}}</span>
        </div>
      </div>
      <span class="each-music-more icon-省略" @click="showMore(item)"></span>
    </div>
    <div v-if="isShow" class="more-msg-mask" @click="hideMore()"></div>
    <more-msg :msg="$store.state.moreMsg" class="more-msg" v-if="isShow" @hidden="hideMore"></more-msg>
  </div>  
</template>

<script>
  import moreMsg from '../../../components/moreMsg'
  export default {
    data () {
      return {
        songs: '',
        isShow: false
      }
    },
    components: {
      moreMsg
    },
    mounted () {
      this.$http.get(`http://localhost:3000/search?keywords=${this.$route.query.val}&type=1`)
        .then((res) => {
          this.songs = res.data.result.songs
          console.log(this.songs)
        })
    },
    // 计算当前搜索的值
    computed: {
      query () {
        return this.$route.query.val
      }
    },
    // query变化重新搜索
    watch: {
      query () {
        this.$http.get(`http://localhost:3000/search?keywords=${this.$route.query.val}&type=1`)
        .then((res) => {
          this.songs = res.data.result.songs
        })
      }
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
      },
      showMore (obj) {
        this.$store.dispatch('getMoreMsg', obj)
        this.isShow = !this.isShow
        console.log(this.isShow)
      },
      hideMore () {
        this.isShow = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .each-music {
    display: flex;
    margin-left: 0.1rem;
    border-bottom: 1px solid #666;
    padding: 0.1rem 0;
    .each-music-msg {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .each-music-artists {
        display: flex;
      }
    }
    .each-music-more {
      width: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .more-msg-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: black;
    opacity:0.2;
  }
  .more-msg {
    animation: myfirst 0.2s ease-in;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #F9FAFC;
    z-index: 9999;
  }
  .songs-wrap {
    overflow: hidden;
  }
  @keyframes myfirst {
    0% {height: 0;}
    100% {height: 4.7rem;}
  }

</style>
