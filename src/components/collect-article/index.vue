<template>
  <van-icon
    color="#777"
    :name="isCollected ? 'star' : 'star-o'"
    @click="onCollect"
  />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'

export default {
  name: 'CollectArticle',
  components: {},
  model: {
    prop: 'isCollected',
    event: 'update-is-collected'
  },
  props: {
    isCollected: {
      type: Boolean,
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
    async onCollect () {
      try {
        if (this.isCollected) {
          await addCollect(this.articleId)
        } else {
          await deleteCollect(this.articleId)
        }
        this.$emit('update-is-collected', !this.isCollected)

        setTimeout(() => {
          this.$toast.success(this.isCollected ? '收藏成功' : '取消收藏成功')
        }, 0)
      } catch (error) {
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
