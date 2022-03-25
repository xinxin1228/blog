<template>
   <el-table
    :data="contactData"
    height="350"
    border>
    <el-table-column
      align="center"
      label="Time">
      <template #default="scope">
        {{getDate(scope.row.date)}}
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      align="center"
      label="Name">
    </el-table-column>
    <el-table-column
      prop="email"
      align="center"
      label="Email">
    </el-table-column>
    <el-table-column
      prop="subject"
      align="center"
      label="subject">
    </el-table-column>
    <el-table-column
      prop="message"
      align="center"
      label="Message">
    </el-table-column>
    <el-table-column
      label="操作"
      align="center"
      width="170px"
      >
      <template  #default="scope">
        <el-switch
        v-model="scope.row.ifHandle"
        :disabled="scope.row.ifHandle"
        active-color="#13ce66"
        @change="change(scope.row)"
        inactive-color="#ff4949"
        inactive-text="已读"
      >
        </el-switch>
        <el-popover
          placement="top"
          :visible="scope.row.showDel"
        >
          <p>确认删除这条消息吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="cancalDel(scope.row)">取消</el-button>
            <el-button type="primary" size="mini" @click="delContact(scope.row)">确定</el-button>
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
  name: 'Contact',
  data(){
    return{
      contactData:[]
    }
  },
  methods:{
    // 获取contact数据
    async getContactData(){
      let {data} = await this.$axios.get("/contact/contact")
      if(data.code){
        return this.$message.error("服务器异常，请稍后再试~")
      }
      let d = data.data
      d.forEach(e=>{
        e.showDel = false
      })
      this.contactData = d
    },
    // 改变已读未读状态
    async change(item){
      let {data} = await this.$axios.post("/contact/altHandle",{
        _id:item._id
      })
      if(data.code) return
      this.$message.success(data.mes)
      this.getContactData()
    },
    // 显示是否删除
    showDel(item){
      item.showDel = !item.showDel
    },
    // 删除消息
    async delContact(item){
      let {data} = await this.$axios.post("/contact/delContact",{
        _id:item._id
      })
      item.showDel = false
      this.getContactData()
      if(data.code) return
      this.$message.success(data.mes)
    },
    // 取消删除
    cancalDel(item){
      item.showDel = false
    },
    // 计算时间
    getDate(num){
      let time = new Date(num)
      let year = time.getFullYear()
      let month = time.getMonth() +1
      let day = time.getDate()
      let h = time.getHours()
      let f = time.getMinutes()
      let s = time.getSeconds()
      month = (month<10?"0":"")+month
      day = (day<10?"0":"")+day
      h = (h<10?"0":"")+h
      f = (f<10?"0":"")+f
      s = (s<10?"0":"")+s
      return `${year}-${month}-${day} ${h}:${f}:${s}`
    },
  },
  created(){
    this.getContactData()
  },
}
</script>

<style scoped lang='less'>
</style>