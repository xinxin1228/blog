<template>
  <el-alert
      :title="personNum"
      effect="dark"
      center
      type="success"
      :closable="false">
    </el-alert>
  <el-table
    :data="userData"
    height="550"
    border
   >
    <el-table-column
      prop="photo"
      align="center"
      label="头像">
    <!-- 表单里面找自己的方法 -->
      <template #default="scope">
        <div class="demo-image__preview">
      <el-image
        style="width: 100px; height: 100px"
        :src="`${baseURL}${scope.row.photo}`"
        :preview-src-list="[`${baseURL}${scope.row.photo}`]">
      </el-image>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="user"
      align="center"
      label="用户名">
    </el-table-column>
    <el-table-column
      prop="pass"
      align="center"
      label="密码">
    </el-table-column>
  </el-table>
</template>
 
<script>
export default {
  name: 'UserManger',
  data(){
    return{
      userData:[],
    }
  },
  methods:{
    // 请求用户信息
    async getUserData(){
      let {data} = await this.$axios.get("/admin/get/user")
      this.userData = data.data
    }
  },
  computed:{
    personNum(){
      return `当前博客注册用户有 ${this.userData.length} 人`
    }
  },
  created(){
    this.getUserData()
  }
}
</script>

<style scoped lang='less'>
</style>