<template>
  <div class="container1">

    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <span style="font-weight:bold">会员跟进系统</span>
      </div>
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="70px"
               class="myForm">
        <el-form-item label="手机号"
                      prop="tel">
          <el-input v-model="ruleForm.tel"
                    placeholder="请输入手机号"
                    prefix-icon='el-icon-phone'
                    id="phone"></el-input>
        </el-form-item>
        <el-row class='verificationCode'>
          <el-form-item label="图形码"
                        prop="imgCode">
            <el-input v-model="ruleForm.imgCode"
                      placeholder="请输入图形验证码"
                      prefix-icon='el-icon-s-goods'
                      id="phone"></el-input>
          </el-form-item>
        </el-row>
        <img :src='imgCode'
             alt="加载中..."
             @click="sendCode()"
             style="vertical-align: middle;">
        <span style="font-size: 12px;">←点击切换</span>
        <el-row class='verificationCode'>
          <el-form-item label="验证码">
            <el-input v-model="ruleForm.code"
                      placeholder="输入验证码"
                      prefix-icon='el-icon-s-goods'></el-input>
          </el-form-item>
          <el-form-item label=""
                        prop="pwd">
            <div id="captcha"></div>
          </el-form-item>
        </el-row>
        <el-button type="primary"
                   class='getCaptcha'
                   style="margin-bottom:10px;display: inline-block;width: 34%;"
                   ref="captchaBtn"
                   @click="sendPhoneCode()"
                   :disabled="state.smsSendBtn"
                   v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s后重新发送')"></el-button>
        <el-form-item label="">
          <el-button type="primary"
                     @click="submitForm()"
                     @keyup.enter="login()"
                     class='loginBtn'>登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { login, Register, smsCheckSend } from "./api/api";
