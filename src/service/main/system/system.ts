import jxRequest from '../../index'
import { IDateType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return jxRequest.post<IDateType>({
    url: url,
    data: queryInfo
  })
}

// url: /users/id
export function deletePageData(url: string) {
  return jxRequest.delete<IDateType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return jxRequest.post<IDateType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return jxRequest.patch<IDateType>({
    url: url,
    data: editData
  })
}
