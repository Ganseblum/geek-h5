import { userDet } from '@/type/login';
import request from '@/utils/request'
type PromiseRes<T> = Promise<result<T>>;

interface result<T> {
  code: number;
  data: T;
}

// 发送验证码
export const sendCodes = (mobile:string):PromiseRes<number> => request({
      method:'get',
      url: `/v1_0/sms/codes/${mobile}`,
    })

// 登录
interface loginData{
  mobile: string,
  code:string
}
interface tokenT{
  token: string,
  refresh_token:string
}
export const login = (data:loginData) :PromiseRes<tokenT>=> request({
      method:'post',
      url: `/v1_0/authorizations`,
      data:data
})

// 获取用户信息
interface userInfo{
  photo: string,
  name: string,
  id:string
}
export const getUserInfo = () :Promise<result<userInfo>> => request({
      method:'get',
      url: `/v1_0/user`,
})

// 编辑用户资料
export const editUserInfo = (data:userDet) :Promise<result<userDet>> => request({
      method:'patch',
      url: `/v1_0/user/profile`,
  data,

})



// 编辑用户资料
interface photo{
  photo:File
}
export const upDatePhotos = (data:photo) :Promise<result<photo>> => request({
      method:'patch',
      url: `/v1_0/user/photo`,
  data,
        headers: {
         'Content-type' : 'multipart/form-data'
      }
})