import gtInit from './assets/js/gt'
export default {
  components: {
    gtInit
  },
  mounted () { },
  data () {
    //账号验证规则
    var validatePass = (rule, value, callback) => {
      var reg = /^1[3456789]\d{9}$/;
      if (reg.test(value)) {
        callback(); //验证通过
      } else callback(new Error("请输入正确手机号再试")); //验证失败
    };
    //密码验证规则
    var validatePwd = (rule, value, callback) => {
      // xxxx@xxxx.xxx
      // var reg = /^\w{2,}@\w{3,}\.\w{2,}$/
      var reg = /^\w{6,20}$/;
      if (reg.test(value)) {
        callback(); //验证通过
      } else callback(new Error("密码只能是6-20位数字字母下划线")); //验证失败
    };
    return {
      // 图形验证码
      imgCode: '',

      // 按钮倒计时
      state: {
        time: 60,
        // 登录按钮是否禁言/加载中
        loginBtn: false,
        // 获取验证码按钮是否禁用
        smsSendBtn: false,
      },
      // 极验参数
      geetestParam: {
        tel: '',
        challenge: '',
        validate: '',
        seccode: '',
      },
      offline: '',
      challenge: "",
      gt: "",
      newCaptcha: true,
      success: true,
      // 极验盒子显示隐藏
      boxSee: false,
      isVerificationShow: false,
      ruleForm: {
        tel: "",
        code: "",
        name: '',
        imgCode: ''
      },
      //验证规则
      rules: {
        tel: [
          //validator: 自定义匹配规则的函数    trigger: 触发时机
          { validator: validatePass, trigger: "blur" }
        ],
        password: [{ validator: validatePwd, trigger: "blur" }],
        imgCode: [{ required: true, message: '图形验证码不能为空', trigger: 'blur' },],

      }
    };
  },
  created () {
    let that = this;
    document.onkeydown = function (e) {
      e = window.event || e;
      if (that.$route.path == '/' && (e.code == 'Enter' || e.code == 'enter')) {//验证在登录界面和按得键是回车键enter
        that.submitForm('submitForm');//登录函数
      }
    }
    this.sendCode()
  },
  methods: {
    sendCode () {
      var tel = this.ruleForm.tel
      Register().then(res => {
        this.imgCode = 'data:image/png;base64,' + res.data.data
      })
    },
    sendPhoneCode () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          var tel = this.ruleForm.tel
          var code = this.ruleForm.imgCode
          smsCheckSend(tel, code).then(res => {
            if (res.data.state == 1) {
              this.$message({
                message: res.data.data,
                type: 'success'
              });
              const interval = window.setInterval(() => {
                this.state.time--
                this.state.smsSendBtn = true;
                if (this.state.time <= 0) {
                  this.state.time = 60;
                  this.state.smsSendBtn = false;
                  window.clearInterval(interval);
                }
              }, 1000);
            } else {
              this.$message.error(res.data.data);
            }
          })
        }
      })
    },
    GeetestRegisterFn () {
      // let that = this;
      // var tel = this.ruleForm.tel
      Register().then((res) => {
        if (res.data.state === 1) {
          // 初始化极验
          this.offline = res.data.data.success
          window.initGeetest({
            gt: res.data.data.gt,
            challenge: res.data.data.challenge,
            offline: !res.data.data.success,
            new_captcha: res.data.data.newCaptcha,
            product: 'bind',
            width: '100%',
          }, (captchaObj) => {
            captchaObj.appendTo('#captcha');
            captchaObj.onReady(() => {
              // document.getElementsByClassName('getCaptcha')
              var onBtn = this.$refs.captchaBtn.$el
              onBtn.onclick = () => {
                this.$refs.ruleForm.validate(valid => {
                  if (valid) {
                    captchaObj.verify();
                  }
                })
              };
            });
            // 拖动验证完毕触发二次验证
            captchaObj.onSuccess(() => {
              this.$refs.ruleForm.validate(valid => {
                if (valid) {
                  var challenge = captchaObj.getValidate().geetest_challenge;
                  var validate = captchaObj.getValidate().geetest_validate;
                  var seccode = captchaObj.getValidate().geetest_seccode;
                  var tel = document.getElementById('phone').value;
                  // 发送极验参数到二次验证接口
                  smsCheckSend(challenge, validate, seccode, tel).then((res) => {
                    if (res.data.state === 1) {
                      // 锁定按钮
                      // this.$message.success(res.data);
                      this.$message({
                        message: '短信验证码已发送,请注意查收',
                        type: 'success'
                      });
                      // state.smsSendBtn = true;
                      const interval = window.setInterval(() => {
                        this.state.time--
                        this.state.smsSendBtn = true;
                        if (this.state.time <= 0) {
                          this.state.time = 60;
                          this.state.smsSendBtn = false;
                          window.clearInterval(interval);
                          captchaObj.reset();
                        }
                      }, 1000);
                    } else {
                      this.$message.error(res.data.data);
                      // window.location.reload()
                      captchaObj.reset();
                    }
                  });
                } else {
                  alert('请输入正确的手机号')
                  // window.location.reload()
                  captchaObj.reset();
                }
              })
              // this.$message.loading('验证码发送中..', 3);
            });
            captchaObj.onError(() => { });
          });
        }
      }).catch(() => { });
    },
    handleSucces () {
      const { state, geetestParam } = this;

      this.boxSee = false
      this.isVerificationShow = false

      // GeetestRegister(geetestParam).then(res => {

      // })
    },

    handleClick () {
      this.isVerificationShow = true
      this.boxSee = true
    },
    onRefresh () {
      alert('刷新')
    },
    onFail () {
      alert('失败')
    },
    onSuccess () {
      alert('1')
    },
    submitForm () {
      //验证函数
      //用法: this.$refs.表单名.validate( callback(是否验证成功!)  )
      // validate是from表单自带的验证函数
      this.$refs.ruleForm.validate(valid => {
        //valid: 是否验证通过
        if (valid) {
          //验证通过发送请求给服务器
          login(this.ruleForm.tel, this.ruleForm.code).then(res => {
            if (res.data.state == 1) {
              localStorage.setItem("LG", res.data.state);  //保存用户id
              //登录成功以后,把用户ID保存在浏览器中
              localStorage.setItem("id", res.data.data.followMemberSalesMan.id);  //保存用户id
              localStorage.setItem("acc", res.data.data.followMemberSalesMan.name);  //保存用户名
              localStorage.setItem("token", res.data.data.tk) //把token令牌写入到本地存储
              localStorage.setItem('menuModel', res.data.data.menuModel)
              localStorage.setItem('bpIsManage', res.data.data.followMemberSalesMan.bpIsManage)
              localStorage.setItem('bP_Name', res.data.data.followMemberSalesMan.bP_Name)
              localStorage.setItem('isManage', res.data.data.followMemberSalesMan.isManage)
              localStorage.setItem('bp', res.data.data.followMemberSalesMan.bp)
              localStorage.setItem('f_Department', res.data.data.followMemberSalesMan.f_Department)
              // this.$router.push("/index/FollowUpMember");bpIsManage
              this.$router.push({ name: 'FollowUpMember', params: { id: res.data.data.followMemberSalesMan.bpIsManage } })
            } else {
              //失败
              alert(res.data.data)
              this.error = true; //显示我们的错误节点
            }
          });

        } else {
          this.$message.error('请输入正确的账号或密码');
        }
      });
    },

  }
};
</script>

<style lang="less" >
.verificationCode {
  width: 60%;
  display: inline-block;
  margin-right: 20px;
}
.container1 {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;

  .box-card {
    // width: 400px;
    // height: 300px;
    margin-right: 40%;
  }
  .loginBtn {
    width: 329px;
  }
  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }
  .box {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #666;
    background-color: rgba(109, 108, 108, 0.58);
  }
  .puzzle-container {
    position: absolute !important;
    top: 39%;
    left: 42%;
  }
  .myForm {
    position: relative;
    max-width: 400px;
  }
  .geetest_holder.geetest_wind .geetest_logo {
    display: none;
  }
  .geetest_holder.geetest_wind {
    min-width: 0;
  }
}
</style>