<template>
  <div>
    <section class="artist-msg-section">
      <h3>歌手简介</h3>
      <p>
        {{desc}}
      </p>
      <p>{{resNull}}</p>
    </section>
    <section v-for="item of intro" class="artist-msg-section">
      <h3>{{item.ti}}</h3>
      <p>
        {{item.txt}}
      </p>
    </section>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        desc: '',
        intro: [],
        resNull: ''
      }
    },
    mounted () {
      this.$http.get(`http://localhost:3000/artist/desc?id=${this.$route.params.id}`)
        .then((res) => {
          this.desc = res.data.briefDesc
          this.intro = res.data.introduction
          if (!res.data.briefDesc) {
            this.resNull = '该歌手还没有相关信息'
          }
        })
    }
  }
</script>

<style lang="scss" scoped>
  .artist-msg-section {
    padding: 0.1rem;
    margin: 0.1rem 0;
    > h3 {
      border-left: 3px solid red;
      padding-left: 0.1rem;
    }
    > p {
      color: #666;
    }
  }
</style>
