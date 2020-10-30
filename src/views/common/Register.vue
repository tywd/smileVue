<template>
  <div>
    <van-nav-bar class='navbar'
      title="用户注册"
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
        :error-message="usernameErrorMsg" />
      <van-field v-model="password"
        type="password"
        label="密码"
        icon="clear"
        placeholder="请输入密码"
        required
        @click-icon="password = '' "
        :error-message="passwordErrorMsg" />
      <div class="register-button">
        <van-button type="primary"
          @click="registerAction"
          size="large"
          :loading="openLoading">马上注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      username: '',
      password: '',
      openLoading: false, // 是否开户用户注册的Loading状态
      usernameErrorMsg: '', // 当用户名出现错误时的提示信息
      passwordErrorMsg: '' // 当密码出现错误时的提示信息
    }
  },
  created () {
    // this.$toastTip.success()
    // this.$toastTip.loading('注册成功，\n请稍后...')
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    // 点击马上注册
    registerAction () {
      // console.log('ty')
      this.checkForm() && this.RegisterUser()
    },
    /**
     * 用户注册方法
     */
    RegisterUser () {
      this.openLoading = true
      // console.log(url.registerUser)
      let postData = {
        username: this.username,
        password: this.password
      }
      this.$http.post('/user/register', postData).then(response => {
        console.log(response, '注册返回')
        // 如果返回code为200，代表注册成功，我们给用户作Toast提示
        if (response.code === 200) {
          this.$toastTip.loading('注册成功，\n请稍后...')
          setTimeout(() => {
            this.$toast.clear()
            this.goBack()
          }, 2000)
        } else {
          console.log(response.message)
          this.openLoading = false
          // this.$toastTip.fail('注册失败')
        }
      }).catch(error => {
        console.error(error)
        // this.$toastTip.fail('出错:注册失败')
        this.openLoading = false
      })
    },
    /**
     * 用户登录
     */
    LoginUser () {
      let postData = {
        username: this.username,
        password: this.password
      }
      this.$http
        .post('/user/login', postData)
        .then(response => {
          console.log(response, '登录返回')
          // 如果返回code为200，代表登录成功，我们给用户作Toast提示
          if (response.code === 200 && response.message) {
            new Promise((resolve, reject) => {
              // 保存用户登录状态
              localStorage.userInfo = { username: this.username }
              setTimeout(() => {
                resolve()
              }, 500)
            }).then(() => {
              this.$toastTip.loading('登录成功\n请稍后...')
              // this.$router.push('/') // 登录成功则回到首页展示
              // this.$store.commit('changeLogin', response.body.token) // 登录成功后同步修改vuex下的token
            }).catch(err => {
              this.$toastTip.fail('登录状态保存失败')
              console.log(err)
            })
          } else {
            console.log(response.message)
            this.$toastTip.fail('登录失败')
          }
        })
        .catch(error => {
          console.error(error)
          this.$toastTip.fail('出错:登录失败')
        })
    },
    // 表单验证方法
    checkForm () {
      let isOk = true
      if (this.username.length < 5) {
        console.log('ty')
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
