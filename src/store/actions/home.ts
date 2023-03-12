import { RootThunkAction } from ".."
import request from '@/utils/request'
import { channel, HomeAction } from "@/type/home"
import { setChannel } from "@/utils/storage"

export const saveUserChannel = (payload: channel) : HomeAction=> {
  return {
    type: 'save/userChannel',
    payload
  }
}

export const getUserChannel = (): RootThunkAction => {
  return async (dispatch)=> {
    const res = await request.get('/v1_0/user/channels')
    dispatch(saveUserChannel(res.data.channels))
  }
}


export const saveAllChannel = (payload: channel) : HomeAction=> {
  return {
    type: 'save/allChannel',
    payload
  }
}

export const getAllChannel = (): RootThunkAction => {
  return async (dispatch)=> {
    const res = await request.get('/v1_0/channels')
    dispatch(saveAllChannel(res.data.channels))
    setChannel(res.data.channels)
  }
}