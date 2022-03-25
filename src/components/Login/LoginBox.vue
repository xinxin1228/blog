<template>
 <el-button type="success" size="mini" @click="showLogin">登录/注册</el-button>
 <div class="loginBox" @click="closeLoginBox" v-if="isShow">
   <div class="login" @click.stop>
      <el-tabs 
      v-model="activeName">
      <el-tab-pane label="立即登录" name="first">
        <el-form 
        :model="loginForm" 
        status-icon 
        :rules="rules" 
        ref="loginForm" 
        label-width="80px"
        @keydown.enter="loginSubmit"
        >
          <el-form-item label="用户名" prop="user" label-width="80px" >
            <el-input type="text" v-model="loginForm.user" /> 
          </el-form-item>
          <el-form-item label="密码" prop="pass" label-width="80px" >
            <el-input type="password" v-model="loginForm.pass"></el-input>
          </el-form-item> 
          <el-form-item label-width="80px" >
            <el-button type="primary" @click="loginSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册账号" name="second">
        <el-form 
        :model="regForm" 
        status-icon 
        :rules="rules" 
        ref="regForm" 
        label-width="80px" 
        @keydown.enter="regSubmit"
        >
          <el-form-item label="用户名" prop="user" label-width="80px" >
            <el-input type="text" v-model="regForm.user" /> 
          </el-form-item>
          <el-form-item label="密码" prop="pass" label-width="80px" >
            <el-input type="password" v-model="regForm.pass"></el-input>
          </el-form-item> 
          <el-form-item label="确认密码" prop="pass2" label-width="80px" >
            <el-input type="password" v-model="regForm.pass2"></el-input>
          </el-form-item>
          <el-form-item label-width="80px" >
            <el-button type="primary" @click="regSubmit">立即注册</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
   </div>
 </div>
</template>
 
<script>

import {mapMutations} from "vuex"

export default {
  name: 'LoginBox',
  data(){
    return{
      isShow:false,
      activeName:"first",
      // 注册表单数据
      regForm:{
        user:"",
        pass:"",
        pass2:""
      },
      // 登录表单数据
      loginForm:{
        user:"",
        pass:""
      },
      // 规则
      rules:{
        user:[
          {required: true, message: "请输入用户名"},
          {
            validator(rule, value, cb) {
              //长度验证
              if (value.length < 2 || value.length > 8) {
                cb(new Error("请输入2~8位的用户名"))
              }
              //规则验证
              if (!/^[\w\u4e00-\u9fa5\u0800-\u4e00\uac00-\ud7ff]+$/.test(value)) {
                cb(new Error("只允许 数字 字母 _ 中/日/韩文"))
              }

              cb()
            }
          }
        ],
        pass: [
          {required: true, message: "请输入密码"},
          {
            validator(rule, value, cb) {
              //长度验证
              if (value.length < 6 || value.length > 18) {
                cb(new Error("请输入6~18位的密码"))
              }
              //规则验证
              if (!/^[\w\[\]\/\\~`|<>,.?;':"{}!@#$%^&*()_+=-]+$/.test(value)) {
                cb(new Error("不允许的密码字符"))
              }

              cb()
            }
          }
        ],
        pass2: [
          {required: true, message: "请确认密码"},
          {
            validator: (rule, value, cb) => {
              if (this.regForm.pass !== value) {
                cb(new Error("两次输入密码不一致"))
              }
              cb()
            }
          }
        ]
      }
    }
  },
  methods:{
    showLogin(){
      this.$message({
            showClose: true,
            message: '点击周围空白区域即可退出'
      }) 
      this.isShow = true
    },
    // 注册
    regSubmit() {
      // 验证数据是否符合规范
      this.$refs.regForm.validate(async v => {
        if (v) {
          let {data} = await this.$axios({
            method:"POST",
            url:"/reg",
            data:{
              user:this.regForm.user,
              pass:this.regForm.pass
            },
          })
          if(data.code){
            this.$message.error(data.mes)
            return
          }
          this.$message.success(data.mes)
          this.$refs.regForm.resetFields()
          this.activeName = "first"
        } else {
          return false
        }
      })
    }, 
    // 登录
    loginSubmit(){
      this.$refs.loginForm.validate(async v => {
        if (v) {
          let {data} = await this.$axios({
            method:"POST",
            url:"/login",
            data:this.loginForm
          })
          if(data.code){
            this.$message({
            showClose: true,
            message: data.mes,
            type: 'warning'
          });
            return
          }
          this.$message({
            showClose: true,
            message:data.mes,
            type: 'success'
          })
          this.$refs.loginForm.resetFields()
          this.isShow = false
          // 存到vuex中
          this.loginSuccess(data.userInfo)
          // this.open1()
        } else {
          return false
        }
      })
    
    },
    // vuex
    ...mapMutations(["loginSuccess"]),
    closeLoginBox(){
      this.isShow = false
    },
     // 登录提示
    open1() {
        this.$notify({
          title: '来自新新小朋友的消息',
          duration:10000,
          message: h('i', { style: 'color: teal'}, `${this.getTimeAlt()}`),
          offset: 70
        })
    },
    // 随时间变化的提示
    getTimeAlt(){
      let date = new Date()
      // `欢迎回来哦，${this.userInfo.user}`
      let h = date.getHours()
      if(h>0&&h<=3){
        return `深夜好呀，${this.userInfo.user},已经这么晚了，要早点休息哦~晚安，好梦~`
      }else if(h>3&&h<=5){
        return `凌晨好呀，${this.userInfo.user}。拂晓的曙光揭去夜幕的轻纱，吐出残暴的晨曦，迎来了新的一天。愿早起奋斗的你，早日实现自己的梦想，加油哦~`
      }else if(h>5&&h<=8){
        return `早上好呀，${this.userInfo.user}。晨光踱进窗纱，希望洒满你的脸颊，朝霞打开你的心扉，自信慢慢升华。亲爱的朋友，早安~`
      }else if(h>8&&h<=11){
        return `上午好呀，${this.userInfo.user}。相信梦想是价值的源泉，相信眼光决定未来的一切，相信成功的信念比成功本身更重要，相信人生有挫折没有失败，相信生命的质量来自决不妥协的信念。`
      }else if(h>11&&h<=13){
        return `中午好呀，${this.userInfo.user}。生活总有不尽人意，道路总有崎岖不平，愿你整理好心情，把微笑当成生命里面的主旋律，删除不开心因子，添加开心的元素。`
      }else if(h>14&&h<=18){
        return `下午好呀，${this.userInfo.user}。风吹起如花般破碎的流年，而你的笑容摇晃摇晃，成为我旅途中最美的点缀。`
      }else if(h>18&&h<=23){
        return `晚上好呀，${this.userInfo.user}。夕阳的余晖已经被月亮轻轻拂去，柔美的月光撒落人间，充实的一天已然过去。要早点休息哦~`
      }
    }
  }
}
</script>

<style scoped lang='less'>
.loginBox{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.5);
  .login{
    position: absolute;
    width: 300px;
    background-color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 10px 20px;
  }
}
</style>