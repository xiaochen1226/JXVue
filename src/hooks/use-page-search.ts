import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function usepageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleReseltClick = () => {
    pageContentRef.value?.getpageData()
  }
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getpageData(queryInfo)
  }
  return [pageContentRef, handleReseltClick, handleQueryClick]
}
