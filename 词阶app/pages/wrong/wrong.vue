<template>
  <view class="page">
    <view class="hd">
      <view class="row">
        <text class="brand">墨<text class="brand-i">记</text></text>
        <text class="brand-sub">错词本</text>
      </view>
    </view>

    <view class="body">
      <view class="sec">错词合集<text class="sec-s">答错的词在这毕业：连对两次就走</text></view>

      <view v-if="list.length" class="wlist">
        <view v-for="w in list" :key="w.id" class="card wrow">
          <view class="wcol">
            <view class="wline">
              <text class="w">{{ w.w }}</text>
              <text class="badge">错 {{ w.wrong }} 次</text>
            </view>
            <text class="d">{{ w.meaning }}{{ w.streak > 0 ? ' · 连对' + w.streak + '/2' : '' }}</text>
          </view>
          <view class="acts">
            <view class="act" @click="note(w)">看笔记</view>
            <view class="act" @click="test(w)">自测</view>
          </view>
        </view>
      </view>
      <view v-else class="empty">✓ 错词本空着呢。答错的词会自动收进这里。</view>
    </view>
  </view>
</template>

<script>
import { store } from '@/common/store.js'
import { wrongWords } from '@/common/data.js'

export default {
  data() {
    return {
      list: []
    }
  },
  onShow() {
    this.refresh()
  },
  methods: {
    refresh() {
      this.list = wrongWords(store.S).map((w) => ({
        id: w.id,
        w: w.w,
        meaning: w.defs ? w.defs[0][1] : '',
        wrong: store.S.st[w.id].wrong,
        streak: store.S.st[w.id].streak
      }))
    },
    note(w) {
      // 跳转到学词页，单词条重看模式
      uni.navigateTo({ url: '/pages/learn/learn?mode=new&wordId=' + w.id })
    },
    test(w) {
      uni.navigateTo({ url: '/pages/learn/learn?mode=recall&wordId=' + w.id })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #f7f1e3;
}
.hd {
  padding: calc(10px + env(safe-area-inset-top)) 18px 10px;
  border-bottom: 1px solid #efe9d9;
}
.row {
  display: flex;
  align-items: baseline;
  gap: 10px;
}
.brand {
  font-family: 'Noto Serif SC', 'Songti SC', serif;
  font-size: 17px;
  letter-spacing: 3px;
  font-weight: 700;
}
.brand-i {
  color: #c0503a;
}
.brand-sub {
  font-size: 13px;
  color: #948c81;
}
.body {
  padding: 0 16px 40px;
}
.sec {
  font-family: 'Noto Serif SC', 'Songti SC', serif;
  font-size: 15px;
  letter-spacing: 1.5px;
  font-weight: 700;
  margin: 18px 2px 8px;
}
.sec-s {
  font-weight: 400;
  color: #948c81;
  font-size: 11px;
  letter-spacing: 0;
  margin-left: 8px;
}
.card {
  background: #fdfbf3;
  border: 1px solid #e8e0cd;
  border-radius: 14px;
}
.wlist {
  margin-top: 12px;
}
.wrow {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 16px;
  margin-bottom: 9px;
}
.wcol {
  flex: 1;
  min-width: 0;
}
.wline {
  display: flex;
  align-items: center;
  gap: 8px;
}
.w {
  font-family: Georgia, serif;
  font-size: 17px;
  font-weight: 700;
  color: #a8412e;
}
.badge {
  font-size: 10px;
  background: #f5e4df;
  color: #a8412e;
  border-radius: 8px;
  padding: 1px 7px;
}
.d {
  font-size: 12px;
  color: #948c81;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}
.acts {
  display: flex;
  gap: 6px;
}
.act {
  font-size: 11.5px;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #e8e0cd;
  background: #f2ecdb;
  color: #6b645b;
}
.empty {
  text-align: center;
  padding: 40px 16px;
  color: #948c81;
  font-size: 13px;
}
</style>
