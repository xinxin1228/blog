<template>
 <div id="addLink">
   <el-form
    :model="form"
    :rules="rules"
    ref="form"
    status-icon
    label-position="top"
   >
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name"></el-input>  
    </el-form-item> 
    <el-form-item label="首页" prop="home">
      <el-input v-model="form.home"></el-input>  
    </el-form-item> 
    <el-form-item label="图标" prop="logo">
      <el-input v-model="form.logo"></el-input>  
    </el-form-item> 
    <el-form-item label="描述" prop="des">
      <el-input v-model="form.des"></el-input>  
    </el-form-item> 
    <el-form-item>
      <el-button type="primary" @click="submit">确认添加</el-button>
    </el-form-item>
   </el-form>
 </div>
</template>
 
<script>
import {mapActions} from 'vuex'
export default {
  name: 'AddLink',
  data(){
    return{
      form:{
        name:"",
        des:"",
        logo:"",
        home:""
      },
      rules:{
        name:[
          {required:true,message:"请输入名称"}
        ],
        des:[
          {required:true,message:"请输入描述"}
        ],
        home:[
          {required:true,message:"请输入网址",type:"url"}
        ],
        logo:[
          {required:true,message:"请输入网址",type:"url"}
        ],


      }
    }
  },
  methods:{
    submit(){
      this.$refs.form.validate(async v=>{
        if(v){
          let {data} = await this.$axios.post("/admin/link/addLink",{
            data:this.form
          })
          if(!data.code){
            this.$refs.form.resetFields()
            return this.$message.success(data.mes)
          }
          this.$message.warning(data.mes)
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