<template>
  <el-form 
    :model="form" 
    status-icon 
    :rules="rules" 
    ref="form" 
    label-width="100px" 
    class="demo-ruleForm"
    label-position="top"
  >
    <el-form-item label="标题" prop="title" label-width="100px" >
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="时间" prop="time" label-width="100px" >
      <el-input v-model="form.time"></el-input>
    </el-form-item>
    <el-form-item label="技能" prop="skill" label-width="100px" >
      <el-input v-model="form.skill"></el-input>
    </el-form-item>
    <el-form-item label="图标" prop="icon" label-width="100px" >
      <el-input v-model="form.icon"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="des" label-width="100px" >
      <el-input type="textarea" v-model="form.des"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
 
<script>
export default {
  name: 'AddProject',
  data() {
    return {
      form: {
        title: '',
        skill: '',
        icon: '',
        des:"",
        time:""
      },
      rules: {
        title:[
          {
            required:true,message:"请输入标题"
          }
        ],
        skill:[
          {
            required:true,message:"请输入技能"
          }
        ],
        icon:[
          {
            required:true,message:"请输入图片网址",
            type:"url"
          }
        ],
        des:[
          {
            required:true,message:"请输入项目描述"
          }
        ],
        time:[
          {required:true,message:"请输入项目完成时间"}
        ]
      }
    }
  },
  methods: {
    submit(){
      this.$refs.form.validate(async v=>{
        if(v){
          let {data} = await this.$axios.post("/admin/project/add",{
            title:this.form.title,
            skill:this.form.skill,
            icon:this.form.icon,
            des:this.form.des,
            time:this.form.time
          })
          this.$message.success(data.mes)
          this.$refs.form.resetFields()
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