<template>
  <div>
    <div>全部歌单</div>
    <div>
      <div v-for="item in data"  @click="goListContent(item.id)">
        <div>
          <img :src="item.coverImgUrl" alt="" style="width: 1rem; height: 1rem">
          {{item.creator.nickname}}
          {{item.playCount/10000}}万
        </div>
        <div>
          {{item.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        data: []
      }
    },
    mounted () {
      this.$http.get('http://localhost:3000/top_playlist?limit=20&order=new')
        .then((res) => {
          this.data = res.data.playlists
          console.log(res.data)
        })
    },
    methods: {
      goListContent (ind) {
        console.log(`/playList/${ind}`)
        this.$router.push({path: `/playList/${ind}`})
      }
    }
  }
</script>

<style scoped>
  
</style>
