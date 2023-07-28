<script setup>
defineProps({
  index: {
    type: Number,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="wrapper">
    <div class="top-wrapper">
      <div class="title">Attempt {{ index + 1 }}</div>
      <div class="box-numbers">
        <div class="cell-number"
          :class="[ data.remark[0] ]"
          @click="$emit('toggleRemark', {
            row: index,
            index: 0
          })">{{ data.attempt[0] }}</div>
        <div class="cell-number"
          :class="[ data.remark[1] ]"
          @click="$emit('toggleRemark', {
            row: index,
            index: 1
          })">{{ data.attempt[1] }}</div>
        <div class="cell-number"
          :class="[ data.remark[2] ]"
          @click="$emit('toggleRemark', {
            row: index,
            index: 2
          })">{{ data.attempt[2] }}</div>
        <div class="cell-number"
          :class="[ data.remark[3] ]"
          @click="$emit('toggleRemark', {
            row: index,
            index: 3
          })">{{ data.attempt[3] }}</div>
      </div>
    </div>
    <div class="bottom-wrapper">
      <div class="box-legend box-correct"
        v-if="data.correctCount"
        :style="{
          width: data.correctCount / 4 * 100 + '%'
        }">
        <font-awesome-icon :icon="['fas', 'check-double']" /> {{ data.correctCount }}
      </div>
      <div class="box-legend box-exist"
        v-if="data.existCount"
        :style="{
          width: data.existCount / 4 * 100 + '%'
        }">
        <font-awesome-icon :icon="['fas', 'cut']" /> {{ data.existCount }}
      </div>
      <div class="box-legend box-wrong"
        v-if="(4 - data.correctCount - data.existCount)"
        :style="{
          width: (4 - data.correctCount - data.existCount) / 4 * 100 + '%'
        }">
        <font-awesome-icon :icon="['fas', 'times']" /> {{ (4 - data.correctCount - data.existCount) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  border-radius: 8px;
  margin: 8px 16px;
  padding-bottom: 20px;
  box-shadow: 2px 2px 8px 1px rgba(112, 112, 112, .3);
  overflow: hidden;
}
.top-wrapper {
  padding-bottom: 16px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 1px 1px 4px 1px rgba(112, 112, 112, .3);
}
.title {
  margin-bottom: 8px;
  padding-left: 8px;
  color: #999;
  font-size: 12px;
}
.box-numbers {
  display: flex;
  justify-content: space-around;
}
.cell-number {
  width: 40px;
  min-height: 40px;
  line-height: 40px;
  /* background: red; */
  border: 1px dashed #eee;
  text-align: center;
  font-size: 20px;
  font-weight: medium;
  transition: all 0.3s;
}
.cell-number.circle {
  border-color: transparent;
  border-radius: 50%;
  background: rgb(165, 165, 255);
}
.cell-number.square {
  border-color: transparent;
  background: rgb(165, 165, 255);
}
.cell-number.cross {
  border-color: transparent;
  background: rgb(186, 186, 186);
}
.bottom-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  display: flex;
}
.box-legend {
  height: 26px;
  line-height: 30px;
  color: #777;
  text-align: center;
}
.box-correct {
  background: rgba(84, 194, 84, 1);
}
.box-exist {
  background: rgba(250, 250, 87, 1);
}
.box-wrong {
  background: rgb(249, 99, 99);
}
</style>
