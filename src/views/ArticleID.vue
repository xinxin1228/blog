<template>
  <div id="ArticleID">
    <!-- 头部 -->
    <div class="header">
      <h1>{{shareTitle}}</h1>
      <div class="defauits">
        <p>发表时间：<span class="date">{{getDate(shartTime)}}</span></p>
        <p>浏览量：<span class="views">{{views}}</span></p>
      </div>
    </div>
    <!-- 文章内容 -->
    <article>
      <main id="mdToHTML"></main>
    </article>
    <!-- 信息 -->
    <div class="footer">
      <div class="left">
        <p v-if="prevArticle.length">
          <span class="tap">上一篇</span>
          <span class="articleNav"><a :title="prevArticle[0].title" :href="`/article/${prevArticle[0]._id}`">{{prevArticle[0].title}}</a></span>
        </p>
        <p v-if="nextArticle.length">
          <span class="tap">下一篇</span>
          <span class="articleNav"><a :title="nextArticle[0].title" :href="`/article/${nextArticle[0]._id}`">{{nextArticle[0].title}}</a></span>
        </p>
      </div>
      <div class="right">
         <!-- 二维码 -->
         <div id="qrcode"></div>
         <span class="share">扫描此码分享本篇文章内容</span>
        <div class="shareInfo">
          <p>分享到:</p>
          <div class="shareIcon">
            <img src="../assets/img/qq.jpg" alt="" @click="shareQQ">
            <img src="../assets/img/xlwb.jpg" alt="" @click="shareXl">
          </div>
        </div>

      </div>
    </div>
    <!-- 用户评论 -->
    <div class="comment">
      <!-- 发表留言 -->
      <el-input
        type="textarea"
        :rows="2"
        placeholder="在这里输入你对这篇文章的看法哦~"
        maxlength="100"
        show-word-limit
        v-model="textarea">
      </el-input>
      <div class="btn">
        <!-- 表情 -->
        <div class="left">
          <i class="iconfont icon-biaoqing"  @click.stop="showEmoji"></i>
          <div class="emoji" v-if="ifShowEmoji">
            <ul>
              <li v-for="item in emoji" :key="item" @click.stop="clickEmoji(item)">
                {{item}}
              </li>
            </ul>
          </div>
        </div>
        <!-- 发表留言 -->
        <el-button type="primary" size="mini" @click="submit">发表</el-button>
      </div>
      <!-- 没有评论时的提示 -->
      <el-empty v-if="!articleComment.length" description="亲，快来评论哦~"></el-empty>
      <!-- 留言展示 -->
      <article  v-else class="a2">
        <ul>
          <li v-for="item in articleComment" :key="item._id">
            <div class="parent">
              <div class="left" :style="{backgroundImage:`url(${baseURL}${item.author.photo})`}"></div>
              <div class="right">
                <div class="name-time">
                  <span>{{item.author.user}}</span>
                  <span>{{getDate(item.date)}}</span>
                </div>
                <div class="message">
                  {{item.text}}
                </div>
              </div>
            </div>
            <!-- <div class="child" >  
              <div class="left" 
              style="{backgroundImage:url('../assets/img/me.jpg')}"
              ></div>
              <div class="right">
                <div class="name-time">
                  <span>子留言名字</span>
                  <span>你好呀</span>
                </div>
                <div class="message">
                  <span>@ 新新小朋友</span>
                  <span>你好呀</span>
                </div>
                <div class="like-reply">
                  <i class="iconfont icon-iconfontlike isLike"
                  ></i>
                  <span>3</span>
                  <i class="iconfont icon-pinglun"></i>
              </div>
              </div>
              <div class="detailsMes">
                <i class="iconfont icon-xiangqing"
                ></i>
                <div class="shows" >
                  <div class="del">
                    <div class="txt">是否删除该回复？</div>
                    <el-button type="primary" size="mini">确认</el-button>
                    <el-button size="mini" >取消</el-button>
                  </div>
                  <p >删除</p>
                  <p >举报</p>
                </div>
              </div>
            </div>
            <div class="replyInput"
              :class="{
                show:item.ifShowReply
              }"
            >
              <el-input
                size="mini"
                :placeholder="`@ ${item.replayUser.user}`"
                v-model="item.replyTxt"
              ></el-input>
              <el-button 
              type="primary" 
              size="mini" 
              @click="replySubmit(item,index)"
              >提交</el-button>
            </div> -->
          </li>
        </ul>
      </article>
    </div>
  </div>
