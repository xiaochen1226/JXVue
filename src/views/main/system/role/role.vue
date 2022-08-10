<template>
  <div class="role">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleReseltClick"
      @queryBtnClick="handleQueryClick"
    />
    <PageContent
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="role"
      model="system"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    />
    <PageModal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      :modalConfig="modalConfig"
      pageName="role"
      model="system"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          :props="{ children: 'children', label: 'name' }"
          node-key="id"
          show-checkbox
          @check="handleCheckChange"
        />
      </div>
    </PageModal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, nextTick } from 'vue'
import { contentTableConfig } from './config/content.config'
import PageContent from '@/components/page-content'
import { searchFormConfig } from './config/search.config'
import PageSearch from '@/components/page-search'
import { usepageSearch } from '@/hooks/use-page-search'
import PageModal from '@/components/page-modal'
import { modalConfig } from './config/modal.config'
import { usePageModal } from '@/hooks/use-page-modal'
import { useStore } from '@/store'
import { MenuMapLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'

export default defineComponent({
  components: {
    PageContent,
    PageSearch,
    PageModal
  },
  name: 'role',
  setup() {
    const [pageContentRef, handleReseltClick, handleQueryClick] =
      usepageSearch()

    // 处理pageModal的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = MenuMapLeafKeys(item.menuList)
      nextTick(() => {
        console.log(elTreeRef.value)
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }

    const [pageModalRef, defaultInfo, handleEditData, handleNewData] =
      usePageModal(undefined, editCallback)

    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    return {
      menus,
      otherInfo,
      elTreeRef,
      contentTableConfig,
      searchFormConfig,
      pageContentRef,
      handleReseltClick,
      handleQueryClick,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleEditData,
      handleNewData,
      handleCheckChange
    }
  }
})
</script>

<style scoped>
.menu-tree {
  margin-left: 20px;
}
</style>
