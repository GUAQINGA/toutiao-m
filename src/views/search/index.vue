<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        class="search-form"
        v-model="searchValue"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :search-value="searchValue"
    ></search-result>

    <!-- 搜索联想 -->
    <search-suggestion
      v-else-if="searchValue"
      :search-value="searchValue"
      @search="onSearch"
    ></search-suggestion>

    <!-- 搜索历史 -->
    <search-history
      v-else
      :search-history="searchHistory"
      :search-value="searchValue"
      @update-search-history="searchHistory = []"
      @search="onSearch"
    ></search-history>
  </div>
</template>

<script>
import SearchHistory from '@/components/search-history'
import SearchSuggestion from '@/components/search-suggestion'
import SearchResult from '@/components/search-result'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data () {
    return {
      searchValue: '',
      isResultShow: false,
      searchHistory: getItem('TOUTIAO_SEARCH_HISTORY') || []
    }
  },
  watch: {
    searchHistory (val) {
      setItem('TOUTIAO_SEARCH_HISTORY', val)
    }
  },
  methods: {
    onSearch (val) {
      console.log(val)
      this.searchValue = val
      // 添加搜索历史
      const index = this.searchHistory.indexOf(val)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(val)

      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;

  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    .van-search__action {
      color: #fff;
    }
  }
}
</style>
