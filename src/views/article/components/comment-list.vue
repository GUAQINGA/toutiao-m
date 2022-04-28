<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      :title="item.content"
    />
  </van-list>
</template>

<script>
import { getComment } from '@/api/comment'

export default {
  name: 'CommentList',
  components: {},
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
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
        const { results } = data.data
        this.list.push(...results)
        console.log(data)
        console.log(results)
        // if (result.length) {
        //   this.offset = data.data.last_id
        // } else {
        //   this.finished = true
        // }
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    }
  },
  created () {},
  mounted () {}
}
</script>

<style lang="less" scoped>
</style>
