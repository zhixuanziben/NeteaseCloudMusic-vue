<template>
  <div class="all-artist">
    <div v-for="item of artists" class="each-artist" @click="goArtist(item.id)">
      <img v-lazy="item.img1v1Url">
      <p>{{item.name}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        artists: []
      }
    },
    mounted () {
      this.$http.get(`http://localhost:3000/simi/artist?id=${this.$route.params.id}`)
        .then((res) => {
          this.artists = res.data.artists
        })
    },
    methods: {
      goArtist (id) {
        this.$router.push({path: `/artist/${id}`})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .all-artist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .each-artist {
      width: 49%;
      > img {
        width: 100%;
      }
      > p {
        text-align: center;
        height: 0.5rem;
        line-height: 0.5rem;
        color: #666;
      }
    }
  }
</style>
