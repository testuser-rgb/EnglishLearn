<template>
  <view class="tabbar">
    <view class="tab" :class="{ on: active === 'today' }" @click="go('today')">
      <text class="dot"></text>
      <text class="ic">▤</text>
      <text class="lb">今日</text>
    </view>
    <view class="tab" :class="{ on: active === 'learn' }" @click="go('learn')">
      <text class="dot"></text>
      <text class="ic">▤</text>
      <text class="lb">学词</text>
    </view>
    <view class="tab" :class="{ on: active === 'recall' }" @click="go('recall')">
      <text class="dot"></text>
      <text class="ic">↻</text>
      <text class="lb">自测</text>
    </view>
    <view class="tab" :class="{ on: active === 'quiz' }" @click="go('quiz')">
      <text class="dot"></text>
      <text class="ic">✎</text>
      <text class="lb">练习</text>
    </view>
    <view class="tab" :class="{ on: active === 'wrong' }" @click="go('wrong')">
      <text class="dot"></text>
      <text class="ic">△</text>
      <text class="lb">错词</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'custom-tabbar',
  props: {
    active: { type: String, default: 'today' }
  },
  emits: ['navigate'],
  methods: {
    go(target) {
      this.$emit('navigate', target)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  z-index: 40;
  display: flex;
  background: rgba(249, 246, 238, 0.97);
  border-top: 1px solid #efe9d9;
  padding: 6px 4px calc(6px + env(safe-area-inset-bottom));
}
.tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 7px 0 4px;
  font-size: 10.5px;
  color: #948c81;
  border-radius: 10px;
  position: relative;
}
.tab.on {
  color: #a8412e;
  font-weight: 600;
}
.tab .dot {
  display: none;
  position: absolute;
  top: 2px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #c0503a;
}
.tab.on .dot {
  display: block;
}
.ic {
  font-size: 19px;
  line-height: 1;
}
.lb {
  line-height: 1.2;
}
</style>