</template>

<script>
import QRCode  from "qrcodejs2"
import {mapState} from "vuex"
export default {
  name: "ArticleID",
  data(){
    return{
      // 文章的网址
      shareLink:window.location.href,
      // 文章的标题
      shareTitle:"",
      // 文章分享时的内容
      shareContent:"",
      // 文章发表时间,
      shartTime:"",
      // 浏览量
      views:"",
      // 文章分享时的图片
      shareImg:"",
      // 是否显示表情
      ifShowEmoji:false,
      // 文本框内容
      textarea:"",
      // 表情
      emoji: [
        "😃", "😁", "😂", "😊", "🙃", "🥰", "😘", "🤭", "🤔", "😏",
        "😵", "😟", "🙁", "😳", "😰", "😭", "😖", "😡", "😠", "😈",
        "🤡", "☠️", "👻", "🙈", "🙉", "❤️", "💖", "💢", "💣", "💤",
        "👋", "👍", "👌", "🤞", "🤟", "🤙", "👊", "🖕", "🤝", "🙏",
        "🙅", "🙅‍♂️", "👨‍✈️", "👩‍✈️", "👷", "👷‍♀️", "🤦", "🤦‍♂️", "👴", "🧓",
        "🐴", "🐮", "🐖", "🐑", "🐓", "🦚", "🐲", "🐳", "🐟", "🐌",
      ],
      // 当前文章是是否无评论 默认为true
      ifHavecomments:false,
      // 上一篇文章
      prevArticle:[],
      // 下一篇文章
      nextArticle:[],
      // 文章的评论
      articleComment:[]
    }
  },
  methods:{
    // 生成页面链接
    qrcode(){ 
      let qrcode = new QRCode('qrcode', { // eslint-disable-line no-unused-vars
        width: 70,
        height: 70,        // 高度
        text:  this.shareLink,   // 二维码内容
        // render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        background: '#fff',   // 背景色
        foreground: '#ff0'    // 前景色
      })
    },
    // 跳转到QQ空间
    shareQQ(){
      console.log(this.shareLink,this.baseURL+this.shareImg,this.shareTitle,this.shareContent)
      window.open(`http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodeURIComponent(this.shareLink)}&pics=${encodeURIComponent(this.baseURL+this.shareImg)}&title=${encodeURIComponent(this.shareTitle)}&summary=${encodeURIComponent(this.shareContent)}`)
    },
    // 跳转到新浪
    shareXl(){
      window.open(`http://service.weibo.com/share/share.php?appkey=583395093&title=${this.shareTitle}&url=${encodeURIComponent(this.shareLink)}&source=bshare&retcode=0&ralateUid=`)
    },
    // 显示表情
    showEmoji(){
      this.ifShowEmoji = !this.ifShowEmoji 
    },
     // 选择表情
    clickEmoji(item){
      if(this.textarea.length>98)return
      this.textarea += item
    },
    // 获取文章评论
    async getComment(){
      let {data} = await this.$axios.get("/admin/get/articleID",{
        params:{
          id:this.$route.params.id
        }
      })
      let d = data.data.comment.reverse()
      d.forEach(e=>{
        e.ifShowMore = false
      })
      this.articleComment = d
      console.log(this.articleComment)
    },
    // 发表评论
    async submit(){
      // 是否登录
      if(!this.userInfo.user){
        return this.$message.warning("请登录后再来留言哦~")
      }
      // 内容是否为空
      let val = this.textarea.trim()
      if(!val){
        return this.$message.warning("留言内容不能为空哦~")
      }
      // 发表评论
      let {data} = await this.$axios.post("/article/comment",{
        val, // 评论内容
        id:this.$route.params.id,  // 文章的id

      })
      if(data.code){
        return this.$message.error(data.mes)
      }
      this.$message.success(data.mes)
      console.log(data)
      this.getComment()  // 更新评论
     this.textarea = "" // 清空输入内容
    },
    // 发表评论下面的回复
    async replySubmit(item,CIndex){
      // 判断是否登录
      if(!this.userInfo.user){
        return this.$message.warning("登陆后再来评论哦~")
      };
      let text = item.replyTxt.trim()
      // 验证格式
      if(!text){
        return this.$message.warning("内容不能为空哦~")
      }
      if(text.length>100){
        return this.$message.warning("内容长度溢出啦~")
      }
      let {data} = await this.$axios.post("/article/comChildrenSubmit",{
        data:{
          text:item.replyTxt,
          replayUser:item.replayUser._id,
          id:item._id,   
          CIndex 
        }
      })
      if(data.code) {
        return this.$message.warning(data.mes)
      }
      this.$message.success(data.mes)
      this.getMes()
    },
    // 评论点赞
    async parentLikeClick(id,CIndex){
      // 判断用户是否登录
      if(!this.userInfo.user){
        return this.$message.warning("登陆后再来点赞哦~")
      }
      // 获取文章id
      let artID = this.$route.params.id
      // 点赞
      let {data} = await this.$axios.post("/article/parentLick",{
        data:{
          // 点赞评论的id
          id,
          // 文章的id
          artID,
          // 点赞的序号
          CIndex
        }
      })
      if(data.code){
        return this.$message.warning(data.mes)
      }
      this.getComment()
    },
    // 评论下的回复
    replyClick(item){
      //判断用户是否登录
      if (!this.userInfo.user) {
        return this.$message.warning("登录后再来回复哦~")
      }
      // 展开回复框
      if(item.author._id !== item.replayUser._id){
        item.ifShowReply = true
      }else{
        item.ifShowReply = !item.ifShowReply
      }
      // 改变@后面的名字
      item.replayUser = item.author
    },
    // 展开父留言更多操作
    userMoreOperations(item){
      item.ifShowMore = !item.ifShowMore
    },
    // 转化时间
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
    }

  },
  async mounted() {
    // 关闭表情
    document.addEventListener("click",()=>{
       // 点击空白处隐藏表情
      this.ifShowEmoji = false
    })    
  },
  async created(){
    // 获取动态路由
    let id = this.$route.params.id
    let {data} = await this.$axios.get("/admin/get/articleID",{
      params:{
        id
      }
    })
    if(data.code){
      this.$message({
        type:"error",
        message:data.mes,
        duration:1000,
        onClose:()=>{
          this.$router.replace("/article")
        }
      })
      return
    }
    // 上一篇文章
    this.prevArticle = data.prevArticle
    // 下一篇文章
    this.nextArticle = data.nextArticle
    // 文章的标题
    this.shareTitle = data.data.title
    // 文章的时间
    this.shartTime = data.data.date
    // 文章的浏览量
    this.views = data.data.pv
    // 文章分享的内容
    this.shareContent = data.data.des
    // 文章分享时的图片
    this.shareImg = data.data.cover

    this.getComment()
     // 加载md
    let res = await this.$axios.get(`${data.data.md}`)
    editormd.markdownToHTML("mdToHTML", {
      markdown: res.data,
      emoji: true
    });

     // 加载二维码
    this.$nextTick (function () {
      this.qrcode();
    })
  
    // 修改网页标题
    document.title = this.shareTitle
  },
  computed:{
    ...mapState(['userInfo'])
  }
}
</script>

