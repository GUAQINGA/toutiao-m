<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />

    <input type="file" ref="file" hidden @change="onFileChange" />

    <!-- 个人信息 -->
    <van-cell-group>
      <van-cell
        class="avatar-cell"
        title="头像"
        is-link
        @click="$refs.file.click()"
      >
        <van-image
          class="profile-avatar"
          fit="cover"
          round
          :src="userInfo.photo"
        />
      </van-cell>
      <van-cell
        title="昵称"
        :value="userInfo.name"
        is-link
        @click="isEditNameShow = true"
      />
      <van-cell
        title="性别"
        :value="userInfo.gender === 0 ? '男' : '女'"
        is-link
        @click="isEditGenderShow = true"
      />
      <van-cell
        title="生日"
        :value="userInfo.birthday"
        is-link
        @click="isEditBirthdayShow = true"
      />
    </van-cell-group>

    <!-- 昵称编辑 -->
    <van-popup v-model="isEditNameShow" position="bottom" style="height: 100%">
      <edit-name
        v-if="isEditNameShow"
        @close="isEditNameShow = false"
        :user-info="userInfo"
        @update-username="userInfo.name = $event"
      ></edit-name>
    </van-popup>

    <!-- 性别编辑 -->
    <van-popup v-model="isEditGenderShow" position="bottom">
      <edit-gender
        v-if="isEditGenderShow"
        v-model="userInfo.gender"
        @close="isEditGenderShow = false"
      ></edit-gender>
    </van-popup>

    <!-- 生日编辑 -->
    <van-popup v-model="isEditBirthdayShow" position="bottom">
      <edit-birthday
        v-if="isEditBirthdayShow"
        v-model="userInfo.birthday"
        @close="isEditBirthdayShow = false"
      ></edit-birthday>
    </van-popup>

    <!-- 头像编辑 -->
    <van-popup
      v-model="isEditAvatarShow"
      position="bottom"
      style="height: 100%"
    >
      <edit-avatar
        v-if="isEditAvatarShow"
        :avatar="avatarImg"
        @close="isEditAvatarShow = false"
        @update-useravatar="userInfo.photo = $event"
      ></edit-avatar>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import EditName from '@/views/user-profile/components/edit-name'
import EditGender from '@/views/user-profile/components/edit-gender'
import EditBirthday from '@/views/user-profile/components/edit-birthday'
import EditAvatar from '@/views/user-profile/components/edit-avatar'

export default {
  name: 'UserProfile',
  components: {
    EditName,
    EditGender,
    EditBirthday,
    EditAvatar
  },
  props: {},
  data () {
    return {
      userInfo: {},
      isEditNameShow: false,
      isEditGenderShow: false,
      isEditBirthdayShow: false,
      isEditAvatarShow: false,
      avatarImg: null
    }
  },
  watch: {},
  computed: {},
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.userInfo = data.data
        console.log(this.userInfo)
      } catch (error) {
        console.log(error)
      }
    },
    onFileChange () {
      const file = this.$refs.file.files[0]

      const data = window.URL.createObjectURL(file)

      this.avatarImg = data
      this.isEditAvatarShow = true

      this.$refs.file.value = ''
    }
  },
  created () {
    this.loadUserProfile()
  },
  mounted () {}
}
</script>

<style lang="less" scoped>
.user-profile {
  .avatar-cell {
    align-items: center;
    .profile-avatar {
      width: 60px;
      height: 60px;
      vertical-align: middle;
    }
  }

  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
