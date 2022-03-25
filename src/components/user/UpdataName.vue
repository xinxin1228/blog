<template>
  <div class="updataName">
    <el-form
      :model="userForm"
      status-icon
      :rules="rules"
      ref="userForm"
      label-width="100px"
    >
      <el-form-item label="当前用户名：" label-width="100px">
        <p><span class="code">{{userInfo.user}}</span></p>
      </el-form-item>
      <el-form-item label="新用户名：" prop="user" label-width="100px">
        <el-input v-model="userForm.user"></el-input>
      </el-form-item>
      <el-form-item label-width="100px">
        <el-button type="primary" @click="submit">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
import {mapState,mapMutations} from "vuex"
export default {
  name: 'UpdataName',
  computed:{
    ...mapState(["userInfo"])
  },
  data(){
    return{
      userForm:{
        user:""
      },
      rules:{
         user:[
          {
            validator:(rule, value, cb)=> {
              //长度验证
              if (value.length < 2 || value.length > 8) {
                cb(new Error("请输入2~8位的用户名"))
              }

              if(value === this.userInfo.user){
                cb(new Error("不能与原密码相同哦~"))
              }

              //规则验证
              if (!/^[\w\u4e00-\u9fa5\u0800-\u4e00\uac00-\ud7ff]+$/.test(value)) {
                cb(new Error("只允许 数字 字母 _ 中/日/韩文"))
              }
              cb()
            }
          }
        ],
      }
    }
  },
  methods:{
    ...mapMutations(["loginSuccess"]),
    submit(){
      this.$refs.userForm.validate(async v=>{
        if(v){
          let {data} = await this.$axios.post("/user/altName",{
            data:{
              oldName:this.userInfo.user,
              newName:this.userForm.user
            }
          })
          if(data.code){
            return this.$message.error(data.mes)
          }

          this.$message.success(data.mes)
          // 更新vuex数据
          this.loginSuccess(data.data)
          this.$refs.userForm.resetFields() //表单清空

          }else{
            return false
          }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.updataName{
  p{
    color: #444;
    font-size: 14px;
    letter-spacing: 4px;
    line-height: 30px;
    span.code{
      color: #bd4147;
      background-color: rgba(27,31,35,.05);
      font-weight: 700;
      line-height: 40px;
    }
  }
}
</style>