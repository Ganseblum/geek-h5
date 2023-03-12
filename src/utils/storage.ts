import { channel } from "@/type/home"

const TOKEN_KEY = 'react-geek-h5'
type Token = {
  token: string
  refresh_token: string
}
// 添加
export const setTokenInfo = (tokenInfo: Token) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo))
}
// 获取
export const getTokenInfo = (): Token => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY)!) || {}
}


// 删除
export const removeTokenInfo = () => {
  localStorage.removeItem(TOKEN_KEY)
}


export const channelStorage = 'allChannel'


// 添加
export const setChannel = (channelInfo: channel[]) => {
  localStorage.setItem(channelStorage, JSON.stringify(channelInfo))
}
// 获取
export const getChannel = (): channel[] => {
  return JSON.parse(localStorage.getItem(channelStorage)!)
}

