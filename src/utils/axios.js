import axios from 'axios';
import store from '@/store';
import router from '@/router';
// import types from '@/mutation-types';
import { Notify } from 'vant';
import config from '@/config';

// 创建 axios 实例
let service = axios.create({
  baseURL: config.serverUrl,
  timeout: 60000,
});

// 设置 post、put 默认 Content-Type
service.defaults.headers.post['Content-Type'] = 'application/json';
service.defaults.headers.put['Content-Type'] = 'application/json';

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.auth) config.headers['Authorization'] = store.getters.auth;

    // if (config.method === "post" || config.method === "put") {
    //   if (config.headers["Content-Type"] == "application/json")
    //     config.data = JSON.stringify(config.data);
    // }
    // 请求发送前进行处理
    return config;
  },
  error => {
    // 请求错误处理
    return Promise.reject(error);
  },
);

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    let { data } = response;
    return data;
  },
  error => {
    let res = error.response;
    if (!res) {
      Notify('服务器请求失败！');
    } else {
      Notify(res.data);
      // res.status 错误状态
      switch (res.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          // store.dispatch(types.RM_JWT);
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath,
            },
          });
      }
    }
    // return Promise.reject(res)
  },
);

/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
export default function() {
  return service;
}
