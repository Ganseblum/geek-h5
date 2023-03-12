import axios, { AxiosError} from "axios"; //引入
import { Toast } from "antd-mobile";
import { getTokenInfo } from "./storage";
import history from "./history";

const baseURL = "http://toutiao.itheima.net/";

const instance = axios.create({
  baseURL: baseURL,
  timeout: 30000 //设置最大请求时间
});

instance.interceptors.request.use(
  (config) => {
    const token = getTokenInfo().token
    if (token) {
      config!.headers!.Authorization = 'Bearer ' + token
    }
    return config;
  },
  
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (result) => {
    return result.data;
  },
  (err: AxiosError<{ message: string }>) => {
    // 网络问题
    if (!err.response) {
      Toast.show({
          content: "网络繁忙，请稍后再试",
      });
    }
    const { response } = err
    // token失效
   if (response?.status !== 401) {
      // 不是token失效的问题
       Toast.show({
          content: response?.data.message,
       });
 
 
      return Promise.reject(err)
    }
    if (response?.status === 401) {
 
          Toast.show({
          content: '登录过期，请重新登录',
          });
      
      history.replace(
         '/login',
      )
      setTimeout(() => {
        window.location.reload() 
      },500)
    }

    return Promise.reject(err);
 
  }
);
export default instance;
