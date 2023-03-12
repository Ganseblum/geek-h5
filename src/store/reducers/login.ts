import { userDet, userInfo } from "@/type/login"


const initValue = {
  token: '',
  refresh_token: '',
  userInfo: {},
}


interface actionsT{
  type: string,
  payload: string | userInfo |userDet
}



export type LoginAction = {
  type: 'login/token' | 'login/userInfo'|'login/userDet'
  payload: actionsT
}

export default function reducer(state = initValue, actions: LoginAction) {
  switch (actions.type) {
    case 'login/token':
      return actions.payload
    case 'login/userInfo':
      return { ...state, userInfo: actions.payload }
    case 'login/userDet':
      return { ...state, userInfo: actions.payload}
    default:
      return state
  }
}