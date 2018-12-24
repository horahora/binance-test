import axios from 'axios'


function request(url, data) {
  return axios.get('/api/v1/ping')
}

export function fetchPing() {
  return axios.get('/api/v1/ping')
    .then(res => {
      console.log(res)
    })
}
