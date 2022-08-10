<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <JxCard title="分类商品数量(饼图)"></JxCard>
      </el-col>
      <el-col :span="10">
        <JxCard title="不同城市商品销量"></JxCard>
      </el-col>
      <el-col :span="7">
        <JxCard title="分类商品数量(玫瑰图)"></JxCard>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <JxCard title="分类商品的销量"></JxCard>
      </el-col>
      <el-col :span="12">
        <JxCard title="分类商品的收藏"></JxCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import JxCard from '@/base-ui/card'

export default defineComponent({
  name: 'dashboard',
  components: {
    JxCard
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')

    return {}
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
