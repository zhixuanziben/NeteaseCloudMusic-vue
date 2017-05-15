<template>
  <div>
    <list-title title="新碟上架"></list-title>
    <div class="all-album-wrap">
      <div v-for="item of albums" @click="toAlbumMsg(item.id)" class="each-album">
        <div>
          <img :src="item.picUrl">
        </div>
        <p class="each-album-name">
          {{item.name}}
        </p>
        <artists :artists="item.artists" class="each-album-artists"></artists>
      </div>
    </div>
  </div>
</template>

<script>
  import listTitle from '../../components/listTitle.vue'
  import artists from '../../components/artists.vue'
  export default {
    data () {
      return {
        albums: []
      }
    },
    components: {
      listTitle,
      artists
    },
    mounted () {
      this.$http.get('http://localhost:3000/top/album?limit=30')
        .then((res) => {
          this.albums = res.data.albums
        })
    },
    methods: {
      toAlbumMsg (id) {
        this.$router.push({path: `/album/${id}`})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .all-album-wrap {
    
    .each-album {
      width: 50%;
      display: inline-block;
      text-align: center;
      img {
        width: 80%;
      }
      .each-album-name {
        font-size: 0.2rem;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
    }
  }
</style>
