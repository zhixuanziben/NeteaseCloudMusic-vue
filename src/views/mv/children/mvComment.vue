<template>
  <div>
    <comment :hotcomment="hotcomment" :comment="comments"></comment>
    <mu-infinite-scroll 
      :loadingText="loadingText" 
      :loading="loading" 
      @load="fetchData"/>
  </div>
</template>

<script>
  import comment from '../../../components/comment'
  export default {
    data () {
      return {
        total: '',
        comments: [],
        hotcomment: [],
        loading: false,
        loadingText: '努力加载中...'
      }
    },
    components: {
      comment
    },
    mounted () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        const offset = this.comments.length
        this.loading = true
        this.$http.get(`http://localhost:3000/comment/mv?id=${this.$route.params.id}&limit=20&offset=${offset}`)
        .then((res) => {
          this.total = res.data.total
          // 因为如果offset不是0的话，返回的数据就没有hotcomment了，所以要进行判断
          this.hotcomment = res.data.hotComments || this.hotcomment
          for (let comment of res.data.comments) {
            this.comments.push(comment)
          }
          this.loading = false
        })
      }
    }
  }
</script>

<style>
  
</style>
