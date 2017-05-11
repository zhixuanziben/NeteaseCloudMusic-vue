<template>
  <div>
    <div>
      sdf
      {{name}}
    </div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        name: '',
        artistName: '',
        playCount: '',
        subCount: '',
        publishTime: '',
        desc: ''
      }
    },
    mounted () {
      console.log(this.$route.params.id)
      this.$http.get(`http://localhost:3000/mv?mvid=${this.$route.params.id}`).then((res) => {
        this.MVURL = `http://localhost:3000/mv/url?url=${res.data.data.brs[240]}`
        this.name = res.data.data.name
        this.artistName = res.data.data.artistName
      })
    }
  }
</script>

<style>
  
</style>
