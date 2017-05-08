 <template>
  <div>
    <div>
      <div>
        <span>返回</span>
        <span>{{data.artist.name}}</span>
        <img :src="data.artist.img1v1Url" alt="">
      </div>
      <div>
        <div>
          热门{{data.hotSongs.length}}
        </div>
        <div>
          专辑{{data.artist.albumSize}}
        </div>
        <div>
          MV
        </div>
      </div>
    </div>
    <music-list :songs="data.hotSongs"></music-list>
  </div>
</template>

<script>
  import musicList from '../../components/musicList'
  export default {
    data () {
      return {
        data: {
          artist: {
            name: '',
            img1v1Url: ''
          },
          hotSongs: []
        }
      }
    },
    components: {
      musicList
    },
    mounted () {
      this.$http.get(`http://localhost:3000/artists/?id=${this.$route.params.id}`)
        .then((res) => {
          this.data = res.data
          this.data.hotSongs = res.data.hotSongs
        })
    }
  }
</script>

<style>
  
</style>
