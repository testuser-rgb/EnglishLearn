<template>
  <view class="page">
    <!-- 顶栏 -->
    <view class="hd">
      <view class="row">
        <text class="brand">墨<text class="brand-i">记</text></text>
        <view class="dwrap">
          第 <text class="dday">{{ day }}</text> 天 / 30
        </view>
      </view>
      <view class="line"><view class="line-i" :style="{ width: (day / 30) * 100 + '%' }"></view></view>
    </view>

    <!-- 今日主卡 -->
    <view class="card hero">
      <view class="ring">
        <view class="ring-progress" :style="ringStyle"></view>
        <view class="ring-inner">
          <text class="ring-pct">{{ pct }}%</text>
        </view>
      </view>
      <view class="t">
        <view class="big">第 <text class="big-d">{{ day }}</text> 天 / 30</view>
        <text class="p">{{ heroLine }}</text>
      </view>
    </view>

    <!-- 统计行 -->
    <view class="card stats">
      <view class="stat hl"><text class="num">{{ stNew }}</text><text class="lab">今日新词</text></view>
      <view class="stat"><text class="num">{{ stRev }}</text><text class="lab">到期复习</text></view>
      <view class="stat"><text class="num">{{ stWrong }}</text><text class="lab">错词待清</text></view>
    </view>

    <view class="sec">今天的事<text class="sec-s">点卡片直接开始</text></view>

    <!-- 任务卡 -->
    <view class="card go-card new" @click="go('learn')">
      <view class="n">{{ stNew }}<text class="n-s"> 词</text></view>
      <view class="g">
        <text class="k">学新词</text>
        <text class="d">摊开一页：读音、意思、记法全看见</text>
      </view>
      <text class="arw">→</text>
    </view>
    <view class="card go-card rev" :class="{ dim: stRev === 0 }" @click="go('recall')">
      <view class="n">{{ stRev }}<text class="n-s"> 词</text></view>
      <view class="g">
        <text class="k">复习自测</text>
        <text class="d">到期的旧词，先回想再揭晓</text>
      </view>
      <text class="arw">→</text>
    </view>
    <view class="card go-card" @click="go('quiz')">
      <view class="n">✎</view>
      <view class="g">
        <text class="k">每日练习</text>
        <text class="d">四选一快速过一遍学过的词</text>
      </view>
      <text class="arw">→</text>
    </view>

    <view class="sec">30 天进度<text class="sec-s">绿=已学 · 金点=有词回来</text></view>
    <scroll-view class="calbar" scroll-x :show-scrollbar="false">
      <view v-for="d in 30" :key="d" class="cell" :class="cellClass(d)">
        {{ d }}<text v-if="isDone(d)" class="tick">✓</text>
        <text v-if="hasDue(d) && d !== day" class="dot"></text>
      </view>
    </scroll-view>

    <view class="foot-note">摊开一页就全看得见 · 到点自动回滚 · 数据存本机</view>

    <!-- 底部导航 -->
    <custom-tabbar active="today" @navigate="onNavigate" />
  </view>
</template>

<script>
import { store } from '@/common/store.js'
import { newWords, revWords, wrongWords, getWords } from '@/common/data.js'
import CustomTabbar from '@/components/custom-tabbar/custom-tabbar.vue'

