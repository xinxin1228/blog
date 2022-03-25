<template>
 <div class="altPass">
   <el-form
      :model="passForm"
      status-icon
      :rules="rules"
      ref="passForm"
      label-width="100px"
    >
      <!--  prop 验证规则  v-model 数据 -->
       <el-form-item label="原密码：" prop="pass" label-width="100px">
        <el-input type="password" v-model="passForm.oldPass"></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="pass" label-width="100px">
        <el-input type="password" v-model="passForm.pass"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码：" prop="pass2" label-width="100px">
        <el-input type="password" v-model="passForm.pass2"></el-input>
      </el-form-item>
      <el-form-item label-width="100px">
        <el-button type="primary" @click="submit">确认修改</el-button>
      </el-form-item>
    </el-form>
 </div>
</template>
 
<script>
import {mapMutations} from "vuex"
export default {
  name: 'UpdataPass',
  data(){
    return{
      passForm:{
        oldPass:"",
        pass:"",
        pass2:""
      },
      rules:{
       pass: [
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
            },
            trigger:"input"
          }
       ],
       pass2: [
          {
            validator: (rule, value, cb) => {
              if (this.passForm.pass !== value) {
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
    ...mapMutations(["loginOut"]),
    submit(){
      this.$refs.passForm.validate(async v=>{
        if(v){
          let {data} = await this.$axios.post("/user/altPass",{
            data:{
              oldPass: this.passForm.oldPass,
              pass: this.passForm.pass
            }
          })
          if(data.code){
            this.$message.error(data.mes)
            return
          }
          this.$notify({
            title: '提示',
            message: data.mes,
            type:"success",
            offset: 100
          })
          this.loginOut()
          this.$refs.passForm.resetFields()
        }else{
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
</style>