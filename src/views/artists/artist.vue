 <template>
  <div>
    <div>
      <header class="artist-header">
        <list-title :title="data.artist.name"></list-title>
        <img v-lazy="data.artist.picUrl">
      </header>
      <div class="artist-router">
        <router-link :to="{name: 'artistHotmusic'}" replace>
          热门50
        </router-link>
        <router-link :to="{name: 'artistAlbum'}" replace>
          专辑{{data.artist.albumSize}}
        </router-link>
        <router-link :to="{name: 'artistMV'}" replace>
          MV
        </router-link>
        <router-link :to="{name: 'artistMsg'}" replace>
          歌手信息
        </router-link>
        <router-link :to="{name: 'artistSimi'}" replace>
          相似歌手
        </router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import listTitle from '../../components/listTitle'
  export default {
    data () {
      return {
        data: {
          artist: {
            name: '',
            img1v1Url: ''
          }
        }
      }
    },
    components: {
      listTitle
    },
    watch: {
      $route (to, from) {
        // 通过观察id是否变化，来进行数据更新，同时保证是在artist页面内的id变化
        if ((to.params.id !== from.params.id) && to.name === 'artistHotmusic') {
          console.log('歌手id变化')
          this.ajax()
        }
      }
    },
    mounted () {
      this.ajax()
    },
    methods: {
      ajax () {
        this.$http.get(`http://localhost:3000/artists/?id=${this.$route.params.id}`)
          .then((res) => {
            this.data = res.data
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .artist-header {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .artist-router {
    display: flex;
    height: 0.6rem;
    line-height: 0.6rem;
    > a {
      flex: 1;
      text-align: center;
      color: #666;
    }
    .router-link-active {
      color: #df2d2d;
      text-decoration: none;
      border-bottom: 2px solid #df2d2d;
    }
  }
</style>
