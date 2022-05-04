<template>
  <div class="edit-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="修改用户昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onEditUserProfile"
    />

    <!-- 输入框 -->
    <div class="edit-name-field">
      <van-field
        v-model.trim="username"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        trim
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'

export default {
  name: 'EditName',
  components: {},
  props: {
    userInfo: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      username: this.userInfo.name
    }
  },
  watch: {},
  computed: {},
  methods: {
    async onEditUserProfile () {
      this.$toast.loading({
        message: '更新数据中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示，成功或失败时关闭
      })
      try {
        if (!this.username) {
          this.$toast('昵称不能为空')
          return
        } else {
          await editUserProfile({
            name: this.username
          })
          // console.log(data);
          this.$emit('update-username', this.username)
          this.$emit('close')
          this.$toast.success('更新成功')
        }
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    }
  },
  created () {},
  mounted () {}
}
</script>

<style lang="less" scoped>
.edit-name {
  /deep/ .edit-name-field {
    padding: 20px;
  }
}
</style>
