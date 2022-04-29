<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
    error-text="加载失败，请点击重试"
    @load="onLoad"
  >
    <comment-item
      v-for="(item, index) in list"
      :key="index"
      :title="item.content"
      :comment="item"
      @reply-click="$emit('reply-click', $event)"
    ></comment-item>
  </van-list>
</template>

<script>
import { getComment } from '@/api/comment'
import CommentItem from '@/views/article/components/comment-item'

export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    async onLoad () {
      try {
        const { data } = await getComment({
          type: 'a',
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })

        // if (Math.random() > 0.7) {
        //   JSON.parse('ajflskjs')
        // }

        const { results } = data.data
        this.list.push(...results)

        this.$emit('onload-comment', data.data)
        console.log(data)
        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  },
  created () {
    this.onLoad()
  },
  mounted () {}
}
</script>

<style lang="less" scoped>
</style>
