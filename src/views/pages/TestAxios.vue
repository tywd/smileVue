<!--  -->
<template>
  <div class='container'>
    <div class="register-panel">
      <van-row class="register-name">
        <van-field class="input"
          v-model="username"
          label="用户名"
          icon="clear"
          placeholder="请输入用户名"
          required
          @click-icon="username = '' "
          :error-message="usernameErrorMsg" />
      </van-row>
      <van-row class="register-password">
        <van-field class="input"
          v-model="password"
          type="password"
          label="密码"
          icon="clear"
          placeholder="请输入密码"
          required
          @click-icon="password = '' "
          :error-message="passwordErrorMsg" />
      </van-row>
      <van-row class="btnCon">
        <van-col class="register-button">
          <van-button type="primary"
            @click="loginAction"
            size="large"
            :loading="openLoading">登录</van-button>
        </van-col>
        <van-col class="register-button">
          <van-button type="default"
            @click="toRegister"
            size="large"
            :loading="openLoading">去注册</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import axios from 'axios'
import url from '@/serviceApi.config.js'
// import { Toast } from 'vant'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      username: '',
      password: '',
      openLoading: false, // 是否开户用户注册的Loading状态
      usernameErrorMsg: '', // 当用户名出现错误时的提示信息
      passwordErrorMsg: '' // 当密码出现错误时的提示信息
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    /**
     * [loginAction 用户登录的实行方法]
     * @return {[type]} [description]
     */
    loginAction () {
      console.log(this.username, this.password)
      this.checkForm() && this.axiosLoginUser()
    },
    /**
     * 用户登录方法
     */
    /**
     * axios 请求方式 （无拦截）
     */
    axiosLoginUser () {
      axios({
        url: url.login,
        method: 'post',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(response => {
        this.openLoading = false
        console.log(response.data.message)
        console.log(response, '登录返回')
        // 如果返回code为200，代表登录成功，我们给用户作Toast提示
        if (response.data.code === 200) {
          if (response.data.state === 0) {
            this.$toastTip.fail(response.data.message)
          } else {
            new Promise((resolve, reject) => {
              // 保存用户登录状态
              localStorage.userInfo = { username: this.username }
              setTimeout(() => {
                resolve()
              }, 500)
            }).then(() => {
              this.$toastTip.loading('登录成功\n请稍后...')
              this.$router.push('/') // 登录成功则回到首页展示
            }).catch(err => {
              this.$toastTip.fail('登录状态保存失败')
              console.log(err)
            })
          }
        } else {
          this.$toastTip.fail('登录失败')
        }
      }).catch(error => {
        console.error(error)
        this.$toastTip.fail('出错:登录失败')
        this.openLoading = false
      })
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
    },
    /**
     * [toRegister 去注册]
     * @return {[type]} [description]
     */
    toRegister () {
      this.$router.push('register')
    },
    // 测试全局调用封装拦截的axios
    get () {
      this.$http.get('/mock', {}).then(({ data }) => {
        console.log(data)
      }).catch(error => {
        console.log(error)
      })
    },
    post () {
      this.$http.post('/upload', {}).then(({ data }) => {
        console.log(data)
      }).catch(error => {
        console.log(error)
      })
    },
    getCategorylist () {
      this.$http.get('/goods/getCateGoryList', {}).then((data) => {
        console.log(data)
      }).catch(error => {
        console.error(error)
      })
    },
    getHome () {
      this.$http.get('home/getHome', {}).then((data) => {
        console.log(data)
      }).catch(error => {
        console.error(error)
      })
    },
    axiosRegister () {
      axios({
        url: url.registerUser,
        method: 'post',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(response => {
        console.log(response)
        // 如果返回code为200，代表注册成功，我们给用户作this.$toast提示
        if (response.data.code === 200) {
          this.$toast.success(response.data.message)
          this.$router.push('/') // 注册成功则回到首页展示
        } else {
          console.log(response.data.message)
          this.openLoading = false
          this.$toast.fail('注册失败')
        }
      }).catch((error) => {
        console.error(error)
        this.$toast.fail('出错:注册失败')
        this.openLoading = false
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // this.get()
    // this.post()
    // this.getCategorylist()
    // this.getHome()
    // console.log(this.$store.state.showFooter)
    // console.log(this.$store.dispatch('hideFooter'))
    // console.log(this.$store.dispatch('getNewNum', 6))
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { },
  beforeCreate () { }, // 生命周期 - 创建之前
  beforeMount () { }, // 生命周期 - 挂载之前
  beforeUpdate () { }, // 生命周期 - 更新之前
  updated () { }, // 生命周期 - 更新之后
  beforeDestroy () { }, // 生命周期 - 销毁之前
  destroyed () { }, // 生命周期 - 销毁完成
  activated () { } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' >
// @import url() 引入公共css类
.container {
  height: 100%;
  overflow-y: scroll;
}
.blocklint {
  width: 100%;
  height: 100px;
  background-color: royalblue;
}
.block {
  font-size: 30px;
  width: 100%;
  height: 300px;
  background-color: red;
  border: 1px solid #ddd;
}
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.register-panel .input {
  height: 100px;
  line-height: 100px;
  font-size: 30px;
}
.register-panel .input input {
  height: 100px;
  line-height: 100px;
}
.btnCon {
  display: flex;
}
.register-button {
  flex: 1;
  padding-top: 10px;
}
.register-button button {
  height: 100px;
  line-height: 100px;
  font-size: 30px;
}
.input {
  line-height: 60px;
}
</style>
