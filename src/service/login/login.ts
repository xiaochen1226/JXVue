import jxRequest from '../index'
import { IAccount, ILoginResult } from './types'
import { IDateType } from '../types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法：/users/id
  UserMenus = '/role/' // 用法：role/id/menu
}

export function accountLoginRequest(account: IAccount) {
  return jxRequest.post<IDateType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return jxRequest.get<IDateType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenusByRoleId(id: number) {
  return jxRequest.get<IDateType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
