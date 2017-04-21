<template>
  <div>
    <div class="personal-header">
      <div>
        私人FM
      </div>
      <div>
        每日歌曲推荐
      </div>
      <div>
        云音乐热歌榜
      </div>
    </div>
    <div>
      <h2>推荐歌单</h2>
      <div>
        <div v-for="item in songList" @click="goListContent(item.id)">
          <img :src="item.picUrl" alt="" style="width: 200px; height: 200px">
          <span>{{item.playcount/10000}}万</span>
          <div>{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        songList: []
      }
    },
    mounted () {
      this.$http.get('http://localhost:3000/recommend/resource').then((res) => {
        console.log(res.data.recommend)
        this.songList = res.data.recommend
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

<style scope>
  .personal-header {
    display: flex;
  }
  .personal-header > div {
    flex: 1;
    text-align: center;
  }
</style>
