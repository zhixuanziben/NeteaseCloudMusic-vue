<template>
  <div>
    <list-title title="每日歌曲推荐"></list-title>
    <music-list :songs="data.recommend"></music-list>
  </div>  
</template>

<script>
  import listTitle from '../../components/listTitle'
  import musicList from '../../components/musicList'
  export default {
    data () {
      return {
        data: ''
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
        })
    },
    methods: {
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style>
  
</style>
