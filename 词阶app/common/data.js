/**
 * 数据层：词库常量与查询
 * 词库数据内联自 common/words.js（由《学位英语六步记忆卡》转换，1877 词 / 30 天）
 */
import { WORDS, DAYS } from './words.js'

// 每天词量（原始分配，30 天）
export { DAYS }

// 回滚间隔阶梯（艾宾浩斯）
export const INTERVALS = [1, 2, 4, 7, 15, 30]

// 每日到期复习词上限（≥ 每日新词 × 2）
export const REV_CAP = Math.max(20, Math.max(...DAYS) * 2)

export function getWords() {
  return WORDS
}

/**
 * 今日新词
 */
export function newWords(day) {
  return WORDS.filter((w) => w.day === day)
}

/**
 * 到期复习词（错词优先、按到期日排序，截取 REV_CAP）
 */
export function revWords(day, S) {
  return WORDS.filter((w) => {
    const x = S.st[w.id]
    return x.seen && x.due != null && x.due <= day
  })
    .sort((a, b) => {
      const A = S.st[a.id]
      const B = S.st[b.id]
      if ((A.wrong > 0) !== (B.wrong > 0)) return A.wrong > 0 ? -1 : 1
      return A.due - B.due
    })
    .slice(0, REV_CAP)
}

/**
 * 错词（wrong > 0）
 */
export function wrongWords(S) {
  return WORDS.filter((w) => S.st[w.id].wrong > 0)
}

/**
 * 按 id 查词
 */
export function findWord(id) {
  return WORDS.find((w) => w.id === Number(id))
}

/**
 * 生成干扰项：随机取 3 个其他词条
 */
export function distractors(excludeId, cnMode) {
  return WORDS.filter((x) => x.id !== excludeId)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((x) => (cnMode ? x.w : x.defs.map((d) => d[1]).join('；')))
}
