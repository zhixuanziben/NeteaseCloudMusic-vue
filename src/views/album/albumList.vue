<template>
  <div>
    <list-title title="新碟上架"></list-title>
    <div class="all-album-wrap">
      <div v-for="item of albums" @click="toAlbumMsg(item.id)" class="each-album">
        <img :src="item.picUrl">
        <p class="each-album-name">
          {{item.name}}
        </p>
        <artists :artists="item.artists" class="each-album-artists"></artists>
      </div>
    </div>
    <mugen-scroll :handler="fetchData" :should-handle="!loading" :handleOnMount="false">
      loading...
    </mugen-scroll>
  </div>
</template>

<script>
  import listTitle from '../../components/listTitle.vue'
  import artists from '../../components/artists.vue'
  import MugenScroll from 'vue-mugen-scroll'
  export default {
    data () {
      return {
        albums: [],
        loading: false
      }
    },
    components: {
      listTitle,
      artists,
      MugenScroll
    },
    methods: {
      toAlbumMsg (id) {
        this.$router.push({path: `/album/${id}`})
      },
      fetchData () {
        const offset = this.albums.length
        this.loading = true
        this.$http.get(`http://localhost:3000/top/album?offset=${offset}&limit=30`).then((res) => {
          for (let album of res.data.albums) {
            this.albums.push(album)
          }
          this.loading = false
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @mixin shenglue {
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
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
        @include shenglue;
      }
      .each-album-artists {
        @include shenglue;
      }
    }
  }
</style>
