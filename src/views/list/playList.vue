 <template>
  <div class="list-content-wrap">
    <mu-circular-progress :size="90" color="red" v-if="loding" class="loding"/>
    <div v-else>
      <header class="list-content-header">
        <list-title title="歌单"></list-title>
        <div class="list-desc">
          <div class="list-pic">
            <img :src="data.picUrl">
            <span v-if="data.playCount > 100000">
              {{Math.floor(data.playCount/10000)}}万
            </span>
            <span v-else>
              {{data.playCount}}
            </span>
          </div>
          <div class="list-msg">
            <h3>{{data.name}}</h3>
            <div>
              <img :src="creator.avatarUrl">
              <span @click="goUser(creator.userId)">{{creator.nickname}} ></span>
            </div>
          </div>
        </div>
        <div class="listData">
          <div>
            <div>
              <span class="icon-collection"></span>
            </div>
            {{data.subscribedCount}}
          </div>
          <div @click="goComment(data.id)">
            <div>
              <span class="icon-comment"></span>
            </div>
            {{data.commentCount}}
          </div>
          <div>
            <div>
              <span class="icon-share"></span>
            </div>
            {{data.shareCount}}
          </div>
          <div>
            <div>
              <span class="icon-download"></span>
            </div>
            下载
          </div>
        </div>
      </header>
      <music-list :songs="tracks"></music-list>
    </div>
  </div>  
</template>

<script>
  import listTitle from '../../components/listTitle'
  import musicList from '../../components/musicList'
  export default {
    data () {
      return {
        id: '',
        tracks: [],
        data: '',
        creator: '',
        loding: true
      }
    },
    components: {
      musicList,
      listTitle
    },
    mounted () {
      this.id = this.$route.params.id
      this.$http.get(`http://localhost:3000/playlist/detail?id=${this.id}`)
        .then((res) => {
          this.data = res.data.playlist
          this.tracks = res.data.playlist.tracks
          this.creator = res.data.playlist.creator
          this.loding = false
        })
    },
    methods: {
      goComment () {
        let obj = {
          name: this.data.name,
          artists: [{name: this.creator.nickname}],
          musicpic: this.data.picUrl
        }
        this.$store.dispatch('saveCommentHeader', obj)
        this.$store.dispatch('saveCommentType', 1)
        this.$router.push({name: 'comment'})
      },
      goUser (id) {
        console.log(id)
        this.$router.push({path: `/userHome/${id}`})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .loding {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
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
  .list-desc {
    display: flex;
    .list-pic {
      width: 40%;
      margin: 0.2rem;
      position: relative;
      > img {
        width: 100%;
      }
      > span {
        position: absolute;
        top: 0;
        right: 0.1rem;
      }
    }
    .list-msg {
      flex: 1;
      margin-top: 0.2rem;
      > h3 {
        font-size: 0.25rem;
        margin-bottom: 0.1rem;
      }
      img {
        width: 0.5rem;
        border-radius: 50%;
      }
    }
  }
</style>
