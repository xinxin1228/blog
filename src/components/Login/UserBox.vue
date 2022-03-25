<template>
  <el-popover
    placement="bottom"
    :width="170"
    trigger="hover"
  >
    <template #reference>
      <div class="user">
        <div class="userImg" :style="{backgroundImage:`url(${baseURL}${userInfo.photo}${random})`}">

        </div>
        <div class="userName">
         {{ userInfo.user}}
        </div>
      </div>
    </template>
    <div class="show">
      <el-button type="primary" size="mini" @click="altUserInfo">修改信息</el-button>
      <el-button type="danger" size="mini" @click="logout">退出登录</el-button>
    </div>
  </el-popover>

  
</template>
 
<script>
import {mapState,mapMutations} from "vuex"
export default {
  name: 'UserBox',
  data(){
    return{
      random:`?_=${Date.now()}`
    }
  },
  watch:{
    userInfo(){
      this.random = `?_=${Date.now()}`
    }
  },
  computed:{
    ...mapState(["userInfo"])
  },
  methods:{
    ...mapMutations(["loginOut"]),
    // 退出登录
    logout(){
        this.$confirm('确认要退出登录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$axios.post("/logout")
          // 清空vuex
          this.loginOut()
          this.$notify({
              title: '提示',
              message: '退出登录成功！',
              offset: 50,
              type: 'success'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出登录'
          })
        })
    
    },
    // 修改信息
    altUserInfo(){
      this.$router.push("/user")
    }
  }
}
</script>

<style scoped lang='less'>
.user{
  width: 150px;
  height: 40px;
  margin-top: -5px;
  display: flex;
  cursor: pointer;
  .userImg{
    width: 40px;
    height: 40px;
    margin-right:12px;
    border-radius: 50%;
    overflow: hidden;
    background-size: cover;
  }
  .userName{
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 40px;
    font-size: 14px;

  }
}
</style>