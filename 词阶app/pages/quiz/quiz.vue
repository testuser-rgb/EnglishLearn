<template>
  <view class="page">
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
      <!-- 题卡 -->
      <view v-if="!done">
        <view class="subbar">
          <view class="chip new">每日练习</view>
          <text class="idx">{{ idx + 1 }} / {{ queue.length }}</text>
        </view>
        <view class="card quiz-card">
          <text class="lab">{{ lab }}</text>
          <view class="stem" :class="{ cn: cnMode }">{{ stem }}</view>
          <text v-if="!cnMode" class="ph">{{ curWord.ph }}</text>
          <view v-if="!cnMode" class="speak" @click="onSpeak">🔊</view>
          <view class="opts">
            <view
              v-for="(o, i) in opts"
              :key="i"
              class="opt"
              :class="optClass(o, i)"
              @click="answer(o, i)"
            >
              <text class="m">{{ 'ABCD'[i] }}</text>
              <text>{{ o.t }}</text>
            </view>
          </view>
          <view class="fb" :class="fbClass" v-if="answered">
            <text>{{ fbText }}</text>
          </view>
          <view v-if="answered" class="btn-main" @click="next">下一题 →</view>
        </view>
      </view>

      <!-- 完成页 -->
      <view v-else class="card donebox">
        <view class="mk">✎</view>
        <view class="h3">练习完成</view>
        <view class="score">{{ right }}/{{ total }}</view>
        <text class="p">{{ scoreText }}</text>
        <view class="btn-main" @click="again">再来一轮 →</view>
      </view>
    </view>
  </view>
</template>

<script>
import { store } from '@/common/store.js'
import { newWords, revWords, wrongWords, distractors } from '@/common/data.js'
import { speak, toast, settings } from '@/common/utils.js'

export default {
  data() {
    return {
      queue: [],
      idx: 0,
      right: 0,
      answered: false,
      done: false,
      opts: [],
      rightText: '',
      curWord: {},
      isRight: false,
      selectedIdx: -1
    }
  },
  computed: {
    day() {
      return store.state.day
    },
    autoSpeak() {
      return settings.autoSpeak
    },
    accentLabel() {
      return settings.accent === 'en-US' ? '美音' : '英音'
    },
    cnMode() {
      return this.idx % 3 === 2
    },
    lab() {
      const item = this.queue[this.idx]
      if (item && item.retry) return '补考 · 刚才答错了这个词'
      return this.cnMode ? '哪个单词是这个意思？' : '这个单词的意思是？'
    },
    stem() {
      const w = this.curWord
      if (!w.defs) return ''
      return this.cnMode ? w.defs[0][1] : w.w
    },
    fbClass() {
      return this.isRight ? 'good' : 'bad'
    },
    fbText() {
      if (this.isRight) {
        const w = this.curWord
        return '✓ 正确。' + w.w + ' ' + (w.defs ? w.defs.map((d) => d[0] + d[1]).join(' ') : '')
      }
      return '✗ 答错了，正确答案是 ' + this.rightText + '。这个词已收进错词本，本轮末尾还会再考你一次。'
    },
    total() {
      return this.queue.length
    },
    scoreText() {
      return this.right === this.total ? '全对，稳！' : '答错的词已收进错词本，连对两次自动毕业'
    }
  },
  onLoad() {
    this.start()
  },
  methods: {
    start() {
      const pool = [...newWords(this.day), ...revWords(this.day, store.S), ...wrongWords(store.S)]
      const uniq = [...new Map(pool.map((w) => [w.id, w])).values()].slice(0, 8).map((w) => ({ w, retry: false }))
      this.queue = uniq
      this.idx = 0
      this.right = 0
      this.done = false
      if (!this.queue.length) {
        toast('今天还没有可练习的词，先学新词吧')
        setTimeout(() => uni.navigateBack(), 800)
        return
      }
      this.showQuestion()
    },
    showQuestion() {
      const item = this.queue[this.idx]
      const w = item.w
      this.curWord = w
      this.answered = false
      this.isRight = false
      this.selectedIdx = -1
      const cnMode = this.idx % 3 === 2
      const right = cnMode ? w.w : w.defs.map((d) => d[1]).join('；')
      this.rightText = right
      const others = distractors(w.id, cnMode)
      const list = [{ t: right, ok: true }, ...others.map((t) => ({ t, ok: false }))].sort(() => Math.random() - 0.5)
      this.opts = list
      if (!cnMode && settings.autoSpeak) {
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
    optClass(o, i) {
      if (!this.answered) return ''
      if (o.ok) return 'right'
      if (i === this.selectedIdx) return 'wrong'
      return 'locked'
    },
    onSpeak() {
      speak(this.curWord.w)
    },
    answer(o, i) {
      if (this.answered) return
      this.answered = true
      this.selectedIdx = i
      const ok = o.ok
      this.isRight = ok
      const w = this.curWord
      if (ok) {
        this.right++
        const r = store.markQuiz(w, true)
        if (r.released) toast('连对两次，这个词已从错词本放出')
      } else {
        store.markQuiz(w, false)
        this.queue.push({ w, retry: true })
      }
      // 标记选中项（答错标红）
      this.$forceUpdate()
    },
    next() {
      this.idx++
      if (this.idx >= this.queue.length) {
        this.done = true
        return
      }
      this.showQuestion()
    },
    again() {
      this.start()
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
  margin: 6px 0 10px;
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
.idx {
  font-size: 12px;
  color: #948c81;
  font-family: Georgia, serif;
}
.card {
  background: #fdfbf3;
  border: 1px solid #e8e0cd;
  border-radius: 14px;
}
.quiz-card {
  padding: 22px 20px;
  text-align: center;
}
.lab {
  font-size: 12px;
  color: #948c81;
}
.stem {
  font-family: Georgia, serif;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.3;
  margin-top: 10px;
  word-break: break-all;
}
.stem.cn {
  font-family: 'Noto Serif SC', 'Songti SC', serif;
  font-size: 22px;
  color: #6b645b;
}
.ph {
  font-family: Georgia, serif;
  font-size: 13px;
  color: #948c81;
  display: block;
  margin-top: 4px;
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
  margin-top: 8px;
}
.opts {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
}
.opt {
  min-height: 50px;
  border-radius: 12px;
  border: 1px solid #e8e0cd;
  background: #fdfbf3;
  font-size: 14.5px;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  text-align: left;
}
.opt:active {
  transform: scale(0.98);
}
.opt.locked {
  pointer-events: none;
}
.opt.right {
  border-color: #4a8f75;
  background: #e2f0ea;
  color: #4a8f75;
  font-weight: 600;
}
.opt.wrong {
  border-color: #c0503a;
  background: #f5e4df;
  color: #a8412e;
}
.m {
  font-family: Georgia, serif;
  color: #948c81;
  margin-right: 10px;
  font-size: 13px;
}
.fb {
  margin-top: 14px;
  padding: 12px 14px;
  border-radius: 12px;
  font-size: 13px;
  line-height: 1.7;
  text-align: left;
}
.fb.good {
  background: #e2f0ea;
  color: #3f7d68;
}
.fb.bad {
  background: #f5e4df;
  color: #a8412e;
}
.btn-main {
  width: 100%;
  min-height: 46px;
  border-radius: 12px;
  background: #47423c;
  color: #fdfbf3;
  font-size: 14.5px;
  font-weight: 600;
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
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
.score {
  font-family: Georgia, serif;
  font-size: 40px;
  font-weight: 700;
  color: #c0503a;
}
.p {
  font-size: 12.5px;
  color: #948c81;
  margin-bottom: 18px;
  display: block;
}
</style>
