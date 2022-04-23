<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshing"
      :success-text="refreshSuccessText"
      success-duration="1300"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，请重新加载"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',

  props: {
    channel: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      timestamp: null,
      refreshing: false,
      refreshSuccessText: '刷新成功'
    }
  },
  components: {
    ArticleItem
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })
        if (Math.random() > 0.6) {
          JSON.parse('ajflskjs')
        }
        const { results } = data.data
        this.list.push(...results)
        this.loading = false

        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        console.log('请求失败', error)
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now()
        })
        const { results } = data.data
        console.log(results.length)
        this.list.unshift(...results)
        this.refreshing = false
        this.refreshSuccessText = `刷新成功，更新了${results.length}条文章`
      } catch (error) {
        this.refreshing = false
        this.refreshSuccessText = '刷新失败'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
