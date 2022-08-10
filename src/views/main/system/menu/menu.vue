<template>
  <div class="menu">
    <h2>menu</h2>
    <PageContent
      :contentTableConfig="contentTableConfig"
      pageName="menu"
      model="system"
    ></PageContent>
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
  name: 'jx-menu',
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
