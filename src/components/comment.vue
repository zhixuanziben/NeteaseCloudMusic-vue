<template>
  <div>
    <div>
      评论({{total}})
    </div>
    <div>
      
    </div>
    <div>
      <h2>精彩评论</h2>
      <div v-for="item in hotcomment">
        <div>
          <img :src="item.user.avatarUrl" style="width: 30px; height: 30px">
        </div>
        <div>
          <div>
            {{item.user.nickname}}
          </div>
          <div>
            {{item.time}}
            {{item.likedCount}}
          </div>
          <div>
            {{item.content}}
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2>最新评论</h2>
      <div v-for="item in comment">
        <div>
          <img :src="item.user.avatarUrl" style="width: 30px; height: 30px">
        </div>
        <div>
          <div>
            {{item.user.nickname}}
          </div>
          <div>
            {{item.time}}
            {{item.likedCount}}
          </div>
          <div>
            {{item.content}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        musicname: '',
        artistname: '',
        musicpic: '',
        total: '',
        comment: [],
        hotcomment: []
      }
    },
    mounted () {
      // const that = this
      // this.musicname =
      this.$http.get(`http://localhost:3000/comment?id=${this.$route.params.id}&limit=20`)
        .then((res) => {
          console.log(res)
          this.total = res.data.total
          this.comment = res.data.comments
          this.hotcomment = res.data.hotComments
          console.log(res.data)
        })
    }
  }
</script>

<style scoped>
  
</style>
