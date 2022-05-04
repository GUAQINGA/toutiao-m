<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="comment.reply_count ? `${comment.reply_count} 回复` : '0 回复'"
      fixed
    >
      <van-icon name="cross" slot="left" @click="$emit('close')" />
    </van-nav-bar>

    <!-- 滚动区域 -->
    <div class="comment-scroll-wrap">
      <comment-item :comment="comment" />

      <van-cell title="全部回复" />
      <comment-list
        :source="comment.com_id"
        type="c"
        :list="commentList"
      ></comment-list>
    </div>
    <div class="add-btn-wrap">
      <van-button
        class="add-comment-btn"
        size="small"
        round
        @click="isReplyPopShow = true"
        >写评论</van-button
      >
    </div>
    <!-- 滚动区域 -->

    <!-- 评论回复 -->
    <van-popup v-model="isReplyPopShow" position="bottom">
      <comment-post
        :target="comment.com_id"
        :art-id="comment.art_id"
        @add-comment-success="onAddCommentSuccess"
      ></comment-post>
    </van-popup>
    <!-- 评论回复 -->
  </div>
</template>

<script>
import CommentItem from '@/views/article/components/comment-item'
import CommentList from '@/views/article/components/comment-list'
import CommentPost from '@/views/article/components/comment-post'

export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isReplyPopShow: false,
      commentList: []
    }
  },
  watch: {},
  computed: {},
  methods: {
    onAddCommentSuccess (data) {
      this.isReplyPopShow = false
      this.comment.reply_count++
      this.commentList.unshift(data.new_obj)
    }
  },
  created () {},
  mounted () {}
}
</script>

<style lang="less" scoped>
.comment-scroll-wrap {
  position: fixed;
  left: 0;
  top: 92px;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.add-btn-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  background-color: #fff;
  border-top: 1px solid #e8e8e8;
  .add-comment-btn {
    width: 60%;
  }
}
</style>
