<script>
import { ref, watch } from 'vue'

export default {
  props: {
    visible: {
      type: Boolean,
      required: false,
      defalue: false
    }
  },

  setup: (prop) => {
    const animatedYou = ref(false)
    const animatedLose = ref(false)
    watch(() => prop.visible, (newVal) => {
      if (newVal) {
        setTimeout(() => {
          animatedLose.value = true
        }, 500)
        setTimeout(() => {
          animatedYou.value = true
        }, 800)
      } else {
        animatedYou.value = false
        animatedLose.value = false
      }
    })

    return {
      animatedYou,
      animatedLose
    }
  }
}
</script>

<template>
  <div class="pop-box"
    v-show="visible">
    <!-- <div class="bg">&nbsp;</div> -->
    <div class="box-result">
      <div class="title">
        <div class="title-begin"
          :class="[
            animatedYou && 'animated'
          ]">You&nbsp;&nbsp;</div>
        <div class="title-special"
          :class="[
            animatedLose && 'animated'
          ]">Lose</div>
      </div>
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
  display: flex;
  justify-content: center;
  /* padding: 16px 24px; */
  color: rgb(80, 80, 80);
  text-align: center;
  font-size: 26px;
}
.title-begin {
  transform-origin: 50% bottom;
  transform: rotateX(0deg);
  transition: all 0.3s;
}
.title-begin.animated {
  transform: rotateX(60deg);
}
.title-special {
  color: red;
  transform-origin: left bottom;
  transform: rotate(0deg);
  transition: all 0.3s;
}
.title-special.animated {
  transform: rotate(30deg);
}
</style>