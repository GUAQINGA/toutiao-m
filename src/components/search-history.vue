<template>
  <div class="search-history">
    <van-cell-group>
      <van-cell title="搜索历史">
        <div v-if="isDeleteShow">
          <span @click="$emit('update-search-history')">全部删除 </span>
          <span @click="isDeleteShow = false">完成</span>
        </div>
        <van-icon v-else name="delete-o" @click="isDeleteShow = true" />
      </van-cell>
      <van-cell
        v-for="(item, index) in searchHistory"
        :key="index"
        :title="item"
        @click="onSearchItemClick(item, index)"
      >
        <van-icon v-show="isDeleteShow" name="close" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistory: {
      type: Array,
      require: true
    },
    searchValue: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    onSearchItemClick (item, index) {
      if (this.isDeleteShow) {
        this.searchHistory.splice(index, 1)
      } else {
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
