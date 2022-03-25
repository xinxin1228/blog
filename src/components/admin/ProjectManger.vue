<template>
   <el-table
    :data="projectData"
    border
    >
    <el-table-column
      label="项目完成时间"
      align="center"
      >
      <template  #default="scope">
         <el-input  v-model="scope.row.time"></el-input> 
      </template>
    </el-table-column>
    <el-table-column
      label="项目名称"
      align="center"
      >
      <template  #default="scope">
         <el-input  v-model="scope.row.title"></el-input> 
      </template>
    </el-table-column>
    <el-table-column
      label="相关技能"
      align="center"
      >
      <template #default="scope">
        <el-input v-model="scope.row.skill"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      label="icon"
      align="center"
      >
      <template #default="scope">
        <el-input v-model="scope.row.icon"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      prop="des"
      label="项目描述"
      align="center"
      >
      <template #default="scope">
        <el-input v-model="scope.row.des"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      align="center"
    >
      <template #default="scope">
        <el-button type="primary" @click="update(scope.row)" size="small">修改</el-button>
        <el-popover
          placement="top"
          :visible="scope.row.isShowDel"
        >
          <p>确认删除这条友链数据吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="cancalDel(scope.row)">取消</el-button>
            <el-button type="primary" size="mini" @click="delLink(scope.row)">确定</el-button>
          </div>
          <template #reference>
            <el-button type="danger" size="small" @click="deleteLink(scope.row)">删除</el-button>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    </el-table>
</template>
 
<script>
export default {
  name: 'ProjectManger',
  data(){
    return{
      // 项目数据
      projectData:[]
    }
  },
  methods:{
    // 获取项目
    async getProjectData(){
      let {data} = await this.$axios.get("/admin/get/projectList")
      let a = data.data
      a.forEach(e=>{
        e.isShowDel = false // 是否显示删除
      })
      this.projectData = a
    },
    // 修改项目
    async update(item){
      let {data} = await this.$axios.post("/admin/project/update",{
        _id:item._id,
        title:item.title,
        icon:item.icon,
        des:item.des,
        skill:item.skill,
        time:item.time
      })
      this.$message.success(data.mes)
      this.getProjectData()
    },
    // 显示删除
    deleteLink(item){
      item.isShowDel = !item.isShowDel
    },
    // 确认删除
    async delLink(item){
      let {data} = await this.$axios.post("/admin/project/delete",{
        _id:item._id
      })
      item.isShowDel = false
      this.$message.success(data.mes)
      this.getProjectData()
    },
    // 取消删除
    cancalDel(item){
      item.isShowDel = false
    }
  },
  created(){
    this.getProjectData()
  }
}
</script>

<style scoped lang='less'>
</style>