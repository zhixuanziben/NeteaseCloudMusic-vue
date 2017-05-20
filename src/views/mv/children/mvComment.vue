<template>
  <div>
    <comment :hotcomment="hotcomment" :comment="comment"></comment>
  </div>
</template>

<script>
  import comment from '../../../components/comment'
  export default {
    data () {
      return {
        total: '',
        comment: [],
        hotcomment: []
      }
    },
    components: {
      comment
    },
    activated () {
      this.$http.get(`http://localhost:3000/comment/mv?id=${this.$route.params.id}&limit=20`)
        .then((res) => {
          // console.log(res)
          this.total = res.data.total
          this.comment = res.data.comments
          this.hotcomment = res.data.hotComments
          // console.log(res.data)
        })
    }
  }
</script>

<style>
  
</style>
