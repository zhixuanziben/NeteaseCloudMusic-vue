<template>
  <div>
    <div>
      <span @click="back">
        返回
      </span>
      <span>
        每日歌曲推荐
      </span>
    </div>
    <music-list :songs="data.recommend"></music-list>
  </div>  
</template>

<script>
  import musicList from '../../components/musicList'
  export default {
    data () {
      return {
        data: ''
      }
    },
    components: {
      'music-list': musicList
    },
    mounted () {
      this.$http.get('http://localhost:3000/recommend/songs')
        .then((res) => {
          console.log(res.data)
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
