<template>
  <div class="channel-edit">
    <van-cell-group class="my-channel-item">
      <van-cell :border="false">
        <div class="title" slot="title">我的频道</div>
        <van-button
          class="edit-btn"
          type="danger"
          plain
          size="mini"
          round
          @click="onEdit"
          >{{ isEdit ? '完成' : '编辑' }}</van-button
        >
      </van-cell>
      <van-grid class="my-channel-grid" :gutter="10">
        <van-grid-item
          class="grid-item"
          v-for="(channel, index) in myChannel"
          :key="index"
          @click="onMyChannelClick(channel, index)"
        >
          <van-icon
            slot="icon"
            name="close"
            v-show="isEdit && !isFixed.includes(channel.id)"
          />
          <span
            slot="text"
            class="text"
            :class="{ active: index === active }"
            >{{ channel.name }}</span
          >
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <van-cell-group class="my-channel-item">
      <van-cell :border="false">
        <div class="title" slot="title">频道推荐</div>
      </van-cell>
      <van-grid class="recommend-channel-grid" :gutter="10">
        <van-grid-item
          class="grid-item"
          v-for="(channel, index) in recommendChannels"
          :key="index"
          icon="plus"
          :text="channel.name"
          @click="onAddChannel(channel)"
        />
      </van-grid>
    </van-cell-group>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  props: {
    myChannel: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false,
      isFixed: [0]
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      // const channels = []
      // this.allChannels.forEach((channel) => {
      //   const result = this.myChannel.find((myChannel) => {
      //     return myChannel.id === channel.id
      //   })
      //   if (!result) {
      //     channels.push(channel)
      //   }
      // })
      // return channels

      return this.allChannels.filter((channel) => {
        return !this.myChannel.find((myChannel) => {
          return myChannel.id === channel.id
        })
      })
    }
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
        console.log(data)
      } catch (error) {
        this.$toast('频道获取失败')
      }
    },
    async onAddChannel (channel) {
      console.log(channel)
      this.myChannel.push(channel)
      if (this.user) {
        try {
          await addUserChannel({
            id: channel.id,
            seq: this.myChannel.length
          })
        } catch (error) {
          this.$toast('添加失败，请稍后再试')
        }
      } else {
        setItem('TOUTIAO_CHANNEL', this.myChannel)
      }
    },
    onEdit () {
      this.isEdit = !this.isEdit
    },
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        if (this.isFixed.includes(channel.id)) return

        this.myChannel.splice(index, 1)

        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }

        this.deleteChannel(channel)
        console.log('111')
      } else {
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel (channel) {
      try {
        if (this.user) {
          console.log('222')
          await deleteUserChannel(channel.id)
        } else {
          setItem('TOUTIAO_CHANNEL', this.myChannel)
        }
      } catch (error) {
        this.$toast('操作失败，请稍后再试')
      }
    }
  },
  created () {
    this.loadAllChannels()
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;

  .my-channel-item {
    &::after {
      border: none;
    }

    .title {
      font-size: 32px;
      color: #333;
    }

    .edit-btn {
      width: 104px;
      height: 48px;
      font-size: 26px;
      color: #f85959;
      border-color: #f85959;
    }

    .my-channel-grid {
      /deep/ .grid-item {
        width: 160px;
        height: 86px;

        .van-grid-item__content {
          background-color: #f4f5f6;
          .van-grid-item__icon-wrapper {
            position: unset;
            .van-icon-close {
              position: absolute;
              top: -10px;
              right: -10px;
              font-size: 30px;
              z-index: 2;
            }
          }

          .text {
            margin-top: 0;
            font-size: 28px;
            color: #222;
          }

          .active {
            color: red;
          }
        }
      }
    }

    /deep/ .recommend-channel-grid {
      align-items: flex-end;

      .grid-item {
        .van-grid-item__content {
          flex-direction: row;
          background-color: #f4f5f6;
          white-space: nowrap;

          .van-grid-item__icon {
            font-size: 28px;
            margin-right: 6px;
          }

          .van-grid-item__text {
            margin-top: 0;
          }
        }
      }
    }
  }
}
</style>
