<template>
  <view class="page">
    <!-- 顶栏 -->
    <view class="hd">
      <view class="row">
        <view class="hd-back" @click="goBack">← 返回</view>
        <view class="hd-tools">
          <view class="tool" :class="{ on: autoSpeak }" @click="toggleSpeak">🔊</view>
          <view class="tool accent" @click="toggleAccent">{{ accentLabel }}</view>
        </view>
      </view>
    </view>

    <view class="body">
      <!-- 子栏 -->
      <view class="subbar">
        <view class="chip" :class="chipClass">{{ chipText }}</view>
        <text class="idx">{{ idx + 1 }} / {{ total }}</text>
      </view>
      <view class="progline"><view class="progline-i" :style="{ width: progress }"></view></view>

      <!-- 学词模式 -->
      <view v-if="subMode === 'learn'">
        <note-card :w="curWord" @speak="onSpeak" />
        <view class="nav3">
          <view class="nav-btn" @click="prev">← 上一个</view>
          <view class="nav-btn soft" @click="finish">完成本轮 ✓</view>
          <view class="nav-btn primary" @click="next">下一个 →</view>
        </view>
      </view>

      <!-- 自测模式 -->
      <view v-else-if="subMode === 'recall'">
        <view class="card recall">
          <view class="chip rev recall-chip">{{ recallChip }}</view>
          <view class="rw">{{ curWord.w }}</view>
          <text class="rp">{{ curWord.ph }}</text>
          <view class="speak" @click="onSpeak(curWord.w)">🔊</view>
          <text class="tip">{{ tip }}</text>
          <view v-if="!recallOpen" class="reveal" @click="reveal">显示答案与记法 ↓</view>
          <view v-else class="answer">
            <note-card :w="curWord" :show-head="false" />
          </view>
        </view>
        <view v-if="!recallOpen" class="racts">
          <view class="ract" @click="skip">先跳过这个词</view>
        </view>
        <view v-else class="racts">
          <view class="ract no" @click="answer(false)">没想起来 · 等下再来</view>
          <view class="ract yes" @click="answer(true)">想起来了 →</view>
        </view>
      </view>

      <!-- 完成页 -->
      <view v-else class="card donebox">
        <view class="mk">✓</view>
        <view class="h3">这一轮过完了</view>
        <text class="p">{{ doneText }}</text>
        <view class="btn-ghost2" @click="backToReview">← 回头翻看刚学的词</view>
        <view class="btn-main red" @click="goRecall">去复习自测 →</view>
      </view>
    </view>
  </view>
</template>

<script>
import { store } from '@/common/store.js'
import { newWords, revWords, wrongWords, findWord } from '@/common/data.js'
import { speak, toast, settings } from '@/common/utils.js'
import NoteCard from '@/components/note-card/note-card.vue'

