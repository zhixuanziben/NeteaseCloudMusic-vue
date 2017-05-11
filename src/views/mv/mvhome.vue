<template>
  <div>
    <list-title :title="name"></list-title>
    <video :src="this.MVURL" controls=""></video>
    <div class="each-section-wrap">
      <span @click="goDetails">详情</span>
      <span @click="toComment">评论</span>
      <span>相关MV</span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import listTitle from '../../components/listTitle.vue'
  export default {
    data () {
      return {
        MVURL: '',
        name: ''
      }
    },
    components: {
      listTitle
    },
    mounted () {
      this.$http.get(`http://localhost:3000/mv?mvid=${this.$route.params.id}`).then((res) => {
        this.MVURL = `http://localhost:3000/mv/url?url=${res.data.data.brs[240]}`
        this.name = res.data.data.name
      })
    },
    methods: {
      goDetails () {
        this.$router.replace({path: `/mv/${this.$route.params.id}/details/${this.$route.params.id}`})
      },
      toComment () {
        this.$router.replace({path: `/mv/${this.$route.params.id}/mvcomment/${this.$route.params.id}`})
      }
    }
  }
</script>

<style lang="scss">
  .each-section-wrap {
    display: flex;
    > span {
      flex: 1;
      text-align: center;
    }
  }
</style>
