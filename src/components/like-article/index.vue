<template>
  <van-icon
    color="#777"
    :name="isLike === 1 ? 'good-job' : 'good-job-o'"
    @click="onLike"
  />
</template>

<script>
export default {
  name: 'LikeArticle',
  components: {},
  model: {
    prop: 'attitude',
    event: ''
  },
  props: {
    attitude: {
      type: Number,
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
      try {
      } catch (error) {}
    }
  },
  created () {},
  mounted () {}
}
</script>

<style lang="less" scoped>
</style>
