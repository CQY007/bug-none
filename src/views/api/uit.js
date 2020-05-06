// import axios from 'axios'
// import { Modal } from 'antd'

// // http request拦截器 添加一个请求拦截器
// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   let token = window.localStorage.getItem("accessToken")
//   if (token) {
//     config.headers.accessToken = token;    //将token放到请求头发送给服务器
//     return config;
//     //这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
//     // config.headers['accessToken'] = Token;
//   }
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

// // // 添加一个响应拦截器
// // axios.interceptors.response.use(function (response) {
// //     // Do something with response data
// //     return response;
// // }, function (error) {
// //     // Do something with response error
// //     return Promise.reject(error);
// // });

// //是我封装的axios.post请求方式
// const baseApi = 'http://192.1.1.164:8080'
// export default class Axios {
//   static ajax_post (url, params) {
//     return new Promise((resolve, reject) => {
//       const URL = baseApi + url
//       return axios.post(URL, params
//       ).then(response => {
//         resolve(response);

//         return response.data
//       }).catch(error => {
//         reject(error);
//         // 异常处理
//       })
//     })
//   }
// }

//获取cookie、
export function getCookie (name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie (c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};

//删除cookie
export function delCookie (name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};