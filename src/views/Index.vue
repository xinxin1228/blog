<template>
  <div id="Index">
    <!-- Hello -->
    <article id="hello">
      <h2>HELLO!</h2>
      <p class="myself">你好！欢迎来到我的个人博客！我是一名正在努力的WEB前端工程师，热衷于研究JavaScript、TypeScript、NodeJS、Vue、Recat......在这里，我会不定时的发表一些不太成熟的技术文章，分享一些自己的学习经验。博客目前使用的是Vue+Nuxt+Element+Node+Express+MongoDB搭建的，欢迎大家前来给我留言哦！</p>
       <div class="info">
        <div class="info-left">
          <h3>personal information</h3>
          <ul>
            <li>
              <p class="dt">NICKNAME</p>
              <p class="dd">新新小朋友</p>
            </li>
            <li>
              <p class="dt">ADDRESS</p>
              <p class="dd">山西省大同市</p>
            </li>
            <li>
              <p class="dt">EMAIL</p>
              <p class="dd" style="color:#999">2719382032@qq.com</p>
            </li>
            <li>
              <p class="dt">GITHUB</p>
              <p class="dd"><a target="_blank" href="https://github.com/xinxin1228">https://github.com/xinxin1228</a></p>
            </li>
          </ul>
        </div>
        <div class="info-right">
          <h3>skills</h3>
          <ul>
            <li>
              <p class="lang">
                <span class="s1">HTML5 & CSS3</span>
                <span class="s2">90%</span>
              </p>
              <p class="level">
                <span style="width:90%;"></span>
              </p>
            </li>
            <li>
              <p class="lang">
                <span class="s1">JavaScript & TypeScript</span>
                <span class="s2">85%</span>
              </p>
              <p class="level">
                <span style="width:85%;"></span>
              </p>
            </li>
            <li>
              <p class="lang">
                <span class="s1">NodeJs</span>
                <span class="s2">80%</span>
              </p>
              <p class="level">
                <span style="width:80%;"></span>
              </p>
            </li>
            <li>
              <p class="lang">
                <span class="s1">Vue & React & 小程序</span>
                <span class="s2">75%</span>
              </p>
              <p class="level">
                <span style="width:75%;"></span>
              </p>
            </li>
            <li>
              <p class="lang">
                <span class="s1">Flutter</span>
                <span class="s2">60%</span>
              </p>
              <p class="level">
                <span style="width:60%;"></span>
              </p>
            </li>
            <li>
              <p class="lang">
                <span class="s1">Electron</span>
                <span class="s2">50%</span>
              </p>
              <p class="level">
                <span style="width:50%;"></span>
              </p>
            </li>
          </ul>
        </div>
    </div>
    </article>
    <!-- article -->
    <article id="article">
      <h2>ARTICLE</h2>
      <p class="myself">
        热门文章推荐。<router-link to="/article">更多文章</router-link>访问文章页&gt;.&lt;
      </p>
      <div class="content" v-if="hotArticle.length">
        <div class="article-left">
          <div class="arts">
            <img src="../assets/img/article/1.jpg" alt="">
            <p class="tit">{{hotArticle[0].title}}</p>
            <div class="cover">
              <router-link :to="`/article/${hotArticle[0]._id}`" target="_blank">
                <p>Title:{{hotArticle[0].title}}</p>
                <p>View More</p>
              </router-link>
            </div>
          </div>
          <div class="arts">
            <img src="../assets/img/article/3.jpg" alt="">
            <p class="tit">{{hotArticle[1]?hotArticle[1].title:hotArticle[0].title}}</p>
            <div class="cover">
              <router-link :to="`/article/${hotArticle[1]?hotArticle[1]._id:hotArticle[0]._id}`" target="_blank">
                <p>Title:{{hotArticle[1]?hotArticle[1].title:hotArticle[0].title}}</p>
                <p>View More</p>
              </router-link>
            </div>
          </div>
        </div>
        <div class="article-right">
          <div class="arts">
            <img src="../assets/img/article/2.jpg" alt="">
            <p class="tit">{{hotArticle[2]?hotArticle[2].title:hotArticle[0]}}</p>
            <div class="cover">
              <router-link :to="`/article/${hotArticle[2]?hotArticle[2]._id:hotArticle[0]._id}`" target="_blank">
                <p>Title:{{hotArticle[2]?hotArticle[2].title:hotArticle[0].titlr}}</p>
                <p>View More</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </article>
    <!-- 往期项目 -->
    <article class="projects">
      <h2>PREVIOUS PROJECTS</h2>
      <p class="myself"> 以下项目仅为我个人项目实战中一些具有里程碑性的项目,更多个人项目以及团队合作项目请访问<a href="https://github.com/xinxin1228" target="_blank">GitHub</a></p>
      <ul>
        <li v-for="item in projectData" :key="item._id">
          <div class="left">
            <p class="time">{{item.time}}</p>
          </div>
          <div class="right">
            <h3>{{item.title}}</h3>
            <p class="img">
              <img :src=item.icon alt="">
            </p>
            <p class="company">
              skill：<span class="span">{{item.skill}}</span>
            </p>
            <p class="content">
              {{item.des}}
            </p>
          </div>
        </li>
      </ul> 
    </article>
    <!-- contact -->
    <article class="contact" id="contanct">
      <h2>CONTACT ME</h2>
      <p class="myself">有任何问题请联系我吧，收到消息后会给您回复邮件的哦♪(^∇^*)</p>
      <el-form
        :model="contactForm"
        status-icon
        :rules="rules"
        ref="contactForm"
        label-position="top"
      >
        <el-form-item label="Your Name" prop="name">
          <el-input v-model="contactForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Your Email" prop="email">
          <el-input v-model="contactForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Subject"  prop="subject">
          <el-input v-model.number="contactForm.subject"></el-input>
        </el-form-item>
        <el-form-item label="Your Message" prop="message">
          <el-input v-model="contactForm.message" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">Send</el-button>
        </el-form-item>
      </el-form>
    </article>
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {
    
  },
  data() {
    return {
      // 往期项目
      projectData:[],
      //表单数据
      contactForm: {
        name: "",
        email: "",
        subject: "",
        message: ""
      },
      //表单规则
      rules: {
        name: [
          {required: true, trigger: "blur"}
        ],
        email: [
          {type: "email", required: true,message: '请输入正确的邮箱地址', trigger: "blur"}
        ],
        message: [
          {required: true, trigger: "blur"}
        ],
        subject:[
          {trigger: "blur"}
        ]
      },
      hotArticle:[]
    }
  },
  async created(){
    this.getHotArticleData()
    this.getProjectData()
  },
  methods: {
    //Contact me的提交
    submit() {
      this.$refs.contactForm.validate(async v=>{
        if (v){
          let {data} = await this.$axios.post("/contact/addContact",{
            data:this.contactForm
          })
          if(data.code){
            return this.$message.error("网络异常，请稍后再试~")
          }
          this.$message.success(data.mes)
          this.$refs.contactForm.resetFields()
        }else{
          return false
        }
      })
    },
    // 获取往期项目数据
    async getProjectData(){
      let {data} = await this.$axios.get("/admin/get/projectList")
      this.projectData = data.data
    },
    // 获取热门文章
    async getHotArticleData(){
      let {data} = await this.$axios.get("/admin/get/hotArticle")
    this.hotArticle = data.data
    }
  }
}
</script>

