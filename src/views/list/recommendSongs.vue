<template>
  <div>
    <list-title title="每日歌曲推荐"></list-title>
    <mu-circular-progress :size="90" color="red" v-if="loding" class="loding"/>
    <music-list :songs="data.recommend" v-else></music-list>
  </div>  
</template>

<script>
  import listTitle from '../../components/listTitle'
  import musicList from '../../components/musicList'
  export default {
    data () {
      return {
        data: '',
        loding: true
      }
    },
    components: {
      musicList,
      listTitle
    },
    mounted () {
      this.$http.get('http://localhost:3000/recommend/songs')
        .then((res) => {
          this.data = res.data
          this.loding = false
        })
    },
    methods: {
      back () {
        this.$router.go(-1)
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
</style>
