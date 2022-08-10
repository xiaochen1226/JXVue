<template>
  <div class="page-content">
    <JxTable
      :listData="userList"
      v-bind="contentTableConfig"
      :listCount="dataCount"
      v-model:page="pageInfo"
      @selectionChange="getSelectData"
    >
      <!-- 1.header中的插槽 -->
      <template #handerHandler v-if="contentTableConfig.add === '1'">
        <el-button
          type="primary"
          size="medium"
          v-if="isCreate"
          @click="handleNewClick"
        >
          新建{{ contentTableConfig.title }}
        </el-button>
      </template>

      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            icon="el-icon-edit"
            size="mini"
            type="text"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="text"
            v-if="isdelete"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 在page-content中动态插入剩余插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </JxTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import JxTable from '@/base-ui/table'
import { usePermission } from '@/hooks/use-permission'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    }
  },
  components: {
    JxTable
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 获取操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isdelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getpageData())

    // 发送网络请求
    const getpageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch(`${props.model}/getPageListAction`, {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.pageSize * (pageInfo.value.currentPage - 1),
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }

    getpageData()

    // 从vuex中获取数据
    const userList = computed(() =>
      store.getters[`${props.model}/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`${props.model}/pageListCount`](props.pageName)
    )

    // 4.获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'UpdateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    // 删除/编辑/新建
    const handleDeleteClick = (item: any) => {
      store.dispatch(`${props.model}/deletePageDataAction`, {
        pageName: props.pageName,
        id: item.id
      })
    }

    const handleNewClick = () => {
      emit('newBtnClick')
    }

    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    const getSelectData = (value: any) => {
      console.log(value)
    }
    return {
      userList,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isdelete,
      getSelectData,
      getpageData,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #eee;
}
</style>
