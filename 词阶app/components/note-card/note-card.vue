<template>
  <view class="note" :class="{ flat: !showHead }">
    <view v-if="showHead" class="head">
      <text class="nw">{{ w.w }}</text>
      <text class="nph">{{ w.ph }}</text>
      <view class="speak" :class="{ playing }" @click="onSpeak">🔊</view>
    </view>
    <view class="defs">
      <view class="def-line" v-for="(d, i) in defs" :key="i">
        <text class="pos">{{ d.pos }}</text>
        <text :class="d.key ? 'key' : ''">{{ d.meaning }}</text>
      </view>
    </view>
    <view class="aids" v-if="aids.length">
      <view class="row" v-for="(a, i) in aids" :key="i">
        <text class="tag" :class="'tag-' + a.cls">{{ a.tag }}</text>
        <view class="val">{{ a.val }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { computed } from 'vue'
import { fmtDefs, renderAids } from '@/common/utils.js'

export default {
  name: 'note-card',
  props: {
    w: { type: Object, required: true },
    showHead: { type: Boolean, default: true }
  },
  emits: ['speak'],
  data() {
    return { playing: false }
  },
  computed: {
    defs() {
      return fmtDefs(this.w.defs)
    },
    aids() {
      return renderAids(this.w)
    }
  },
  methods: {
    onSpeak() {
      this.playing = true
      setTimeout(() => (this.playing = false), 650)
      this.$emit('speak', this.w.w)
    }
  }
}
</script>

<style lang="scss" scoped>
.note {
  padding: 20px;
  margin-top: 12px;
  background: #fdfbf3;
  border: 1px solid #e8e0cd;
  border-radius: 14px;
}
.note.flat {
  padding: 0;
  margin-top: 0;
  background: transparent;
  border: none;
  border-radius: 0;
}
.note.flat .defs {
  border-bottom: 1px dashed #efe9d9;
}
.head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
}
.nw {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 34px;
  font-weight: 700;
  color: #47423c;
  line-height: 1.1;
  word-break: break-all;
}
.nph {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 14px;
  color: #948c81;
}
.speak {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f5e4df;
  color: #a8412e;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.speak.playing {
  animation: pulse 0.6s ease;
}
@keyframes pulse {
  0% { transform: scale(1); }
  40% { transform: scale(1.18); }
  100% { transform: scale(1); }
}
.defs {
  margin: 12px 0 4px;
  padding-bottom: 12px;
  border-bottom: 1px solid #efe9d9;
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
  padding-top: 1px;
}
.key {
  color: #a8412e;
  font-weight: 600;
  text-decoration: underline;
}
.aids {
  margin-top: 12px;
}
.row {
  display: flex;
  gap: 10px;
  padding: 10px 2px;
  border-bottom: 1px dashed #efe9d9;
  align-items: flex-start;
}
.row:last-child {
  border: none;
}
.tag {
  flex-shrink: 0;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 2px 8px;
  border-radius: 6px;
  margin-top: 2px;
}
.val {
  flex: 1;
  min-width: 0;
  font-size: 13.5px;
  line-height: 1.8;
  color: #6b645b;
}
.tag-part {
  background: #e4eaf5;
  color: #4a6391;
}
.tag-mem {
  background: #f5ecd8;
  color: #8a7220;
}
.tag-sent {
  background: #e0ece8;
  color: #3f7d68;
}
.tag-diff {
  background: #f5e4df;
  color: #a8412e;
}
</style>
