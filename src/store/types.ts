import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'
export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModeule {
  login: ILoginState
  system: ISystemState
}

export type IStoreType = IRootState & IRootWithModeule
