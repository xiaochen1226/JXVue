type IformType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  field: string
  type: IformType
  label: string
  rules?: any[]
  placeholder?: any
  options?: any[]
  otherOptions?: any
  isHidden?: boolean
}

export interface Iform {
  formItems: IFormItem[]
  labelWidth?: string
  itemStyle?: any
  colLayout?: any
}
