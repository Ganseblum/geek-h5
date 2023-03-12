
// 保存token
interface tokenT{
  token: string,
  refresh_token:string
}

export const saveToken = (payload:tokenT) => {
  return {
    type: 'login/token',
    payload
  }
}

interface userInfo{
  photo: string,
  name: string,
  id:string
}
export const saveUserInfo = (payload:userInfo) => {
  return {
    type: 'login/userInfo',
    payload
  }
}


