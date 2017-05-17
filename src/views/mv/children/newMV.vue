<template>
  <div class="mv-library">
    <div v-for="(item, index) of mvList" class="each-mv-wrap" @click="playMV(item.id)">
      <img :src="item.cover">
      <div class="each-mv-count">
        <span class="icon-视频"></span>
        {{item.playCount}}
      </div>
      <div class="each-mv-msg">
        <div class="each-mv-name">
          {{item.name}}-
          <span v-for="(artists, index) in item.artists">{{artists.name}}<span v-if="index < (item.artists.length - 1)">/</span></span>
        </div>
      </div>
      <div class="box"></div>
    </div>
    <mugen-scroll :handler="fetchData" :should-handle="!loading" :handleOnMount="false">
      loading...
    </mugen-scroll>
  </div>
</template>

<script>
  import MugenScroll from 'vue-mugen-scroll'
  export default {
    data () {
      return {
        mvList: [],
        loading: false
      }
    },
    components: {
      MugenScroll
    },
    methods: {
      playMV (id) {
        this.$store.dispatch('getmvId', id)
        this.$router.push({path: `/mv/${id}`})
      },
      fetchData () {
        const offset = this.mvList.length
        this.loading = true
        this.$http.get(`http://localhost:3000/top/mv?limit=10&offset=${offset}`).then((res) => {
          for (let mv of res.data.data) {
            this.mvList.push(mv)
          }
          this.loading = false
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mv-library {
    .each-mv-wrap {
      position: relative;
      margin-top: 5px;
      img {
        width: 100%;
      }
      .each-mv-count {
        position: absolute;
        top: 2px;
        right: 2px;
        color: #fff;
        z-index: 1000;
      }
      .each-mv-msg {
        position: absolute;
        bottom: 2px;
        left: 2px;
        color: #fff;
        z-index: 1000;
        .each-mv-name {
          font-size: 0.25rem;        
        }
      }
      .box{
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        background: black;
        opacity:0.2;
        z-index: 999
      }
    }
  }
</style>
