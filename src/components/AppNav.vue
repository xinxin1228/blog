<template>
  <div id="AppNav">
    <div class="content">
      <!-- logo -->
    <div class="logo">
      <a href="/">huangjianxin</a>
    </div>
    <!-- 导航 -->
    <div class="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/article">文章</router-link>
      <router-link to="/message">留言</router-link>
      <router-link to="/link">友链</router-link>
      <router-link to="/about">关于</router-link>
    </div>
    <!-- 登录/注册 -->
    <div class="login">
      <UserBox v-if="userInfo.user"></UserBox>
      <LoginBox v-else></LoginBox> 
    </div>
    </div>
  </div>
</template>
 
<script>
import LoginBox from "./Login/LoginBox";
import {mapState} from "vuex"
import UserBox from "@/components/Login/UserBox"
export default {
  name: '',
  components:{
    LoginBox,UserBox
  },
  computed:{
    ...mapState(["userInfo"])
  }
}
</script>

<style scoped lang='less'>
#AppNav{
  width: 100%;
  height: 50px;
  box-shadow: 0 0 2px #999;
  background-color: #FFF;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  .content{
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .logo{
    width: 130px;
    height: 50px;
      a{
        font-family: "Pacifico";
        color: rgba(0, 0, 0, .7);
        text-decoration: none;
        font-size: 26px;
        line-height: 42px;
      }
    }
    .nav{
      display: flex;
      a{
        height: 47px;
        padding: 0 25px;
        font-weight: bolder;
        color: #777;
        border-bottom: 3px solid transparent;
        text-decoration: none;
        line-height: 48px;
        transition: all .3s;
        &:hover{
          color: #00b7ff;
        }
        &.router-link-active{
          color: #00b7ff;
          border-color: #00b7ff;
        }
      }
    }
    .login{
      padding: 11px 0;
    }
  }
}
</style>