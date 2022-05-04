<template>
  <div class="edit-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
import dayjs from 'dayjs'

export default {
  name: 'EditBirthday',
  model: {
    prop: 'birthday',
    event: 'update-userbirthday'
  },
  components: {},
  props: {
    birthday: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.birthday)
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
        const formatBirth = dayjs(this.currentDate).format('YYYY-MM-DD')
        await editUserProfile({
          birthday: formatBirth
        })
        this.$emit('update-userbirthday', formatBirth)
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
