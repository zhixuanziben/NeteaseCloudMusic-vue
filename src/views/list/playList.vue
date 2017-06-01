 <template>
  <div class="list-content-wrap">
    <mu-circular-progress :size="90" color="red" v-if="loding" class="loding"/>
    <div v-else>
      <list-header :data="data" :creator="creator"></list-header>
      <music-list :songs="tracks"></music-list>
    </div>
  </div>  
</template>

<script>
  import listHeader from '../../components/listHeader'
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
      listHeader
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
</style>
