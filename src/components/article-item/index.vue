<template>
  <div class="article-item">
    <van-cell :to="`/article/${article.art_id}`">
      <div class="title van-multi-ellipsis--l2" slot="title">
        {{ article.title }}
      </div>
      <div class="label" slot="label">
        <div v-if="article.cover.type === 3" class="cover-wrap">
          <div
            class="cover-item"
            v-for="(img, index) in article.cover.images"
            :key="index"
          >
            <van-image
              class="cover-item-img"
              fit="cover"
              :src="article.cover.images[index]"
            />
          </div>
        </div>
        <div class="label-info">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </div>
      <van-image
        v-if="article.cover.type === 1"
        slot="default"
        class="right-cover"
        fit="cover"
        :src="article.cover.images[0]"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.article-item {
  .van-cell__value {
    flex: unset;
    padding-left: 25px;
    width: 232px;
    height: 146px;
  }

  .right-cover {
    width: 232px;
    height: 146px;
  }

  .title {
    font-size: 32px;
    color: #3a3a3a;
    font-weight: bold;
  }

  .label {
    .cover-wrap {
      display: flex;
      padding: 30px 0;
      .cover-item {
        flex: 1;
        height: 146px;
        .cover-item-img {
          width: 100%;
          height: 146px;
        }
        &:not(:last-child) {
          padding-right: 4px;
        }
      }
    }
    .label-info {
      font-size: 22px;
      color: #b4b4b4;
      span {
        &:not(:last-child) {
          margin-right: 25px;
        }
      }
    }
  }
}
</style>
