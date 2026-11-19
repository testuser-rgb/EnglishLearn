/**
 * 公共工具：发音、文本转义、助记卡渲染
 */
import { reactive } from 'vue'

// 全局设置（发音等）
export const settings = reactive({
  autoSpeak: true,
  accent: 'en-US' // en-US 美音 / en-GB 英音
})

// HTML 转义
export function esc(s) {
  return String(s).replace(/[<>]/g, '')
}

/**
 * 朗读单词。
 * - App 端（HBuilderX 打包）：优先用原生 TTS plus.speech，调用系统语音引擎，真机可发音
 * - H5 端（浏览器调试）：用 Web Speech API speechSynthesis
 */
export function speak(word) {
  if (!word) return
  const lang = settings.accent

  // App 端原生 TTS（plus 对象仅在 App 运行时存在）
  if (typeof plus !== 'undefined' && plus.speech) {
    try {
      plus.speech.start({
        text: word,
        lang: lang,
        rate: 0.85
      })
      return
    } catch (e) {}
  }

  // H5 / 浏览器端 Web Speech API
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(word)
      u.lang = lang
      u.rate = 0.85
      window.speechSynthesis.speak(u)
      return
    } catch (e) {}
  }

  uni.showToast({ title: '当前设备不支持语音朗读', icon: 'none' })
}

// 格式化释义（defs 数组：[[词性, 释义, 是否重点]]）
export function fmtDefs(defs) {
  return defs.map((d) => ({ pos: d[0], meaning: d[1], key: !!d[2] }))
}

// 助记卡四栏数据（返回数组，供 v-for 渲染）
export function renderAids(w) {
  const aids = []
  if (w.ety) aids.push({ tag: '拆件', cls: 'part', val: w.ety })
  if (w.mem) aids.push({ tag: '一秒记住', cls: 'mem', val: w.mem })
  if (w.hint) aids.push({ tag: '提示', cls: 'mem', val: w.hint })
  if (w.ex) aids.push({ tag: '挂句', cls: 'sent', val: w.ex })
  if (w.nua) aids.push({ tag: '辨析', cls: 'diff', val: w.nua })
  return aids
}

// 轻提示
let toastTimer = null
export function toast(msg) {
  uni.showToast({ title: msg, icon: 'none', duration: 2200 })
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => uni.hideToast(), 2200)
}