export default {
  components: { CustomTabbar },
  data() {
    return {}
  },
  computed: {
    day() {
      return store.state.day
    },
    nw() {
      return newWords(this.day)
    },
    rv() {
      return revWords(this.day, store.S)
    },
    total() {
      return this.nw.length + this.rv.length
    },
    doneCount() {
      const ids = new Set([...this.nw, ...this.rv].map((w) => w.id))
      return [...ids].filter((id) => store.S.done[id] === this.day).length
    },
    pct() {
      return this.total ? Math.round((this.doneCount / this.total) * 100) : 100
    },
    stNew() {
      return this.nw.length
    },
    stRev() {
      return this.rv.length
    },
    stWrong() {
      return wrongWords(store.S).length
    },
    heroLine() {
      if (!this.total) return '今天没有新词，也没有到期的旧词。'
      if (this.rv.length) return `今天 ${this.nw.length} 个新词，${this.rv.length} 个旧词到期。`
      return `今天 ${this.nw.length} 个新词，学完排进回滚队列。`
    },
    ringStyle() {
      // conic-gradient 进度环：完成比例着色，其余为底色
      return { background: `conic-gradient(#c0503a ${this.pct * 3.6}deg, #ede5d2 0deg)` }
    }
  },
  onShow() {
    // store 为响应式，返回本页时 computed 自动刷新
  },
  methods: {
    isDone(d) {
      return Object.values(store.S.done).includes(d)
    },
    hasDue(d) {
      const words = getWords()
      return words.some((w) => {
        const x = store.S.st[w.id]
        return x.seen && x.due === d
      })
    },
    cellClass(d) {
      if (d === this.day) return 'today'
      if (d < this.day || this.isDone(d)) return 'done'
      return ''
    },
    go(target) {
      if (target === 'learn') uni.navigateTo({ url: '/pages/learn/learn?mode=new' })
      else if (target === 'recall') uni.navigateTo({ url: '/pages/learn/learn?mode=recall' })
      else if (target === 'quiz') uni.navigateTo({ url: '/pages/quiz/quiz' })
    },
    onNavigate(target) {
      if (target === 'today') return
      if (target === 'learn') uni.navigateTo({ url: '/pages/learn/learn?mode=new' })
      else if (target === 'recall') uni.navigateTo({ url: '/pages/learn/learn?mode=recall' })
      else if (target === 'quiz') uni.navigateTo({ url: '/pages/quiz/quiz' })
      else if (target === 'wrong') uni.navigateTo({ url: '/pages/wrong/wrong' })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  padding-bottom: 40px;
}
.hd {
  position: sticky;
  top: 0;
  z-index: 30;
  background: rgba(249, 246, 238, 0.96);
  border-bottom: 1px solid #efe9d9;
  padding: calc(10px + env(safe-area-inset-top)) 18px 10px;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
.dwrap {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #948c81;
}
.dday {
  font-family: Georgia, serif;
  color: #c0503a;
  font-size: 14px;
  font-weight: 700;
}
.line {
  margin-top: 8px;
  height: 3px;
  border-radius: 3px;
  background: #f2ecdb;
  overflow: hidden;
}
.line-i {
  height: 100%;
  background: linear-gradient(90deg, #c0503a, #c9a23c);
  border-radius: 3px;
  transition: width 0.5s ease;
}

.card {
  background: #fdfbf3;
  border: 1px solid #e8e0cd;
  border-radius: 14px;
}
.hero {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 16px 18px;
  margin: 14px 16px 0;
}
.ring {
  position: relative;
  width: 76px;
  height: 76px;
  flex-shrink: 0;
}
.ring-progress {
  position: absolute;
  inset: 0;
  border-radius: 50%;
}
.ring-inner {
  position: absolute;
  inset: 7px;
  background: #fdfbf3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ring-pct {
  font-family: Georgia, serif;
  font-size: 17px;
  font-weight: 700;
  color: #47423c;
}
.t {
  flex: 1;
  min-width: 0;
}
.big {
  font-family: 'Noto Serif SC', 'Songti SC', serif;
  font-size: 17px;
  font-weight: 700;
}
.big-d {
  color: #c0503a;
  font-family: Georgia, serif;
}
.p {
  font-size: 12.5px;
  color: #948c81;
  margin-top: 3px;
}

.stats {
  display: flex;
  margin: 10px 16px 0;
}
.stat {
  flex: 1;
  text-align: center;
  padding: 10px 0 12px;
  border-right: 1px solid #efe9d9;
}
.stat:last-child {
  border: none;
}
.num {
  display: block;
  font-family: Georgia, serif;
  font-size: 20px;
  line-height: 1.2;
}
.lab {
  font-size: 10.5px;
  color: #948c81;
}
.hl .num {
  color: #c0503a;
}

.sec {
  font-family: 'Noto Serif SC', 'Songti SC', serif;
  font-size: 15px;
  letter-spacing: 1.5px;
  font-weight: 700;
  margin: 18px 18px 8px;
}
.sec-s {
  font-weight: 400;
  color: #948c81;
  font-size: 11px;
  letter-spacing: 0;
  margin-left: 8px;
}

.go-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 16px;
  margin: 10px 16px 0;
}
.go-card:active {
  transform: scale(0.985);
}
.n {
  font-family: Georgia, serif;
  font-size: 24px;
  font-weight: 700;
  min-width: 44px;
  text-align: center;
}
.n-s {
  font-size: 11px;
  color: #948c81;
  font-weight: 400;
}
.g {
  flex: 1;
  min-width: 0;
}
.k {
  font-size: 14px;
  font-weight: 600;
  display: block;
}
.d {
  font-size: 11px;
  color: #948c81;
  margin-top: 1px;
  display: block;
}
.arw {
  color: #948c81;
  font-size: 16px;
}
.go-card.new .n {
  color: #a8412e;
}
.go-card.rev .n {
  color: #4a8f75;
}
.go-card.dim {
  opacity: 0.5;
  pointer-events: none;
}

.calbar {
  display: flex;
  gap: 4px;
  padding: 12px 14px;
  white-space: nowrap;
  margin: 0 16px;
}
.cell {
  flex-shrink: 0;
  width: 26px;
  height: 32px;
  border-radius: 7px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-family: Georgia, serif;
  border: 1px solid #efe9d9;
  background: #f2ecdb;
  color: #948c81;
  position: relative;
  margin-right: 4px;
}
.cell.done {
  background: #e2f0ea;
  border-color: #b7d8c8;
  color: #4a8f75;
}
.cell.today {
  background: #c0503a;
  border-color: #a8412e;
  color: #fff;
  font-weight: 700;
}
.cell .dot {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #c9a23c;
}
.cell .tick {
  font-size: 9px;
}
.foot-note {
  text-align: center;
  font-size: 10.5px;
  color: #948c81;
  margin-top: 22px;
  letter-spacing: 0.5px;
}
</style>
