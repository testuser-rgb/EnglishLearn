/**
 * 状态层：全局存档 + 判定逻辑 + 持久化
 * 用 Vue3 reactive 实现跨页面共享的单一状态源（等价于原型里的 S / day 全局变量）
 */
import { reactive } from 'vue'
import { INTERVALS, getWords, newWords } from './data'

// 移动端存档 key（与原型一致）
const KEY = 'cijie_m2'

// 存储降级：uni.getStorageSync 不可用时退化为内存
const memStore = {}
function getStore() {
  try {
    return uni.getStorageSync(KEY)
  } catch (e) {
    return null
  }
}
function setStore(v) {
  try {
    uni.setStorageSync(KEY, v)
  } catch (e) {
    /* 内存降级 */
    memStore[KEY] = v
  }
}
function removeStore() {
  try {
    uni.removeStorageSync(KEY)
  } catch (e) {}
  delete memStore[KEY]
}

// 构建一个词条的初始状态
function freshWordState() {
  return { stage: -1, due: null, seen: false, wrong: 0, streak: 0, result: null }
}

// 全量初始化存档
function fresh() {
  const words = getWords()
  const st = {}
  words.forEach((w) => {
    st[w.id] = freshWordState()
  })
  return { st, done: {}, quizDone: {} }
}

// 读取存档
function load() {
  const s = getStore()
  if (s && s.st) return s
  return fresh()
}

// 全局单例状态
const S = reactive(load())
const state = reactive({
  day: (() => {
    const s = getStore()
    const d = s && s.day ? Number(s.day) : 1
    return d >= 1 && d <= 30 ? d : 1
  })()
})

// 保存
function save() {
  const raw = JSON.parse(JSON.stringify(S))
  raw.day = state.day
  setStore(raw)
}

// ============ 判定逻辑 ============

/** 检查当天新词是否全部学完，学完则推进到下一天 */
function tryAdvanceDay() {
  const today = newWords(state.day)
  if (today.length && today.every((w) => S.st[w.id].seen)) {
    if (state.day < 30) {
      state.day += 1
      save()
    }
  }
}

/** 学习一个新词（「下一个」时记录） */
function learned(w) {
  const x = S.st[w.id]
  if (!x.seen) {
    x.seen = true
    x.stage = 0
    x.due = state.day + 1
  }
  x.result = 'learned'
  S.done[w.id] = state.day
  save()
  tryAdvanceDay()
}

/** 自测判定：ok=想起来 */
function markRecall(w, ok) {
  const x = S.st[w.id]
  if (ok) {
    x.streak = (x.streak || 0) + 1
    x.result = 'ok'
    if (x.streak >= 2) {
      x.streak = 0
      x.wrong = 0
      x.stage = Math.min(Math.max(x.stage, 0) + 1, INTERVALS.length - 1)
      x.due = state.day + INTERVALS[x.stage]
    } else {
      x.due = state.day + 1
    }
  } else {
    x.wrong++
    x.streak = 0
    x.seen = true
    x.stage = 0
    x.due = state.day + 1
    x.result = 'bad'
  }
  S.done[w.id] = state.day
  save()
}

/** 练习判定：ok=答对。返回 { released } 表示是否连对两次放出错词本 */
function markQuiz(w, ok) {
  const x = S.st[w.id]
  let released = false
  if (ok) {
    x.streak = (x.streak || 0) + 1
    x.result = 'ok'
    if (x.streak >= 2 && x.wrong > 0) {
      x.wrong = 0
      x.streak = 0
      released = true
    }
  } else {
    x.wrong++
    x.streak = 0
    x.seen = true
    x.stage = 0
    x.due = state.day + 1
    x.result = 'bad'
  }
  S.done[w.id] = state.day
  save()
  return { released }
}

// ============ 清空存档 ============

/** 清空存档 */
function resetAll() {
  removeStore()
}

export const store = {
  S,
  state,
  save,
  fresh,
  learned,
  markRecall,
  markQuiz,
  resetAll
}
