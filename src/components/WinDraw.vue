<script>
import { watch } from 'vue'
import confetti from 'canvas-confetti'

export default {
  props: {
    visible: {
      type: Boolean,
      required: false,
      defalue: false
    }
  },

  setup: (props) => {
    const fireworks = () => {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
    watch(() => props.visible, (newVal) => {
      if (newVal) {
        fireworks()
      }
    })
  }
}
</script>

<template>
  <div class="pop-box"
    v-show="visible">
    <!-- <div class="bg">&nbsp;</div> -->
    <div class="box-result">
      <div class="title">You Win</div>
      <button style="margin-top: 12px;"
        @click="$emit('restart')">Restart</button>
    </div>
  </div>
</template>

<style scoped>
.pop-box {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  background: rgba(12, 12, 12, 0.4);
}
.box-result {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  padding: 24px 16px;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  background: #fff;
  text-align: center;
  box-shadow: 0 0 18px 6px rgba(112, 112, 112, .5);
}
.title {
  /* padding: 16px 24px; */
  color: rgb(20, 187, 20);
  text-align: center;
  font-size: 26px;
}
</style>