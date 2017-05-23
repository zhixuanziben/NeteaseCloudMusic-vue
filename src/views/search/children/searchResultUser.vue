<template>
  <div>
    <div v-for="item in data" @click="toUser(item.userId)" class="each-user">
      <div class="each-user-left">
        <img :src="item.avatarUrl">
      </div>
      <div class="each-user-right">
        <h3 class="each-user-name">{{item.nickname}}</h3>
        <p class="each-user-msg">{{item.signature}}</p>
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
      this.$http.get(`http://localhost:3000/search?keywords=${this.$route.query.val}&type=1002`)
        .then((res) => {
          console.log(res.data.result.userprofiles)
          this.data = res.data.result.userprofiles
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
      },
      toUser (id) {
        this.$router.push({path: `/userHome/${id}`})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .each-user {
    display: flex;
    .each-user-left {
      width: 1rem;
      padding: 0.1rem;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .each-user-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom: 1px solid #F9FAFC;
      .each-user-name {
        font-size: 0.20rem;
        font-weight: 400;
      }
      .each-user-msg {
        font-size: 0.15rem;
        color: #666;
      }
    }
  }
</style>
