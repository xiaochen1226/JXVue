<template>
  <div class="goods">
    <h2>goods</h2>
    <PageContent
      :contentTableConfig="contentTableConfig"
      pageName="goods"
      model="product"
    >
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        ></el-image>
      </template>
      <template #oldPrice="scope">
        {{ '￥' + scope.row.oldPrice }}
      </template>
      <template #status="scope">
        <el-button
          size="mini"
          :type="scope.row.status ? 'success' : 'danger'"
          >{{ scope.row.status ? '启用' : '禁用' }}</el-button
        >
      </template>
    </PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  components: {
    PageContent
  },
  name: 'goods',
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
