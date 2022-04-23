<template>
  <div class="channel-edit">
    <van-cell-group class="my-channel-item">
      <van-cell :border="false">
        <div class="title" slot="title">我的频道</div>
        <van-button class="edit-btn" type="danger" plain size="mini" round
          >编辑</van-button
        >
      </van-cell>
      <van-grid class="my-channel-grid" :gutter="10">
        <van-grid-item
          class="grid-item"
          v-for="(channel, index) in myChannel"
          :key="index"
          icon="close"
        >
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
        />
      </van-grid>
    </van-cell-group>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'

export default {
  name: 'ChannelEdit',
  props: {
    myChannel: {
      type: Array,
      require: true
    },
    active: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      allChannels: []
    }
  },
  computed: {
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
  created () {
    this.loadAllChannels()
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
    }
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

          .van-grid-item__icon {
            position: absolute;
            top: -10px;
            right: -10px;
            font-size: 30px;
            z-index: 2;
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
