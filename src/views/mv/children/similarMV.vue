<template>
  <div>
    <section v-for="item of allMV" class="each-mv" @click="getMvUrl(item.id)">
      <div class="each-mv-left">
        <img :src="item.cover">
        <span class="each-mv-count">
          <span class="icon-视频"></span>
          <span v-if="item.playCount > 100000">
            {{Math.floor(item.playCount/10000)}}万
          </span>
          <span v-else>
            {{item.playCount}}
          </span>
        </span>
      </div>
      <div class="each-mv-right">
        <div>{{item.name}}</div>
        <div>
          <span v-for="(artists, index) in item.artists">{{artists.name}}<span v-if="index < (item.artists.length - 1)">/</span></span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        allMV: []
      }
    },
    mounted () {
      this.$http.get(`http://localhost:3000/simi/mv?mvid=${this.$route.params.id}`)
        .then((res) => {
          this.allMV = res.data.mvs
        })
    },
    methods: {
      getMvUrl (id) {
        this.$store.dispatch('getmvId', id)
        this.$router.replace({path: `/mv/${id}`})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .each-mv {
    display: flex;
    padding-left: 0.1rem;
    margin: 0.2rem 0;
    .each-mv-left {
      width: 2rem;
      position: relative;
      color: #fff;
      > img {
        width: 100%;
        height: 100%;
      }
      .each-mv-count {
        position: absolute;
        top: 1px;
        right: 1px;
        font-size: 0.12rem;
      }
    }
    .each-mv-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 0.2rem;
      border-bottom: 1px solid #EFF2F7;
      div:nth-child(1) {
        font-size: 0.25rem;
        color: #000;
      }
      div:nth-child(2) {
        font-size: 0.12rem;
        color: #999;
      }
    }
  }
</style>
