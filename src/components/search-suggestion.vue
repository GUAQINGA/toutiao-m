<template>
  <div class="search-suggestion">
    <van-cell-group>
      <van-cell
        v-for="(item, index) in suggestions"
        :key="index"
        icon="search"
        @click="$emit('search', item)"
      >
        <div v-html="highLight(item)" slot="title"></div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  props: {
    searchValue: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  methods: {
    async loadSearchSuggestion (q) {
      try {
        const { data } = await getSearchSuggestion(q)
        console.log(data)
        this.suggestions = data.data.options
        console.log(this.suggestions)
      } catch (error) {
        this.$toast('获取数据失败，请稍后再试')
      }
    },
    highLight (value) {
      const highLightStr = `<span class="active">${this.searchValue}</span>`
      const reg = new RegExp(this.searchValue, 'gi')
      return value.replace(reg, highLightStr)
    }
  },
  watch: {
    searchValue: {
      handler: debounce(function (value) {
        this.loadSearchSuggestion(value)
      }, 1000),
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>
