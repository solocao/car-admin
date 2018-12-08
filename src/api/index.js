import axios from 'axios'
import qs from 'qs'
import store from '../store'
import config from '@config'

axios.defaults.timeout = 5000
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.defaults.baseURL = config.apiUrl

// axios.defaults.withCredentials = true

export const get = (params) => {
  const { url, payload, auth } = params
  let config = {}
  // 负载不为空
  if (payload !== null || payload !== undefined) {
    config = Object.assign({}, config, { params: payload })
  }

  // 需要验证
  if (auth) {
    config = Object.assign({}, config, {
      headers: {
        authorization: store.state.user.info.auth
      }
    })
  }
  return axios.get(url, config).then(x => x.data).catch(function (err) {
    alert(JSON.stringify(err))
  })
}

export const put = (params) => {
  const { url, payload, auth } = params

  let authHeader = {}
  // 需要验证
  if (auth) {
    authHeader = {
      headers: {
        authorization: store.state.user.info.auth
      }
    }
  }

  // 去除没用数据包括null
  Object.keys(payload).map(x => {
    if (payload[x] === null || payload[x] === 'null' || payload[x] === '') {
      delete payload[x]
    }
  })
  return axios.put(url, qs.stringify(payload), authHeader).then(x => x.data).catch(function (err) {
    console.log(JSON.stringify(err))
  })
}

// // delete别名
// export const deleteAlias = (params) => {
//   const { url, payload, auth } = params

//   let authHeader = {}
//   // 需要验证
//   if (auth) {
//     authHeader = {
//       headers: {
//         authorization: store.state.user.info.auth
//       }
//     }
//   }

//   // 去除没用数据包括null
//   Object.keys(payload).map(x => {
//     if (payload[x] === null || payload[x] === 'null' || payload[x] === '') {
//       delete payload[x]
//     }
//   })

//   return axios.delete(url, { data: qs.stringify(payload) }, authHeader).then(x => x.data).catch(function (err) {
//     console.log(JSON.stringify(err))
//   })
// }

export const deleteAlias = (params) => {
  const { url, payload, auth } = params
  let config = {}
  // 负载不为空
  if (payload !== null || payload !== undefined) {
    config = Object.assign({}, config, { params: payload })
  }

  // 需要验证
  if (auth) {
    config = Object.assign({}, config, {
      headers: {
        authorization: store.state.user.info.auth
      }
    })
  }
  return axios.delete(url, config).then(x => x.data).catch(function (err) {
    alert(JSON.stringify(err))
  })
}

export const post = (params) => {
  const { url, payload, auth } = params
  let authHeader = {}
  // 需要验证
  if (auth) {
    authHeader = {
      headers: {
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmVhOGU3NjIxYTg2ZDYzZWM3ZTg0MjkiLCJleHAiOjE1NzM5NzA3MDEsImlhdCI6MTU0Mjg2NjcwMX0.cxIyMqTkoftV306OnoerWpfnk5OiswHJdmZVwx8Yi8U' || store.state.user.info.auth
      }
    }
  }
  // 去除没用数据包括null
  Object.keys(payload).map(x => {
    if (payload[x] === null || payload[x] === 'null' || payload[x] === '') {
      delete payload[x]
    }
  })
  console.log(payload)
  console.log(qs.stringify(payload))
  return axios.post(url, qs.stringify(payload), authHeader).then(x => x.data)
}

export const upload = (params) => {
  const { url, payload } = params
  return axios.post(url, payload, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(x => x.data)
}