export default {
  components: { NoteCard },
  data() {
    return {
      mode: 'new', // new | rev（重看笔记）
      wordId: null,
      subMode: 'learn', // learn | recall | done
      queue: [],
      idx: 0,
      recallOpen: false,
      recallRetry: false
    }
  },
  computed: {
    day() {
      return store.state.day
    },
    curWord() {
      return this.queue[this.idx] || {}
    },
    total() {
      return this.queue.length
    },
    progress() {
      return this.total ? ((this.idx + 1) / this.total) * 100 + '%' : '0%'
    },
    chipClass() {
      if (this.subMode === 'learn') return this.mode === 'new' ? 'new' : 'rev'
      return 'rev'
    },
    chipText() {
      if (this.subMode === 'recall') return '自测'
      return this.mode === 'new' ? '学新词' : '重看笔记'
    },
    recallChip() {
      return this.recallRetry ? '刚才没想起 · 再来一次' : '回忆练习'
    },
    tip() {
      return this.recallOpen ? '对照一下：你刚才想到了吗？' : '先别看下面，在心里说出意思'
    },
    doneText() {
      return this.mode === 'recall'
        ? '本轮自测完成。没想起来的词已经又考过一次，并收进错词本。'
        : this.queue.length + ' 个词已看过，明天会回到复习队列。想再看一遍就点下面。'
    },
    autoSpeak() {
      return settings.autoSpeak
    },
    accentLabel() {
      return settings.accent === 'en-US' ? '美音' : '英音'
    }
  },
  onLoad(options) {
    this.mode = options.mode === 'recall' ? 'recall' : 'new'
    this.wordId = options.wordId ? Number(options.wordId) : null
    this.start()
  },
  methods: {
    start() {
      // 单词条模式：错词本「看笔记 / 自测」跳入
      if (this.wordId != null) {
        const w = findWord(this.wordId)
        if (w) {
          this.queue = [w]
          this.idx = 0
          this.recallOpen = false
          this.recallRetry = false
          this.subMode = this.mode === 'recall' ? 'recall' : 'learn'
          this.autoSpeak()
          return
        }
      }
      if (this.mode === 'recall') {
        this.startRecall()
      } else {
        this.startLearn()
      }
    },
    startLearn() {
      this.subMode = 'learn'
      this.queue = newWords(this.day)
      this.idx = 0
      if (!this.queue.length) {
        this.subMode = 'done'
        return
      }
      this.autoSpeak()
    },
    startRecall() {
      const pool = [...revWords(this.day, store.S), ...wrongWords(store.S)]
      this.queue = [...new Map(pool.map((w) => [w.id, w])).values()]
      this.idx = 0
      this.recallOpen = false
      this.recallRetry = false
      if (!this.queue.length) {
        toast('今天还没有到期的旧词。新词学过后，明天就会开始回到复习队列。')
        // 空队列：提示后返回上一页
        setTimeout(() => uni.navigateBack(), 800)
        return
      }
      this.subMode = 'recall'
      this.autoSpeak()
    },
    autoSpeak() {
      const w = this.curWord
      if (w && w.w && settings.autoSpeak) {
        setTimeout(() => speak(w.w), 260)
      }
    },
    toggleSpeak() {
      settings.autoSpeak = !settings.autoSpeak
      if (settings.autoSpeak) this.onSpeak()
    },
    toggleAccent() {
      settings.accent = settings.accent === 'en-US' ? 'en-GB' : 'en-US'
      this.onSpeak()
    },
    onSpeak(word) {
      speak(word || (this.curWord && this.curWord.w))
    },
    prev() {
      if (!this.queue.length) return
      this.idx = this.idx <= 0 ? this.queue.length - 1 : this.idx - 1
    },
    next() {
      const w = this.curWord
      if (w && w.id != null) store.learned(w)
      if (this.idx + 1 >= this.queue.length) {
        this.subMode = 'done'
        return
      }
      this.idx++
      this.autoSpeak()
    },
    finish() {
      this.subMode = 'done'
    },
    backToReview() {
      if (!this.queue.length) return
      this.idx = 0
      this.subMode = 'learn'
      this.recallOpen = false
    },
    goRecall() {
      this.mode = 'recall'
      this.startRecall()
    },
    // 自测
    reveal() {
      this.recallOpen = true
    },
    skip() {
      this.idx++
      if (this.idx >= this.queue.length) {
        this.subMode = 'done'
        this.mode = 'new'
      }
    },
    answer(ok) {
      const w = this.curWord
      if (!w || w.id == null) return
      const wasRetry = this.recallRetry
      store.markRecall(w, ok)
      if (!ok) {
        this.recallRetry = true
        // 错词末尾重考
        this.queue.push(w)
        toast('没关系，这个词待会儿在本轮再考你一次')
      }
      this.idx++
      if (this.idx >= this.queue.length) {
        this.subMode = 'done'
        this.mode = 'recall'
      } else {
        this.recallOpen = false
        this.recallRetry = false
        this.autoSpeak()
      }
    },
    goBack() {
      uni.navigateBack()
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
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hd-back {
  font-size: 13px;
  font-weight: 600;
  padding: 7px 14px;
  border-radius: 18px;
  background: #f5e4df;
  color: #a8412e;
  display: inline-block;
}
.hd-tools {
  display: flex;
  align-items: center;
  gap: 8px;
}
.tool {
  font-size: 13px;
  padding: 7px 12px;
  border-radius: 16px;
  border: 1px solid #e8e0cd;
  background: #fdfbf3;
  color: #948c81;
}
.tool.on {
  background: #f5e4df;
  color: #a8412e;
  border-color: #e8c9be;
}
.tool.accent {
  font-weight: 600;
}
.body {
  padding: 0 16px 40px;
}
.subbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 6px;
}
.chip {
  font-size: 11px;
  letter-spacing: 1px;
  padding: 2px 10px;
  border-radius: 12px;
  font-weight: 600;
}
.chip.new {
  background: #f5e4df;
  color: #a8412e;
}
.chip.rev {
  background: #e2f0ea;
  color: #4a8f75;
}
.idx {
  font-size: 12px;
  color: #948c81;
  font-family: Georgia, serif;
}
.progline {
  height: 3px;
  background: #f2ecdb;
  border-radius: 3px;
  overflow: hidden;
}
.progline-i {
  height: 100%;
  background: #c0503a;
  transition: width 0.35s ease;
}

.nav3 {
  display: flex;
  gap: 10px;
  margin-top: 14px;
}
.nav-btn {
  flex: 1;
  min-height: 46px;
  border-radius: 12px;
  border: 1px solid #e8e0cd;
  background: #fdfbf3;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-btn:active {
  transform: scale(0.97);
}
.nav-btn.primary {
  background: #47423c;
  color: #fdfbf3;
  border-color: #47423c;
  font-weight: 600;
}
.nav-btn.soft {
  color: #948c81;
}

/* 自测 */
.recall {
  text-align: center;
  padding: 30px 22px 26px;
  margin-top: 12px;
}
.recall-chip {
  display: inline-block;
}
.rw {
  font-family: Georgia, serif;
  font-size: 40px;
  font-weight: 700;
  color: #a8412e;
  line-height: 1.15;
  word-break: break-all;
  margin-top: 22px;
}
.rp {
  font-family: Georgia, serif;
  font-size: 14px;
  color: #948c81;
  margin-top: 6px;
  display: block;
}
.speak {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f5e4df;
  color: #a8412e;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
.tip {
  font-size: 12px;
  color: #948c81;
  margin-top: 14px;
  display: block;
}
.reveal {
  margin-top: 20px;
  width: 100%;
  min-height: 44px;
  border-radius: 12px;
  background: #c0503a;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}
.answer {
  text-align: left;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid #efe9d9;
}
.defs {
  padding-bottom: 12px;
}
.def-line {
  display: flex;
  gap: 8px;
  font-size: 15px;
  padding: 2px 0;
}
.pos {
  color: #948c81;
  font-size: 12.5px;
  flex-shrink: 0;
}
.key {
  color: #a8412e;
  font-weight: 600;
  text-decoration: underline;
}
.racts {
  display: flex;
  gap: 10px;
  margin-top: 14px;
}
.ract {
  flex: 1;
  min-height: 46px;
  border-radius: 12px;
  font-size: 13.5px;
  border: 1px solid #e8e0cd;
  background: #fdfbf3;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 6px;
}
.ract.no {
  color: #a8412e;
}
.ract.yes {
  background: #4a8f75;
  color: #fff;
  border-color: #4a8f75;
  font-weight: 600;
}

/* 完成 */
.card {
  background: #fdfbf3;
  border: 1px solid #e8e0cd;
  border-radius: 14px;
}
.donebox {
  text-align: center;
  padding: 44px 20px;
  margin-top: 12px;
}
.mk {
  width: 56px;
  height: 56px;
  margin: 0 auto;
  border-radius: 50%;
  background: #e2f0ea;
  color: #4a8f75;
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.h3 {
  font-family: 'Noto Serif SC', 'Songti SC', serif;
  font-size: 18px;
  margin: 14px 0 6px;
  font-weight: 700;
}
.p {
  font-size: 12.5px;
  color: #948c81;
  margin-bottom: 18px;
  display: block;
}
.btn-ghost2 {
  width: 100%;
  min-height: 42px;
  border-radius: 12px;
  border: 1px solid #e8e0cd;
  background: #fdfbf3;
  color: #6b645b;
  font-size: 13.5px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-main {
  width: 100%;
  min-height: 46px;
  border-radius: 12px;
  background: #47423c;
  color: #fdfbf3;
  font-size: 14.5px;
  font-weight: 600;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-main.red {
  background: #c0503a;
}
</style>
