<template>
  <div class="result-mvs">
    <div v-for="item in mvs" @click="toMv(item.id)" class="each-mv">
      <div class="each-mv-pic">
        <img :src="item.cover">
        <p class="each-mv-duration">{{Math.floor(item.duration*0.001/60).toString().padStart(2, '0')}}:{{(item.duration*0.001%60).toString().padStart(2, '0')}}</p>
      </div>
      <div class="each-mv-msg">
        <span>{{item.name}}</span>
        <artists :artists="item.artists" class="artists"></artists>
      </div>
    </div>
    <mu-infinite-scroll 
      :loadingText="loadingText" 
      :loading="loading" 
      @load="fetchData"/>
  </div>
</template>

<script>
  import artists from '../../../components/artists'
  export default {
    data () {
      return {
        mvs: [],
        loading: false,
        loadingText: '努力加载中...'
      }
    },
    components: {
      artists
    },
    mounted () {
      this.fetchData()
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
        this.mvs = []
        this.fetchData()
      }
    },
    methods: {
      toMv (id) {
        this.$store.dispatch('getmvId', id)
        this.$router.push({path: `/mv/${id}`})
      },
      fetchData () {
        const offset = this.mvs.length
        this.loading = true
        this.$http.get(`http://localhost:3000/search?keywords=${this.$route.query.val}&type=1004&limit=15&offset=${offset}`)
          .then((res) => {
            for (let mv of res.data.result.mvs) {
              this.mvs.push(mv)
            }
            this.loading = false
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/utils.scss";
  .result-mvs {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .each-mv {
      width: 49%;
      margin-bottom: 0.1rem;
      .each-mv-pic {
        position: relative;
        img {
          width: 100%;
        }
        .each-mv-duration {
          position: absolute;
          bottom: 1px;
          left: 3px;
          color: #fff;
          font-size: 0.12rem;
        }
      }
      .each-mv-msg {
        > span {
          font-size: 0.25rem;
          @include shenglue;
        }
        .artists {
          @include shenglue;
          font-size: 0.12rem;
        }
      }
    }
  }
</style>
