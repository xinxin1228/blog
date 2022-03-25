<template>
 <div id="user">
   <article>
     <h2>修改账号昵称</h2>
      <UpdataName></UpdataName>
   </article>
   <article>
     <h2>修改账号密码</h2>
      <UpdataPass></UpdataPass>
   </article>
   <article>
     <h2>上传个人头像</h2>
      <UpdataPhoto></UpdataPhoto>
   </article>
 </div>
</template>
 
<script>
import UpdataName from "@/components/user/UpdataName"
import UpdataPass from "@/components/user/UpdataPass"
import UpdataPhoto from "@/components/user/UpdataPhoto"
import {mapState} from "vuex"
export default {
  name: 'User',
  data() {
    return {
      tabPosition: 'left'
    }
  },
  components:{
    UpdataName,UpdataPass,UpdataPhoto
  },
  computed:{
    ...mapState(["userInfo"])
  },
  // 监听用户登录变化
  watch:{
    userInfo(){
      this.backHome()
    }
  },
  methods:{
    backHome(){
      if(!this.userInfo.user){
        this.$message.warning("请登录后修改个人信息")
        this.$router.replace("/")
      }
    }
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      vm.backHome()
    })
  }
}
</script>

<style scoped lang='less'>
#user{
  article{
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 15px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px;
    background-color: #fff;
    font-family: Quicksand;
    h2{
      margin-bottom: 15px;
      font-size: 20px;
      letter-spacing: 3px;
      line-height: 24px;
      border-left: 5px solid #73b899;
      text-indent: 10px;
      font-weight: bolder;
    }
  }
}
</style>