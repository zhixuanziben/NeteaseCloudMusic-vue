 <template>
  <div class="list-content-wrap">
    <header class="list-content-header">
      <div>{{data.name}}</div>
      <div>最近更新：4月16日</div>
      <div class="listData">
        <div>
          <div>
            <span class="icon-collection"></span>
          </div>
          {{data.subscribedCount}}
        </div>
        <div>
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
    <music-list :songs="data"></music-list>
  </div>  
</template>

<script>
  import musicList from '../../components/musicList'
  export default {
    data () {
      return {
        id: '',
        data: ''
      }
    },
    components: {
      musicList
    },
    mounted () {
      this.id = this.$route.params.id
      this.$http.get(`http://localhost:3000/playlist/detail?id=${this.id}`)
        .then((res) => {
          this.data = res.data.playlist.tracks
        })
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
