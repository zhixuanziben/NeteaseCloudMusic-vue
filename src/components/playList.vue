<template>
  <div class="list-content-wrap">
    <header class="list-content-header">
      <div>{{data.name}}</div>
      <div>最近更新：4月16日</div>
      <div class="listData">
        <div>
          <div>
            <icon name="collection" class="icon"></icon>
          </div>
          {{data.subscribedCount}}
        </div>
        <div>
          <div>
            <icon name="comment" class="icon"></icon>
          </div>
          {{data.commentCount}}
        </div>
        <div>
          <div>
            <icon name="share" class="icon"></icon>
          </div>
          {{data.shareCount}}
        </div>
        <div>
          <div>
            <icon name="download" class="icon"></icon>
          </div>
          下载
        </div>
      </div>
    </header>
    <div>
      <div>
        播放全部
        <span>
          (共{{data.length}}首)
        </span>
      </div>
      <div v-for="(item, index) in data" @click="playMusic(item.id, index, item.name, item.ar, item.al.picUrl)" class="list-content-music">
        <div class="list-content-left">
          <div class="list-content-index">{{index + 1}}</div>
          <div class="list-content-up">
            {{item.ratio}}%
          </div>
        </div>
        <div class="list-content-right">
          <div>{{item.name}}</div>
          <div class="list-content-right-artists">
            <span v-for="(artists, index) in item.ar">{{artists.name}}<span v-if="index < (item.ar.length - 1)">/</span></span>
            - <span>{{item.al.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
  export default {
    data () {
      return {
        id: '',
        data: ''
      }
    },
    mounted () {
      console.log(this.$store)
      this.id = this.$route.params.id
      const that = this
      this.$http.get(`http://localhost:3000/playlist/detail?id=${this.id}`)
        .then(function (res) {
          that.data = res.data.playlist.tracks
          console.log(that.data[0].al.picUrl)
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

<style scope>
  .list-content-wrap {
    font-size: 0.15rem;
  }
  .list-content-header {
    background-color: #df2d2d;
    color: #fff;
  }
  .listData {
    display: flex;
  }
  .listData > div {
    flex: 1;
    text-align: center;
    cursor: pointer;
  }
  .icon {
    width: 0.2rem;
    height: 0.2rem;
  }
  .icon-up {
    height: 0.12rem;
    width: 0.12rem;
  }
  .list-content-index {
    text-align: center;
  }
  .list-content-up {
    font-size: 0.12rem;
    text-align: center;
  }
  .list-content-music {
    display: flex;
  }
  .list-content-left {
    width: 0.5rem;
    padding: 0.1rem;
    color: #475669
  }
  .list-content-right {
    flex: 1;
    margin-right: 0.2rem;
    border-bottom: 1px solid #475669;
    padding: 0.1rem 0;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .list-content-right-artists {
    width: 100%;
    font-size: 0.12rem;
    color: #475669;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
