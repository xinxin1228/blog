<template>
   <div id="LinkManger">
    <el-table
    :data="linkData"
    border
    >
    <el-table-column
      prop="name"
      label="名称"
      align="center"
      >
      <template  #default="scope">
         <el-input  v-model="scope.row.name"></el-input> 
      </template>
    </el-table-column>
    <el-table-column
      prop="home"
      label="首页"
      align="center"
      >
      <template #default="scope">
        <el-input v-model="scope.row.home"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      prop="logo"
      label="logo"
      align="center"
      >
      <template #default="scope">
        <el-input v-model="scope.row.logo"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      prop="des"
      label="描述"
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
  </div>

</template>
<script>
// import {mapState, mapActions} from 'vuex'

export default {
  name: 'LinkManger',
  data(){
    return{
      // 友链数据
      linkData:[],
    }
  },
  methods:{
    // 获取友链数据
    async getLinkData(){
      let {data} = await this.$axios.get("/admin/get/linkList")
      let d = data.mes
      d.forEach(e=>{
        e.isShowDel = false  // 是否显示删除数据
        e.isShowUpdate = false // 是否显示修改数据
      })
      this.linkData = d
    },
    // 修改数据
    async update(item){
      let {data} = await this.$axios.post("/admin/link/updateLink",{
        name:item.name,
        logo:item.logo,
        home:item.home,
        des:item.des,
        _id:item._id
      })
      if(!data.code){
        this.getLinkData()
        return this.$message.success(data.mes)
      }
      this.$message.error("服务器异常,请稍后再试~")
    },
    // 显示是否删除数据
    deleteLink(item){
      item.isShowDel = !item.isShowDel
    },
    // 删除友链数据
    async delLink(item){
      let {data} = await this.$axios.post("/admin/link/deleteLink",{
        _id:item._id
      })
      item.isShowDel = false
      console.log(data)
      if(!data.code){
        this.getLinkData()  //更新数据
        this.$message.success(data.code)
        return
      }
      this.$message.error("服务器异常,请稍后再试~")
    },
    // 取消删除友链数据
    cancalDel(item){
      this.$message("已取消删除")
      item.isShowDel = false
    }
  },
  created() {
    this.getLinkData()
  }
}
</script>

<style scoped lang='less'>

</style>