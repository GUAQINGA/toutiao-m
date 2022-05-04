<template>
  <div class="edit-avatar">
    <img class="avatar-img" :src="avatar" ref="avatar" alt="" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="complete" @click="onComplete">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { editUserAvatar } from '@/api/user'

export default {
  name: 'EditAvatar',
  components: {},
  props: {
    avatar: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  watch: {},
  computed: {},
  methods: {
    onComplete () {
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        this.$toast.loading({
          message: '更新数据中...',
          forbidClick: true, // 禁止背景点击
          duration: 0 // 持续展示，成功或失败时关闭
        })
        try {
          const formData = new FormData()
          formData.append('photo', blob)
          const { data } = await editUserAvatar(formData)

          this.$toast.success('更新成功')
          this.$emit('close')
          this.$emit('update-useravatar', data.data.photo)
        } catch (error) {
          this.$toast.fail('更新失败')
        }
      })
    }
  },
  created () {},
  mounted () {
    const image = this.$refs.avatar
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  }
}
</script>

<style lang="less" scoped>
.edit-avatar {
  height: 100vh;
  background-color: #000;

  .avatar-img {
    display: block;
    max-width: 100%;
  }

  .toolbar {
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    .cancel,
    .complete {
      padding: 30px;
      color: #fff;
      font-size: 30px;
    }
  }
}
</style>
