<template>
  <AppNav></AppNav>
  <div id="main">
    <div class="main-left">
      <AppSide></AppSide>
    </div>
    <div class="main-right">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppNav from "@/components/AppNav";
import AppSide from "@/components/AppSide";
import {mapMutations,mapState} from "vuex"
import { h } from 'vue';
export default {
  components:{
    AppNav,
    AppSide
  },
  async created(){
    let {data} = await this.$axios.post("/check")
    if(!data.code){
      this.loginSuccess(data.userInfo)
      this.open1()
    }
  },
  computed:{
    ...mapState(["userInfo"])
  },
  methods:{
    ...mapMutations(["loginSuccess"]),
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


<style lang="less">
@import "assets/css/reset.css";
@import "assets/css/font.css";
@import "assets/css/font/iconfont.css";
body{
  background: url("./assets/img/bg/bg-left.png") 0 50px no-repeat fixed,url("./assets/img/bg/bg-right.png") no-repeat right 50px fixed;
  background-color: #f2f2f2;
}
::-webkit-scrollbar {/*滚动条整体样式*/
  width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(0,167,232,.3);
}
::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 10px;
  background: #EDEDED;
}
#main{
  max-width: 1300px;
  min-width: 900px;
  padding: 0 15px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  margin: 15px auto;
  margin-top: 65px;
  .main-left{
    width: 270px;
    // background-color: red;
    margin-right: 15px;
  }
  .main-right{
    flex:1;
    width: 100%;
  }
}


</style>
