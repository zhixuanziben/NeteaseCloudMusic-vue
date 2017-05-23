<template>
  <div>
    <section class="all-comment">
      <div class="type" v-if="hotcomment.length != 0">精彩评论</div>
      <div v-for="item in hotcomment" class="each-comment">
        <div class="each-comment-avatar" @click="goUser(item.user.userId)">
          <img :src="item.user.avatarUrl">
        </div>
        <div class="each-comment-msg">
          <div class="each-comment-nickname">
            {{item.user.nickname}}
          </div>
          <div class="each-comment-time">
            <div class="time">
              {{new Date(item.time).getMonth() + 1}}月{{new Date(item.time).getDate()}}日
            </div>
            <div @click="likeComment(id, item.commentId, 1, 1)" class="comment-likeicon">
              {{item.likedCount}}
              <span class="icon-点赞"></span>
            </div>
          </div>
          <div class="each-comment-content">
            {{item.content}}
          </div>
        </div>
      </div>
    </section>
    <section class="all-comment">
      <div class="type" v-if="comment.length != 0">最新评论</div>
      <div v-for="item in comment" class="each-comment">
        <div class="each-comment-avatar" @click="goUser(item.user.userId)">
          <img :src="item.user.avatarUrl">
        </div>
        <div class="each-comment-msg">
          <div class="each-comment-nickname">
            {{item.user.nickname}}
          </div>
          <div class="each-comment-time">
            <div class="time">
              {{new Date(item.time).getMonth() + 1}}月{{new Date(item.time).getDate()}}日
            </div>
            <div @click="likeComment(id, item.commentId, 1, 1)" class="comment-likeicon">
              <span v-if="item.likedCount != 0">{{item.likedCount}}</span>
              <span class="icon-点赞"></span>
            </div>
          </div>
          <div class="each-comment-content">
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
      },
      goUser (id) {
        this.$router.push({path: `/userHome/${id}`})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .all-comment {
    background-color: #F9FAFC;
    .type {
      font-size: 0.25rem;
      color: #666;
      height: 0.5rem;
      line-height: 0.5rem;
      background-color: #F9FAFC;
      padding: 0 0.1rem;
    }
    .each-comment{
      display: flex;
      padding: 0.1rem 0;
      .each-comment-avatar {
        width: 0.8rem;
        height: 0.8rem;
        text-align: center;
        img {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
        }
      }
      .each-comment-msg {
        flex: 1;
        border-bottom: 1px solid #F9FAFC;
        .each-comment-nickname {
          font-size: 0.16rem;
        }
        .each-comment-time {
          font-size: 0.12rem;
          display: flex;
          justify-content: space-between;
          color: #666;
          padding-right: 0.1rem;
          .time {
            font-size: 0.12rem;
          }
          .comment-likeicon {
            width: 1rem;
            text-align: right;
          }
        }
        .each-comment-content {
          font-size: 0.18rem;
          color: #333;
          margin-bottom: 0.2rem;
        }
      }
    }
  }
</style>
