<template>
  <div class="base-echart">
    <div ref="echartDivRef"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const echartDivRef = ref<HTMLElement>()

onMounted(() => {
  const echartInstance = echarts.init(echartDivRef.value!)
})
</script>

<style scoped></style>