<style scoped lang='less'>
#Index{
  width: 100%;
  article{
    background-color: #FFF;
    padding: 15px 15px 30px;
    margin-bottom: 15px;
    box-shadow: 0 0 4px #fff;
    h2{
      margin-bottom: 15px;
      font-size: 30px;
      letter-spacing: 3px;
      padding-top: 10px;
      font-family: "Quicksand";
      font-weight:bold;
    }
    p.myself{
      padding-bottom: 20px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 20px;
      text-indent: 2em;
      color: #444;
      font-size: 14px;
      letter-spacing: 4px;
      line-height: 30px;
      font-family:"Quicksand";
      a{
        color: #444;
      }
    }
    .info{
      display: flex;
      h3{
        margin-bottom: 30px;
        font-weight: 400;
        font-size: 22px;
        color: #666;
        font-family:"Quicksand";
      }
      .info-left{
        flex: 1;
        display: flex;
        flex-direction: column;
        ul{
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          li{
            display: flex;
            .dt{
              width: 40%;
              font-weight: bold;
            }
            .dd{
              flex: 1;
              a{
                text-decoration: none;
                color: #999;
              }
            }
          }
        }
      }
      .info-right{
        flex: 1;
        display: flex;
        flex-direction: column;
        user-select: none;
        ul{
          li{
            margin-bottom: 20px;
            &:last-child{
              margin-bottom: 0;
            }
            .lang{
              display: flex;
              justify-content: space-between;
              letter-spacing: 2px;
              .s1{
                font-weight: bold;
              }
              .s2{
                font-size: 12px;
                font-weight: bold;
                color: #999;
              }
            }
            .level{
              width: 100%;
              height: 5px;
              margin-top: 5px;
              background-color: #ececec;
              span{
                display: block;
                height: 100%;
                background-color: #bfe2e6;
              }
            }
          }
        }
      }
    }
    
  }
  article#article{
    .content{
      display: flex;
      .article-left{
        margin-right: 1px;
        flex: 1;
      }
      .article-right{
        margin-left: 1px;
        flex: 1;
      }
      .arts{
        width: 100%;
        overflow: hidden;
        position: relative;
        &:nth-child(2){
          margin-top: 2px;
        }
        img{
          width: 100%;
          display: block;
        }
        .tit{
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30px;
          background-color: rgba(0,0,0,.1);
          font-weight: 700;
          line-height: 30px;
          color: #fff;
          text-align: center;
          transition: bottom .3s;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-family: Quicksand;
        }
        .cover{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          a{
            display: block;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.5);
            opacity: 0;
            transition: opacity .3s;
            p{
              position: absolute;
              font-family: Quicksand;
              font-weight: bold;
              transition: .3s;
            }
            p:nth-child(1){
              top: 20%;
              width: 100%;
              text-align: center;
              color: #fff;
              font-size: 22px;
              text-transform: uppercase;
            }
            p:last-child{
              left: 50%;
              bottom: 20%;
              width: 30%;
              height: 32px;
              border-radius: 16px;
              text-align: center;
              line-height: 32px;
              transform: translateX(-50%);
              color: #000;
              background-color: #bfe2e6;
            }
          }
        }
        &:hover{
          .tit{
              bottom: -30px;
            }
          .cover a{
            
            opacity: 1;
            p:nth-child(1){
              top: 32%;
            }
            p:last-child{
             bottom: 32%;
            }
          }
        }
      }
    }
  }
  article.projects{
    font-family: Quicksand;
    ul{
      margin-top: 40px;
      li{
        display: flex;
        &:last-child{
          .right{
            border-left: 2px solid transparent;
          }
        }
        .left{
          width: 200px;
          .time{
            position: relative;
            top: -12px;
            width: 160px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-weight: 700;
            background-color: #bfe2e6;
            &::after{
              position: absolute;
              top: 0;
              right: -30px;
              content: "";
              width: 0;
              height: 0;
              border: 15px solid transparent;
              border-left-color: #bfe2e6;
            }
          }
        }
        .right{
          box-sizing: border-box;
          flex: 1;
          padding-left: 20px;
          padding-right: 40px;
          padding-bottom: 40px;
          border-left: 2px solid #bfe2e6;
          h3{
            position: relative;
            margin-bottom: 20px;
            margin-top: -10px;
            line-height: 25px;
            font-size: 20px;
            &::before{
              position: absolute;
              content: "";
              top: 10px;
              left: -23px;
              width: 4px;
              height: 4px;
              background-color: #000;
            }
          }
          .img{
            margin-bottom: 20px;
            width: 50px;
            height: 50px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .company{
            color: #000;
            margin-bottom: 20px;
            font-weight: bold;
            font-size: 17px;
            .span{
              color: #bd4147;
              background-color: rgba(27, 31, 35, 0.05);
              font-weight: 700;
            }
          }
          .content{
            color: #777;
            letter-spacing: 1px;
            font-size: 16px;
            line-height: 24px;
          }
        }
      }
    }
  }
  article.contact {
    .el-form {
      padding: 0 40px;
    }
    .el-button{
      display: block;
      width: 100px;
      height: 40px;
      margin-top: 35px;
      border: 0;
      border-radius: 20px;
      box-shadow: 0 0 0 #bbb;
      background-color: #bfe2e6;
      font-weight: 700;
      font-size: 16px;
      letter-spacing: 2px;
      font-family: Quicksand,"sans-serif";
      color: #000;
      outline: 0;
      cursor: pointer;
      transition: box-shadow .3s;
      &:hover{
        box-shadow: 0 3px 5px #bbb;
      }
    }
  }
}

</style>
