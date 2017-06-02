<template>
  <div>
    <div v-for="item in data.artists" @click="toArtistMsg(item.id)">
      <div>
        <img v-lazy="item.img1v1Url" alt="">
      </div>
      <div>
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        data: ''
      }
    },
    mounted () {
      // console.log(this.$route.query.val)
      this.$http.get(`http://localhost:3000/search?keywords=${this.$route.query.val}&type=100`)
        .then((res) => {
          console.log(res.data.result)
          this.data = res.data.result
        })
    },
    // 计算当前搜索的值
    computed: {
      query () {
        return this.$route.query.val
      }
    },
    // query变化重新搜索
    watch: {
      query () {
        this.$http.get(`http://localhost:3000/search?keywords=${this.$route.query.val}&type=100`)
        .then((res) => {
          this.data = res.data.result
          console.log(this.data)
        })
      }
    },
    methods: {
      toArtistMsg (id) {
        this.$router.push({path: `/artist/${id}`})
      }
    }
  }
</script>

<style scoped>
  
</style>
