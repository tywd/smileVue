export default {
  state: {
    'token': localStorage.getItem('token') || '', // 存储token
    'user': localStorage.getItem('user') || ''
  },
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, token) {
      state.token = token; // 将state.token更新
      localStorage.setItem('token', token);
    }
  }
}
