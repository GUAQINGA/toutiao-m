<template>
  <van-icon
    color="#777"
    :name="attitude === 1 ? 'good-job' : 'good-job-o'"
    @click="onLike"
  />
</template>

<script>
import { addLike, deleteLike } from '@/api/article'

export default {
  name: 'LikeArticle',
  components: {},
  model: {
    prop: 'attitude',
    event: 'update-attitude'
  },
  props: {
    attitude: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {}
  },
  watch: {},
  computed: {},
  methods: {
    async onLike () {
      let isLike = -1
      try {
        if (this.attitude === 1) {
          await deleteLike(this.articleId)
        } else {
          await addLike(this.articleId)
          isLike = 1
        }
        this.$emit('update-attitude', isLike)
        this.$toast.success(isLike === 1 ? '点赞成功' : '取消点赞成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败，请重试')
      }
    }
  },
  created () {},
  mounted () {}
}
</script>

<style lang="less" scoped>
</style>
