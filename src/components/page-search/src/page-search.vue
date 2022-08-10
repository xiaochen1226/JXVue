<template>
  <div class="page-search">
    <JxForm v-bind="searchFormConfig" v-model="formDate">
      <template #header>
        <h1 class="title">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button
            type="primary"
            icon="el-icon-refresh"
            @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </JxForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import JxForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    JxForm
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 双向绑定的属性应该是有配置文件中的field来决定的
    // 1优化一：formDate中的数据应该是动态来决定的
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }

    const formDate = ref(formOriginData)

    // 2优化二：当用户点击重置
    const handleResetClick = () => {
      // 1.双向绑定
      // for (const key in formOriginData) {
      //   formOriginData.value[`${key}`] = formOriginData[key]
      // }
      formDate.value = formOriginData
      emit('resetBtnClick')
    }

    // 3优化三：当用户点击搜索
    const handleQueryClick = () => {
      emit('queryBtnClick', formDate.value)
    }

    return {
      formDate,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.title {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
