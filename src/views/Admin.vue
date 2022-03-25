
<template>  
  <div id="admin">
    <article>
      <el-tabs v-model="activeName">
    <el-tab-pane label="发表文章" name="first">
      <AddArticle></AddArticle>
    </el-tab-pane>
    <el-tab-pane label="文章管理" name="second">
      <ArticleManger></ArticleManger>
    </el-tab-pane>
    <el-tab-pane label="添加友链" name="third">
      <AddLink></AddLink> 
    </el-tab-pane>
    <el-tab-pane label="友链管理" name="fourth">
      <LinkManger></LinkManger>
    </el-tab-pane>
    <el-tab-pane label="反馈管理" name="six">
      <ReportsManger></ReportsManger>
    </el-tab-pane>
    <el-tab-pane label="contact管理" name="ten">
      <ContactManger></ContactManger>
    </el-tab-pane>
    <el-tab-pane label="用户管理" name="sevent">
      <UserManger></UserManger>
    </el-tab-pane>
    <el-tab-pane label="添加项目" name="eight">
      <AddProject></AddProject>
    </el-tab-pane>
    <el-tab-pane label="项目管理" name="nice">
      <ProjectManger></ProjectManger>
    </el-tab-pane>

  </el-tabs>
    </article>
  </div>
</template>
 
<script>
import {mapState} from "vuex"
import AddLink from "../components/admin/AddLink.vue";
import LinkManger from "../components/admin/LinkManger";
import AddArticle from "../components/admin/AddArticle"
import AddProject from "../components/admin/AddProject"
import ProjectManger from "../components/admin/ProjectManger"
import ArticleManger from "../components/admin/ArticleManger"
import UserManger from "../components/admin/UserManger"
import ReportsManger from "../components/admin/ReportsManger"
import ContactManger from "../components/admin/ContactManger"
export default {
  name: 'Admin',
  components:{
    AddLink,
    LinkManger,
    AddArticle,
    AddProject,
    ProjectManger,
    ArticleManger,
    UserManger,
    ReportsManger,
    ContactManger
  },
  data(){
    return{
      activeName:"first"
    }
  },
  computed:{
    ...mapState(['userInfo'])
  },
  methods:{
    async userCheek(){
       let {data} = await this.$axios.post("/admin/check")
      if(!data.code) {
        this.$message.success(data.mes) 
        return 
      }
      this.$router.replace("/")
      this.$message.error(data.mes)
    }
  },
  watch:{
    userInfo(){
      this.userCheek()
    }
  },
  created(){
    this.userCheek()
  }
}
</script>

<style scoped lang='less'>
#admin{
  article{
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 15px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px;
    background-color: #fff;
    font-family: Quicksand;
    h2{
      margin-bottom: 15px;
      font-size: 20px;
      letter-spacing: 3px;
      line-height: 24px;
      border-left: 5px solid #73b899;
      text-indent: 10px;
      font-weight: bolder;
    }
  }
}
</style>