<style lang="less" scoped>
#ArticleID {
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 15px;
  box-shadow: 0 0 4px #ddd;
  padding: 25px 20px;
  background-color: #fff;
  font-family: Quicksand;
  .header{
    border-bottom: 1px solid rgb(223, 222, 222);
    h1{
      font-size: 25px;
      color: #333;
      font-weight: bold;
    }
    .defauits{
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: #868686;
      display: flex;
      margin: 10px 0;
      padding-left: 10px;
      p{
        .date{
          margin-right: 20px;
        }
      }
    }
  }
  #mdToHTML {
    // margin-top: 30px;
    box-sizing: border-box;
  }
  .footer{
    width: 100%;
    height: 50px;
    border-top:1px solid rgb(223, 222, 222);
    margin-top: 10px;
    display: flex;
    padding: 20px 0;
    justify-content: space-between;
    .left{
      width: 262px;
      height: 40px;
      margin-top: 20px;
      p{
        line-height: 20px;
        font-size: 14px;
        color: #666666;
        display: flex;
        &:nth-child(1){
          margin-bottom: 20px;
        }
        .tap{
          margin-right: 20px;
        }
        .articleNav{
          width: 200px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        a{
          text-decoration: none;
          color: #666666;
          &:hover{
            text-decoration: underline;
          }
        }
      }
    }
    .right{
      position: relative;
      width: 300px;
      display: flex;
      span.share{
        font-size: 12px;
        position: absolute;
        bottom: -40px;
        left: -30px;
        color: #666666;
      }
      .shareInfo{
        height: 50px;
        margin-top: 10px;
        line-height: 50px;
        font-size: 14px;
        margin-left: 30px;
        color: #666666;
        display: flex;
        .shareIcon{
          img{
            margin-top: 5px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            margin-left: 20px;
            &:hover{
              box-shadow: 1px 1px 10px #868686;
            }
          }
        }
      }
    }
  }
  .comment{
    width: 100%;
    margin-top: 50px;
    .btn{
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      margin-top: 10px;
      i{
        font-size: 20px;
        cursor: pointer;
      }
      .left{
        position: relative;
      }
      .emoji{
        position: absolute;
        top: 30px;
        background-color: #fff;
        padding: 8px;
        box-shadow: 0 0 3px #aaa;
        -webkit-user-select: none;
        user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        &::before{
          content: "";
          position: absolute;
          z-index: 3;
          top: -10px;
          left: 5px;
          width: 0;
          height: 0;
          border: 5px solid transparent;
          border-bottom-color: #ccc;
        }
        ul{
          display: flex;
          width: 250px;
          flex-wrap: wrap;
          border-left: 1px solid #e5e5e5;
          border-bottom: 1px solid #e5e5e5;
          li{
            box-sizing: border-box;
            float: left;
            width: 25px;
            height: 25px;
            border-right: 1px solid #e5e5e5;
            border-top: 1px solid #e5e5e5;
            font-size: 18px;
            line-height: 25px;
            cursor: pointer;
          }
        }
      }
    }
    article.a2{
    ul{
      li{
        padding-bottom:5px;
        margin-bottom: 10px;
        border-bottom: 1px solid #ddd;
        font-size: 12px;
        font-family: "微软雅黑";
        .parent,.child{
          display: flex;
          .left{
            overflow: hidden;
            width: 40px; 
            height: 40px;
            margin-right: 15px;
            border-radius: 50%;
            background-size: cover;
          }
          .right{
            flex:1;
            .name-time{
              font-size: 12px;
              margin-bottom: 3px;
              span:nth-child(1){
                color: #73b899;
              }
              span:nth-child(2){
                color: #aaa;
                margin-left: 10px;
              }
            }
            .message{
              color: #666;
              letter-spacing: 2px;
              margin-bottom: 3px;
              margin: 10px 0;
              word-break: break-word;
              span{
                &:nth-child(1){
                  color: slateblue;
                  margin-right: 5px; 
                }
              }
            }
            .like-reply {
              user-select: none;
              margin-top: 7px 3px;
              i {
                cursor: pointer;
                font-size: 14px;
                color: #aaa;
                margin-right: 4px;
              }
              i.isLike {
                color: #f30606;
              }
              span {
                display: inline-block;
                width: 43px;
                font-size: 12px;
                color: #aaa;
              }
            }
          }
          .detailsMes{
            position: relative;
            margin-top:20px;
            i{
              color: #aaa;
              cursor: pointer;
            }
            .shows{
              position: absolute;
              width: 70px;
              padding:0;
              margin:0;
              text-align: center;
              height: 30px;
              background-color: #fff;
              box-shadow: 1px 1px 4px #aaa;
              top: -40px;
              left: -30px;
              user-select: none;
              padding:3px 5px;
              .del{
                width: 200px;
                height: 70px;
                position: absolute;
                padding: 10px;
                left:-80px;
                top:-52px;
                background-color: #fff;
                box-shadow: 1px 3px 3px #99A2AA;
                border-radius: 4px;
                .txt{
                  width: 100%;
                  line-height: 20px;
                  margin-bottom: 10px;
                }
              }
              p{
                text-indent: 0em;
                color: #000;
                cursor: pointer;
                &:hover{
                  background-color: #E5E9EF;
                }
              }
            }
          }
        }
        .child {
          margin-left: 55px;
          margin-top: 10px;
          .detailsMes{
            display: none;
          }
          &:hover{
            .detailsMes{
              display: block;
            }
          }
        }
        .replyInput{
          box-sizing: border-box;
          overflow: hidden;
          width: 100%;
          height: 0;
          padding-left: 55px;
          transition: height .3s;
          margin-top: 10px;
          &.show{
            height: 60px;
          }
          .el-button{
            display: block;
            padding: 4px 9px !important;
            float: right;
            margin-top: 5px;
          }
        }
      }
    }
    }
  }
  
}
</style>














