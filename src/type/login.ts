// 用户信息
export interface userInfo{
  photo: string,
  name: string,
  id:string
}

// 用户详情
export interface userDet{
  photo?: string,
  name?: string,
  id?: string,
  gender?: string,
  mobile?:string
  birthday?: string,
  intro?:string
} 