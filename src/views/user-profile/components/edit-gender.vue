<template>
  <div class="edit-gender">
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      :default-index="userGender === 0 ? 0 : 1"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'

export default {
  name: 'EditGender',
  model: {
    prop: 'userGender',
    event: 'update-usergender'
  },
  components: {},
  props: {
    userGender: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      gender: this.userGender
    }
  },
  watch: {},
  computed: {},
  methods: {
    async onConfirm (value, index) {
      this.$toast.loading({
        message: '更新数据中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示，成功或失败时关闭
      })
      try {
        await editUserProfile({
          gender: index
        })
        this.$emit('update-usergender', index)
        this.$toast.success('更新成功')
        this.$emit('close')
      } catch (error) {
        this.$toast.fail('更新失败')
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
