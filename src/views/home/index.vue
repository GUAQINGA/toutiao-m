<template>
  <div class="home-container">
    <!-- 搜索框 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        icon="search"
        round
        >搜索</van-button
      >
    </van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs class="channel-tab" v-model="active" animated swipeable>
      <van-tab
        v-for="channel in channelList"
        :key="channel.id"
        :title="channel.name"
      >
        <article-list :channel="channel"></article-list>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isChannelShow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 频道编辑 -->
    <van-popup
      v-model="isChannelShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :my-channel="channelList"
        :active="active"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from '@/components/article-list'
import ChannelEdit from '@/components/channel-edit'

export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channelList: [],
      isChannelShow: false
    }
  },
  created () {
    this.loadChannels()
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserChannels()
        this.channelList = data.data.channels
      } catch (error) {
        this.$toast('获取频道数据失败！')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/ .van-nav-bar__title {
    max-width: unset;

    .search-btn {
      width: 555px;
      height: 64px;
      font-size: 28px;
      background-color: #5babfb;
      border: none;

      i.van-icon {
        font-size: 32px;
      }
    }
  }

  /deep/.channel-tab {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      height: 82px;
      z-index: 99;

      .van-tabs__nav {
        padding-left: 0;
        padding-right: 0;
        padding-bottom: 0;
      }
    }

    .van-tab {
      min-width: 200px;
      font-size: 30px;
      color: #777;
      border-right: 1px solid #edeff3;
    }

    .van-tab--active {
      color: #333;
    }

    .van-tabs__line {
      bottom: 8px;
      width: 31px;
      height: 6px;
      background-color: #3296fa;
    }

    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    .hamburger-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.85;
      i.toutiao {
        font-size: 33px;
      }
      &::before {
        content: '';
        position: absolute;
        left: 0;
        width: 2px;
        height: 100%;
        background-image: url('~@/assets/gradient-gray-line.png');
        background-size: contain;
      }
    }
  }
}
</style>
