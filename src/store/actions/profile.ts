import request from '@/utils/request'
import { RootThunkAction } from ".."
import { Profile, ProfileAction } from "../reducers/profile"



// 获取用户详情
export const saveUserDet = (payload:Profile): ProfileAction => {
  return {
    type: 'profile/profile',
    payload
  }
}

export const getProfile = (): RootThunkAction => {
  return async (dispatch)=> {
    const res = await request.get('/v1_0/user/profile')
    dispatch(saveUserDet(res.data))
  }
}