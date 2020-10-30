<template>
  <div>
    <van-nav-bar class="navbar"
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack" />
    <div class="register-panel">
      <van-field v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username = '' "
        :error-message="usernameErrorMsg"
        @keyup.enter="loginAction" />
      <van-field v-model="password"
        type="password"
        label="密码"
        icon="clear"
        placeholder="请输入密码"
        required
        @click-icon="password = '' "
        :error-message="passwordErrorMsg"
        @keyup.enter="loginAction" />
      <div class="register-button">
        <van-button type="primary"
          @click="loginAction"
          size="large"
          :loading="openLoading">登录</van-button>
      </div>
      <div class="register-button">
        <van-button type="default"
          @click="toRegister"
          size="large"
          :loading="openLoading">去注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      openLoading: false, // 是否开户用户注册的Loading状态
      usernameErrorMsg: '', // 当用户名出现错误时的提示信息
      passwordErrorMsg: '', // 当密码出现错误时的提示信息
      redirectPath: '' // 从需要登录权限的页面进入登录页面前的路由路径
    }
  },
  // 保存了用户登录状态以后，就有了一个是否登录的依据，然后我们就不会重复登录了，(我们在已进入登录页面的creadted声明周期里，就判断是否已经登录。
  created () {
    // console.log(this.$route.query.redirect)
    this.redirectPath = this.$route.query.redirect ? this.$route.query.redirect : '/'
    // console.log(this.redirectPath)
    /* if (localStorage.getItem('token')) {
      this.$toastTip.success('您已登录')
      // this.$router.push(this.redirectPath)
    } */
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    /**
     * [loginAction 用户登录的实行方法]
     * @return {[type]} [description]
     */
    loginAction () {
      // console.log('ty')
      this.checkForm() && this.LoginUser()
    },
    /**
     * 用户登录方法
     */
    LoginUser () {
      // 先把按钮进行loading状态，防止重复提交
      this.openLoading = true
      // console.log(url.registerUser)
      let postData = {
        'username': this.username,
        'password': this.password
      }
      this.$http.post('/user/login', postData).then(response => {
        this.openLoading = false
        console.log(response.message)
        console.log(response, '登录返回')
        // 如果返回code为200，代表登录成功，我们给用户作Toast提示
        if (response.code === 200) {
          if (response.state === 0) {
            this.$toastTip.fail(response.message)
          } else {
            new Promise((resolve, reject) => {
              // 保存用户登录状态
              localStorage.setItem('token', response.body.token) // 存储token
              localStorage.setItem('user', response.body.user) // 存储用户
              setTimeout(() => {
                resolve()
              }, 500)
            }).then(() => {
              this.$toastTip.loading('登录成功\n请稍后...')
              // this.$router.push('/') // 登录成功则回到首页展示
              this.$store.commit('changeLogin', response.body.token) // 登录成功后同步修改vuex下的token
              // console.log(this.redirectPath)
              this.$router.push(this.redirectPath)
            }).catch(err => {
              this.$toastTip.fail('登录状态保存失败')
              console.log(err)
            })
          }
        } else {
          this.$toastTip.fail('登录失败')
        }
      }).catch((error) => {
        console.error(error)
        this.$toastTip.fail('出错:登录失败')
        this.openLoading = false
      })
    },
    /**
     * [toRegister 去注册]
     * @return {[type]} [description]
     */
    toRegister () {
      this.$router.push('register')
    },
    // 表单验证方法
    checkForm () {
      let isOk = true
      if (this.username.length < 5) {
        this.usernameErrorMsg = '用户名不能少于5位数'
        isOk = false
      } else {
        this.usernameErrorMsg = ''
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = '密码不能少于6位数'
        isOk = false
      } else {
        this.passwordErrorMsg = ''
      }
      return isOk
    }
  }
}
</script>

<style lang="scss" >
.navbar {
  height: 1.2rem;
  line-height: 1.2rem;
  & > div {
    font-size: 0.5rem;
  }
}
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  & > div {
    line-height: 1rem;
    // height:1rem;
    font-size: 0.4rem;
  }
  .van-field__control {
    padding: 0 0.2rem;
  }
  .van-field__error-message {
    padding: 0 0.2rem;
  }
}
.register-button {
  margin: 0.1rem auto;
  padding-top: 10px;
  button {
    line-height: 1rem;
    height: 1rem;
    font-size: 0.5rem;
  }
}
</style>
