<script setup>
import { ref, onMounted, reactive } from 'vue'
import { numberUtil } from '@youngbeen/angle-util'
import HeadPanel from '@/components/HeadPanel.vue'
import AttemptCard from '@/components/AttemptCard.vue'
import InputBoard from '@/components/InputBoard.vue'
import WinDraw from '@/components/WinDraw.vue'
import LoseDraw from '@/components/LoseDraw.vue'

const maxPlayCount = 10

const answer = reactive({
  list: []
})
const goodNumbers = reactive({
  list: [] // 标记存在的数字
})
const badNumbers = reactive({
  list: [] // 标记错误的数字
})
const history = reactive({
  list: [
    // {
    //   attempt: [1, 2, 3, 4],
    //   correctCount: 2,
    //   existCount: 1,
    //   // wrongCount: // = 4 - correctCount - existCount
    //   remark: ['', '', '', ''], // circle|square|cross|'' - none
    // }
  ]
})
const isWinVisible = ref(false)
const isLoseVisible = ref(false)

const restart = () => {
  isWinVisible.value = false
  isLoseVisible.value = false
  history.list = []
  goodNumbers.list = []
  badNumbers.list = []
  generateAnswer()
}

const generateAnswer = () => {
  // 生成随机4个不重复，0~9的数字
  answer.list = numberUtil.multiRandom(4)
}

const toggleRemark = ({ row, index }) => {
  // console.log(arg)
  switch (history.list[row].remark[index]) {
    case 'circle': {
      // 从圆形转为方形，此时应该把所有相同数字转为圆形，再把当前项转为方形
      const theNumber = history.list[row].attempt[index]
      history.list.forEach((h, i) => {
        h.attempt.forEach((a, j) => {
          if (a === theNumber) {
            history.list[i].remark[j] = 'circle'
          }
        })
      })
      history.list[row].remark[index] = 'square'
      addToGood(theNumber)
      break
    }
    case 'square': {
      // 从方形转为禁用，此时应该把所有相同数字转为禁用
      const theNumber = history.list[row].attempt[index]
      history.list.forEach((h, i) => {
        h.attempt.forEach((a, j) => {
          if (a === theNumber) {
            history.list[i].remark[j] = 'cross'
          }
        })
      })
      addToBad(theNumber)
      break
    }
    case 'cross': {
      // 从禁用转为初始，此时应该把所有相同数字转为初始
      const theNumber = history.list[row].attempt[index]
      history.list.forEach((h, i) => {
        h.attempt.forEach((a, j) => {
          if (a === theNumber) {
            history.list[i].remark[j] = ''
          }
        })
      })
      moveOutGood(theNumber)
      moveOutBad(theNumber)
      break
    }
    default: {
      // 从初始转为圆形，此时应该找到所有相同数字，切换为圆形
      const theNumber = history.list[row].attempt[index]
      history.list.forEach((h, i) => {
        h.attempt.forEach((a, j) => {
          if (a === theNumber) {
            history.list[i].remark[j] = 'circle'
          }
        })
      })
      addToGood(theNumber)
    }
  }
}

const addToGood = (num) => {
  moveOutBad(num)
  if (goodNumbers.list.indexOf(num) === -1) {
    goodNumbers.list.push(num)
  }
}
const moveOutGood = (num) => {
  const targetIndex = goodNumbers.list.indexOf(num)
  if (targetIndex > -1) {
    goodNumbers.list.splice(targetIndex, 1)
  }
}
const addToBad = (num) => {
  moveOutGood(num)
  if (badNumbers.list.indexOf(num) === -1) {
    badNumbers.list.push(num)
  }
}
const moveOutBad = (num) => {
  const targetIndex = badNumbers.list.indexOf(num)
  if (targetIndex > -1) {
    badNumbers.list.splice(targetIndex, 1)
  }
}

const showAnswer = () => {
  console.log(answer.list)
}

const send = ({ numbers }) => {
  if (history.list.length < maxPlayCount) {
    let correctCount = 0
    let existCount = 0
    let leftNumbers = []
    for (let index = 0; index < 4; index++) {
      if (answer.list[index] === numbers[index]) {
        // 完全正确的数字
        correctCount++
      } else {
        // 其他数字全部收集起来
        leftNumbers.push(answer.list[index])
        leftNumbers.push(numbers[index])
      }
    }
    // 根据剩余数字总数和去重后的数量之差，得到位置不正确的数字个数
    existCount = leftNumbers.length - [...new Set(leftNumbers)].length
    let remark = []
    numbers.forEach(n => {
      if (goodNumbers.list.indexOf(n) > -1) {
        remark.push('circle')
      } else if (badNumbers.list.indexOf(n) > -1) {
        remark.push('cross')
      } else {
        remark.push('')
      }
    })
    const newAttempt = {
      attempt: numbers,
      correctCount,
      existCount,
      // wrongCount: // = 4 - correctCount - existCount
      remark, // circle|square|cross|'' - none
    }
    history.list.push(newAttempt)
    document.querySelector('.bottom-anchor').scrollIntoView(false)
    if (correctCount === 4) {
      // 胜利
      isWinVisible.value = true
    } else if (history.list.length >= maxPlayCount) {
      // 失败
      isLoseVisible.value = true
    }
  }
}

const clearTag = () => {
  history.list.forEach((h) => {
    h.remark = ['', '', '', '']
  })
  for (let index = 0; index < 10; index++) {
    moveOutGood(index)
    moveOutBad(index)
  }
}

onMounted(() => {
  restart()
})
</script>

<template>
  <div class="page">
    <!-- 顶部栏 -->
    <head-panel
      :total-attempts-count="history.list.length"
      @restart="restart()"
      @cheat="showAnswer()"></head-panel>
    
    <!-- 主展示界面 -->
    <div class="box-main">
      <attempt-card
        v-for="(h, index) in history.list" :key="index"
        :data="h"
        :index="index"
        @toggle-remark="toggleRemark"></attempt-card>
      <div class="bottom-anchor">&nbsp;</div>
    </div>
  
    <!-- 底部输入 -->
    <input-board
      :good-numbers="goodNumbers.list"
      :bad-numbers="badNumbers.list"
      @send="send"
      @clear-tag="clearTag"></input-board>

    <!-- 胜利弹框 -->
    <win-draw
      :visible="isWinVisible"
      @restart="restart"></win-draw>
    <!-- 失败弹框 -->
    <lose-draw
      :visible="isLoseVisible"
      @restart="restart"></lose-draw>
  </div>
</template>

<style scoped>
.page {
  position: relative;
}
.box-main {
  margin-top: 16px;
  /* padding-bottom: 220px; */
}
.bottom-anchor {
  height: 220px;
}
</style>
