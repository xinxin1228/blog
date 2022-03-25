<template>
  <el-alert
    :title="noReadMes"
    type="success"
    effect="dark"
    :closable="false">
  </el-alert>
 <el-table
    :data="reportsData.filter(e=>e.ifHandle===false)"
    height="300"
    border>
    <el-table-column
      prop="name.user"
      align="center"
      label="举报人">
    </el-table-column>
    <el-table-column
      prop="reportAuthor.user"
      align="center"
      label="被举报人">
    </el-table-column>
    <el-table-column
      prop="reportGenre"
      align="center"
      label="举报类型">
    </el-table-column>
    <el-table-column
      prop="reason"
      align="center"
      label="举报原因">
    </el-table-column>
    <el-table-column
      prop="reportMessage"
      align="center"
      label="举报内容">
    </el-table-column>
    <el-table-column
      prop="time"
      align="center"
      label="举报时间">
    </el-table-column>
    <el-table-column
    align="center"
      label="操作">
      <template #default="scope">
        <el-button @click="handleClickRead(scope.row)" type="text" size="small">未读</el-button>
        <el-button @click="handleClick(scope.row)" type="text" size="small">处理</el-button>
         <el-popover
          placement="top"
          :visible="scope.row.showDel"
        >
          <p>确认删除这条反馈消息吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="cancalDel(scope.row)">取消</el-button>
            <el-button type="primary" size="mini" @click="delReport(scope.row)">确定</el-button>
          </div>
          <template #reference>
            <el-button type="text" size="small" @click="showDel(scope.row)">删除</el-button>
          </template>
        </el-popover>
      </template>
    </el-table-column>
  </el-table>
    <el-alert
    :title="readMes"
    type="success"
    effect="dark"
    :closable="false">
  </el-alert>
    <el-table
    :data="reportsData.filter(e=>e.ifHandle===true)"
    height="300"
    border>
    <el-table-column
      prop="name.user"
      align="center"
      label="举报人">
    </el-table-column>
    <el-table-column
      prop="reportAuthor.user"
      align="center"
      label="被举报人">
    </el-table-column>
    <el-table-column
      prop="reportGenre"
      align="center"
      label="举报类型">
    </el-table-column>
    <el-table-column
      prop="reason"
      align="center"
      label="举报原因">
    </el-table-column>
    <el-table-column
      prop="reportMessage"
      align="center"
      label="举报内容">
    </el-table-column>
    <el-table-column
      prop="time"
      align="center"
      label="举报时间">
    </el-table-column>
    <el-table-column
    align="center"
      label="操作">
      <template #default="scope">
        <el-button type="text" size="small">已读</el-button>
        <el-button @click="handleClick(scope.row)" type="text" size="small">处理</el-button>
        <el-popover
          placement="top"
          :visible="scope.row.showDel"
        >
          <p>确认删除这条友链数据吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="cancalDel(scope.row)">取消</el-button>
            <el-button type="primary" size="mini" @click="delReport(scope.row)">确定</el-button>
          </div>
          <template #reference>
            <el-button type="text" size="small" @click="showDel(scope.row)">删除</el-button>
          </template>
        </el-popover>
      </template>
    </el-table-column>
  </el-table>
</template>
 
<script>
export default {
  name: 'ReportsManger',
  data(){
    return{
      reportsData:[],  //反馈数据
    }
  },
  methods:{
    // 获取反馈举报数据
    async getReportsData(){
      let {data} = await this.$axios.get("/admin/get/report")
      let d = data.data
      d.forEach(e=>{
        e.isShowDel = false
      })
      this.reportsData = d
    },
    // 改变消息的未读 已读 状态
    async handleClickRead(item){
      let {data} = await this.$axios.post("/admin/report/altHandle",{
        _id:item._id
      })
      if(data.code){
        return this.$message.error("网络异常，请稍后再试~")
      }
      this.$message.success(data.mes)
      this.getReportsData()
    },
    // 是否显示删除反馈消息
    showDel(item){
      item.showDel = !item.showDel
    },
    // 删除反馈消息
    async delReport(item){
      let {data} = await this.$axios.post("/admin/report/delReport",{
        _id:item._id
      })
      if(data.code) {
        return this.$message.error("网络异常，请稍后再试~")
      }
      item.showDel = false
      this.getReportsData()
      this.$message.success(data.mes)
    },
    // 取消删除反馈消息
    cancalDel(item){
      item.showDel = false
    }
  },
  created(){
    this.getReportsData()
  },
  computed:{
    // 未读消息
    noReadMes(){
      return `当前未读消息有 ${this.reportsData.filter(e=>e.ifHandle===false).length} 条`
    },
    // 已读消息
    readMes(){
      return `当前未读消息有 ${this.reportsData.filter(e=>e.ifHandle===true).length} 条`
    }
  }
}
</script>

<style scoped lang='less'>
</style>