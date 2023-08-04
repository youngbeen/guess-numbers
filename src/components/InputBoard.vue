<script setup>
import { reactive, computed } from 'vue'

defineProps({
  goodNumbers: {
    type: Array,
    required: true
  },
  badNumbers: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['send'])

const actions = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '0', value: '0' },
  { label: 'Cl Tags', value: 'clear' },
  { label: 'Back', value: 'back' }
]
const nowNumbers = reactive({
  list: []
})
const showNumbers = computed(() => {
  return [
    (nowNumbers.list.length && nowNumbers.list[0]) || '-',
    (nowNumbers.list.length > 1 && nowNumbers.list[1]) || '-',
    (nowNumbers.list.length > 2 && nowNumbers.list[2]) || '-',
    (nowNumbers.list.length > 3 && nowNumbers.list[3]) || '-'
  ]
})

const handleInput = (action) => {
  if (action.value === 'clear') {
    // nowNumbers.list = []
    emit('clearTag')
  } else if (action.value === 'back' && nowNumbers.list.length) {
    nowNumbers.list.pop()
  } else if (nowNumbers.list.length < 4 && !nowNumbers.list.includes(action.value)) {
    nowNumbers.list.push(action.value)
  }
}

const trySend = () => {
  if (nowNumbers.list.length === 4) {
    emit('send', {
      numbers: nowNumbers.list.map(n => parseInt(n, 10))
    })
    nowNumbers.list = []
  }
}
</script>

<template>
  <div class="box-input-board">
    <div class="to-send"
      :class="[
        nowNumbers.list.length === 4 && 'bounce'
      ]"
      @click="trySend()">
      <span class="bg-placeholder"
        :class="[
          nowNumbers.list.length === 4 && 'show'
        ]">Touch numbers to send</span>
      <div style="display: flex; justify-content: center;">
        <div class="to-send-number"
          :class="[
            nowNumbers.list.length && nowNumbers.list[0] && 'active'
          ]">{{ showNumbers[0] }}</div>&nbsp;&nbsp;
        <div class="to-send-number"
          :class="[
            nowNumbers.list.length > 1 && nowNumbers.list[1] && 'active'
          ]">{{ showNumbers[1] }}</div>&nbsp;&nbsp;
        <div class="to-send-number"
          :class="[
            nowNumbers.list.length > 2 && nowNumbers.list[2] && 'active'
          ]">{{ showNumbers[2] }}</div>&nbsp;&nbsp;
        <div class="to-send-number"
          :class="[
            nowNumbers.list.length > 3 && nowNumbers.list[3] && 'active'
          ]">{{ showNumbers[3] }}</div>&nbsp;&nbsp;
      </div>
    </div>
    <div class="input-panel">
      <div class="input-button"
        :class="[
          ['back'].includes(action.value) && 'red',
          goodNumbers.indexOf(parseInt(action.value, 10)) > -1 && 'good',
          badNumbers.indexOf(parseInt(action.value, 10)) > -1 && 'bad'
        ]"
        v-for="action in actions" :key="action.value"
        @click="handleInput(action)">{{ action.label }}</div>
    </div>
  </div>
</template>

<style scoped>
.box-input-board {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  padding: 16px 16px 8px;
  background: rgb(255, 255, 255);
  box-shadow: 0 -2px 28px 6px rgba(112, 112, 112, .3);
}
.to-send {
  position: relative;
  padding: 0 8px 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid #eee;
  text-align: center;
}
.to-send.bounce {
  /* animation: bounce 2s ease-in-out infinite; */
}
.bg-placeholder {
  position: absolute;
  left: 0;
  right: 0;
  top: -12px;
  z-index: -1;
  color: #ddd;
  font-size: 12px;
  opacity: 0;
  transition: all 0.3s;
}
.bg-placeholder.show {
  opacity: 1;
}
.to-send-number {
  font-size: 18px;
  font-weight: bold;
  transform: scale(0.6);
  transition: all 0.3s;
}
.to-send-number.active {
  transform: scale(1.5);
}
.input-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 4%;
}
.input-button {
  margin-bottom: 8px;
  width: 22%;
  height: 40px;
  line-height: 40px;
  border: 1px solid #eee;
  border-radius: 6px;
  /* color: #fff; */
  /* background: rgb(123, 123, 123); */
  text-align: center;
  font-size: 20px;
}
.input-button.red {
  color: #fff;
  background: rgb(255, 138, 138);
}
.input-button.good {
  color: #fff;
  background: rgb(165, 165, 255);
}
.input-button.bad {
  color: #fff;
  background: rgb(186, 186, 186);
}
@keyframes bounce {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
</style>