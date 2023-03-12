import { createStore, applyMiddleware } from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";
import { getTokenInfo } from "@/utils/storage";
import { LoginAction } from "./reducers/login";
import { initValue as profile, ProfileAction } from "./reducers/profile";
import {initValue as home} from './reducers/home'

import { HomeAction } from "@/type/home";


const store = createStore(
  reducer,
  {
    login: getTokenInfo(),
    profile,
    home,
  },
  composeWithDevTools(applyMiddleware(thunk))
);

// console.log(store.getState());

// 获取RootState的类型
// typeof: 获取store.getState的类型
// ReturnType 获取返回值的类型
export type RootState = ReturnType<typeof store.getState>;

// 类型参数1：ReturnType 用于指定函数的返回值类型 void
// 类型参数2： 指定RootState的类型
// 类型参数3： 指定额外的参数类型，一般为unkonwn或者any
// 类型参数4： 用于指定dispatch的Action类型

// R：thunk的action的返回类型  void Promise<void>
// S: 需要指定个getState的返回类型  RootState
// E: extra: 额外的参数 any
// A: 需要指定Action的类型 Action AnyAction [extraProps: string]: any
// ThunkAction<R, S, E, A>
type RootAction = LoginAction | ProfileAction | HomeAction;
export type RootThunkAction = ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  RootAction
>;

export default store;
