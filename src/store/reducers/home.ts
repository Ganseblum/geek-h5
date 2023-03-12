import { HomeAction, initType } from "@/type/home"

export const initValue : initType = {
  userChannel: [],
  allChannel:[]
} as initType

export default function reducer(state = initValue, actions: HomeAction) {
  const {type, payload} = actions
  switch (type) {
    case 'save/userChannel':
      return {...state,userChannel : payload}
    case 'save/allChannel':
      return {...state,allChannel : payload}
    default:
      return state
  }
}