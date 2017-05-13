<template>
  <div>
    <section>
      <div>精彩评论</div>
      <div v-for="item in hotcomment">
        <div>
          <img :src="item.user.avatarUrl" style="width: 30px; height: 30px">
        </div>
        <div>
          <div>
            {{item.user.nickname}}
          </div>
          <div>
            {{item.time}}
            <div @click="likeComment(id, item.commentId, 1, 1)">
              {{item.likedCount}}
              <span class="icon-点赞"></span>
            </div>
          </div>
          <div>
            {{item.content}}
          </div>
        </div>
      </div>
    </section>
    <section>
      <h2>最新评论</h2>
      <div v-for="item in comment">
        <div>
          <img :src="item.user.avatarUrl" style="width: 30px; height: 30px">
        </div>
        <div>
          <div>
            {{item.user.nickname}}
          </div>
          <div>
            {{item.time}}
            <div @click="likeComment(id, item.commentId, 1, 1)">
              {{item.likedCount}}
              <span class="icon-点赞"></span>
            </div>
          </div>
          <div>
            {{item.content}}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    props: {
      comment: {
        type: Array
      },
      hotcomment: {
        type: Array
      }
    },
    computed: {
      id () {
        return this.$route.params.id
      }
    },
    methods: {
      likeComment (id, cid, t, type) {
        console.log(this.$route)
        this.$http.get(`http://localhost:3000/comment/like?id=${id}&cid=${cid}&t=${t}&type=${type}`).then((res) => {
          console.log(res)
        })
      }
    }
  }
</script>

<style>
  
</style>
