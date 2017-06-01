 <template>
  <div>
    <mu-circular-progress :size="90" color="red" v-if="loding" class="loding"/>
    <div class="list-content-wrap" v-else>
      <list-header :data="data" :creator="creator"></list-header>
      <music-list :songs="data.tracks"></music-list>
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
      this.$http.get(`http://localhost:3000/top/list?idx=${this.id}`)
        .then((res) => {
          this.data = res.data.result
          this.creator = res.data.result.creator
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
</style>
