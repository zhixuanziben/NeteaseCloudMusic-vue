<template>
  <div>
    <h2 class="list-type">全部歌单</h2>
    <div class="all-songlist-wrap">
      <div v-for="item in data"  @click="goListContent(item.id)" class="each-songlist-wrap">
        <div class="img-wrap">
          <img :src="item.coverImgUrl" alt="">
          <span class="user-icon">
            <span class="icon-我的"></span>
            {{item.creator.nickname}}
          </span>
          <span class="erji-icon">
            <span class="icon-耳机"></span>
            <span v-if="item.playCount > 100000">
              {{Math.floor(item.playCount/10000)}}万
            </span>
            <span v-else>
              {{item.playCount}}
            </span>
          </span>
        </div>
        <div class="">
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
      this.$http.get('http://localhost:3000/top/playlist?limit=10&order=hot')
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

<style lang="scss" scoped>
  .list-type {
    margin: 0.1rem;
    padding-left: 0.05rem;
    font-size: 0.16rem;
    color: #494949;
    border-left: 4px solid #ea4558;
  }
  .all-songlist-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0.1rem;
    .each-songlist-wrap {
      width: 49%;
      margin-bottom: 0.15rem;
      font-size: 0.15rem;
      .img-wrap {
        position: relative;
        img {
          width: 100%;
          overflow: hidden;
          border: 1px solid #E5E9F2;
        }
        .user-icon {
          position: absolute;
          left: 0.1rem;
          bottom: 0.1rem;
          color: #fff;
        }
        .erji-icon {
          position: absolute;
          right: 0.1rem;
          top: 0.1rem;
          color: #fff;
        }
      }
    }
  }
</style>
