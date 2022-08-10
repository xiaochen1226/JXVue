import axios from 'axios'

// axios的实例
/* axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log(res.data)
}) */

/* axios
  .get('http://httpbin.org/get', {
    params: {
      name: 'cjx',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  }) */

// post请求
/* axios
  .post('http://httpbin.org/post', {
    data: {
      name: 'cjx',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  }) */

// promise本身是可以有类型
/* new Promise<string>((resolve) => {
  resolve('123')
}).then((res) => {
  console.log(res.length)
}) */

// axios的配置选项
// 全局配置
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000
// axios.defaults.headers = {}

/* axios
  .get('/get', {
    params: {
      name: 'cjx',
      age: 18
    },
    // 每个请求单独配置
    timeout: 5000,
    headers: {}
  })
  .then((res) => {
    console.log(res.data)
  })

axios
  .post('/post', {
    data: {
      name: 'cjx',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  }) */

// axios.all -> 多个请求，一起返回
axios
  .all([
    axios.get('/get', { params: { name: 'cjx', age: 18 } }),
    axios.post('/post', { data: { name: 'cjx', age: 18 } })
  ])
  .then((res) => {
    console.log(res[0].data)
    console.log(res[1].data)
  })

// axios的拦截器
// fn1：请求发送成功会执行的函数
// fn2: 请求发送失败会执行的函数
axios.interceptors.request.use(
  (config) => {
    // 想做的一些操作
    // isloading动画
    console.log('请求成功的拦截')

    return config
  },
  (err) => {
    console.log('请求发送错误')
    return err
  }
)
// fn1: 数据响应成功（服务器正常的返回的数据）
// fn2: 数据响应失败
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功的拦截')
    return res
  },
  (err) => {
    console.log('服务器响应失败')
    return err
  }
)
