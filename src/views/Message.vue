<template>
  <div id="message">
    <article>
      <h2>留言板</h2>
      <p>欢迎小可爱们留言哦~ 你的留言或许是我前进的动力，但不要打广告哦\(^o^)/~</p>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="在这里输入内容哦~"
        maxlength="100"
        show-word-limit
        v-model="textarea">
      </el-input>
      <!-- 发表留言 -->
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
      <!-- 留言展示 -->
      <article class="a2">
        <ul>
          <li v-for="item in mesList" :key="item._id">
            <div class="parent">
              <div class="left" :style="{backgroundImage:`url(${baseURL}${item.author.photo})`}"></div>
              <div class="right">
                <div class="name-time">
                  <span>{{item.author.user}}</span>
                  <span>{{formatDate(item.date)}}</span>
                </div>
                <div class="message">
                  {{item.text}}
                </div>
                <div class="like-reply">
                  <i 
                  class="iconfont icon-iconfontlike"
                  :class="{
                    isLike: userInfo.user && item.likes.includes(userInfo._id)
                  }"
                   @click="parentLikeClick(item._id)"></i>
                  <span>{{item.likes.length}}</span>
                  <i class="iconfont icon-pinglun" @click="replyClick(item)"></i>
              </div>
              </div>
              <div class="detailsMes">
                <i class="iconfont icon-xiangqing" @click.stop="userMoreOperations(item)"
                ></i>
                <div class="shows" v-if="item.ifShowMore">
                  <div class="del" v-if="ifShowfeeDelete">
                    <div class="txt">删除评论后，评论下所有回复都会被删除是否继续？</div>
                    <el-button type="primary" size="mini" @click="userConfrim(item)">确认</el-button>
                    <el-button size="mini" @click="userCancel(item)">取消</el-button>
                  </div>
                  <p v-if="userInfo._id && item.myselfMes===userInfo._id" @click="handleDelete(item)">删除</p>
                  <p v-else @click.stop="userReport(item)">举报</p>
                </div>
              </div>
            </div>
            <div class="child" v-for="(childItem,index) in item.children" :key="childItem._id">  
              <div class="left" 
              :style="{backgroundImage:`url(${baseURL}${childItem.author.photo})`}"
              ></div>
              <div class="right">
                <div class="name-time">
                  <span>{{childItem.author.user}}</span>
                  <span>{{formatDate(childItem.date)}}</span>
                </div>
                <div class="message">
                  <span>@{{childItem.replayUser.user}}</span>
                  <span>{{childItem.text}}</span>
                </div>
                <div class="like-reply">
                  <i class="iconfont icon-iconfontlike"
                  :class="{
                    isLike:userInfo._id && childItem.likes.includes(userInfo._id)
                  }"
                  @click="childLikeClick(item._id,childItem._id,index)"
                  ></i>
                  <span>{{childItem.likes.length}}</span>
                  <i class="iconfont icon-pinglun" @click="childReplyChilck(item,childItem)"></i>
              </div>
              </div>
              <div class="detailsMes">
                <i class="iconfont icon-xiangqing" @click.stop="userMoreChilrenOperations(item)"
                ></i>
                <div class="shows" v-if="item.ifShowChildrenMore">
                  <div class="del" v-if="isShowChildrenDel">
                    <div class="txt">是否删除该回复？</div>
                    <el-button type="primary" size="mini" @click="userChildrenConfrim(childItem,item._id,index)">确认</el-button>
                    <el-button size="mini" @click="userCancel(item,childItem)">取消</el-button>
                  </div>
                  <p v-if="userInfo._id && childItem.author._id===userInfo._id" @click="handleDelete(childItem,item._id)">删除</p>
                  <p v-else @click.stop="userChildrenReport(childItem,item._id)">举报</p>
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
              @click="replySubmit(item)"
              >提交</el-button>
            </div>
          </li>
        </ul>
      </article>
    </article>
  </div>
  <!-- 举报反馈 -->
  <div class="feedback" v-if="ifShowfeedback">
    <div class="feedConet" @click.stop>
      <div class="title">请选择举报理由</div>
      <div class="content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <p class="type">违法法律规则</p>
          <div class="config">
            <el-form-item>
              <el-checkbox-group v-model="ruleForm.type" prop="type">
                <el-checkbox label="赌博诈骗"></el-checkbox>
                <el-checkbox label="违法违规"></el-checkbox>
                <el-checkbox label="少儿不宜" ></el-checkbox>
                <el-checkbox label="低俗不堪"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
          <p class="type">侵犯个人权益</p>
          <div class="config">
            <el-form-item>
              <el-radio-group v-model="ruleForm.resource" prop="resource">
                <el-radio label="人身攻击"></el-radio>
                <el-radio label="隐私侵犯"></el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <p class="type">有害社区环境</p>
          <div class="config">
            <el-form-item>
              <el-radio-group v-model="ruleForm.resource" prop="resource">
                <el-radio label="垃圾广告"></el-radio>
                <el-radio label="引战"></el-radio>
                <el-radio label="刷屏"></el-radio>
                <el-radio label="青少年不良信息"></el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <el-form-item class="buttons">
            <el-button class="left" type="primary" @click.stop="submitForm">确认</el-button>
            <el-button @click.stop="resetForm">取消</el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>
  </div>
</template>
 
<script>
import {mapState} from "vuex"
export default {
  name: 'Message',
  data(){
    return{
      // 留言输入框内容
      textarea:"",
      // 是否显示表情
      ifShowEmoji:false,
      // 表情
      emoji: [
        "😃", "😁", "😂", "😊", "🙃", "🥰", "😘", "🤭", "🤔", "😏",
        "😵", "😟", "🙁", "😳", "😰", "😭", "😖", "😡", "😠", "😈",
        "🤡", "☠️", "👻", "🙈", "🙉", "❤️", "💖", "💢", "💣", "💤",
        "👋", "👍", "👌", "🤞", "🤟", "🤙", "👊", "🖕", "🤝", "🙏",
        "🙅", "🙅‍♂️", "👨‍✈️", "👩‍✈️", "👷", "👷‍♀️", "🤦", "🤦‍♂️", "👴", "🧓",
        "🐴", "🐮", "🐖", "🐑", "🐓", "🦚", "🐲", "🐳", "🐟", "🐌",
      ],
      // 留言列表
      mesList:[],
      // 是否显示举报
      ifShowfeedback:false,
      // 是否显示留言删除
      isShowDel:false,
       // 是否显示子留言删除
      isShowChildrenDel:false,
      // 显示是否删除留言
      ifShowfeeDelete:false,
      // 举报内容
      reportContent:"",
      // 是父留言举报还是子留言举报  默认父留言
      ifPersonOrChilrenRules:true,
      // 是父留言删除还是子留言删除  默认夫留言
      ifDeleteMessage:true,
      // 举报子留言对应父留言的id
      personMesRotID:"",
      // 举报
      ruleForm: {
        type: [],
        resource: '垃圾广告',
      },
      rules: {
          resource: [
            { trigger: 'change',required:true }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个', trigger: 'change' }
          ],
        }
    }
  },
  computed:{
    ...mapState(["userInfo"])
  },
  methods:{
    // 用户举报留言
    userReport(item){
       // 是否登录
      if(!this.userInfo.user){
        return this.$message.warning("请先登录哦~")
      }
      // 举报类型为父留言举报
      this.ifPersonOrChilrenRules = true
      // 存入举报内容
      this.reportContent = item
      // 打开举报界面
      this.ifShowfeedback = true
      this.$message("点击空白处即可关闭")
      item.ifShowMore = false  //关闭功能选择

    },
    // 用户举报子留言
    userChildrenReport(item,id){
      if(!this.userInfo._id){
        return this.$message.warning("请先登录哦~")
      }
      // 举报类型为子留言举报
      this.ifPersonOrChilrenRules = false
      // 存入举报内容
      this.reportContent = item
      this.personMesRotID = id //存在子留言对应父留言的ID
      this.ifShowfeedback = true // 打开举报界面
      item.ifShowChildrenMore = false //关闭功能选择
    },
    // 用户操作显示删除留言内容
    handleDelete(item,childItem=false){
      // 如果没有点击子留言 默认显示父留言
      if(!childItem){
        // 显示删除父留言
        this.ifShowfeeDelete = true
      }else{
        // 显示示删除子留言
        this.isShowChildrenDel = true
      }
    },
    // 用户操作子留言删除
    async userChildrenConfrim(item,id,CIndex){
      // item 当前删除的子留言  id父留言的id
      // 验证用户是否登录
      if(!this.userInfo.user){
        return this.$message.warning("请先登录哦~")
      }
      // 父留言删除还是子留言删除 子留言
      this.ifDeleteMessage = false
      // item 当前删除的子留言  id父留言的id
      let {data} = await this.$axios.post("/mes/mesDeleteChildren",{
        pID:id, // 父留言id
        cID:item._id, //子留言id
        CIndex //子留言的序列
      }) 

      if(data.code){
        return this.$message.error(data.mes)
      }
       // 隐藏留言删除
      this.isShowChildrenDel = false
      item.ifShowChildrenMore = false //关闭子留言更多操作
      this.$message.success(data.mes)
      this.getMes()  // 刷新数据
    },
    // 用户选择删除留言
    async userConfrim(item){
      // 判断用户是否登录
      if(!this.userInfo.user){
        return this.$message.warning("请先登录哦~")
      }
      // 父留言删除还是子留言删除 父留言
      this.ifDeleteMessage = true
      let {data} = await this.$axios.post("/mes/mesDelete",{
          name:this.userInfo._id,
          message:item._id
      }) 
      this.ifShowfeeDelete = false
      this.$message.success("留言已删除")
      item.ifShowMore = false  //关闭功能选择

      if(data.code){
        return this.$message.error(data.mes)
      }
      this.$message.success(data.mes)
      this.getMes()  // 刷新数据
    },
    // 用户取消删除留言
    userCancel(item,childItem=false){
       // 如果没有点击子留言 默认显示父留言
       if(childItem){
        //  点击了子留言删除
        item.ifShowChildrenMore = false //关闭子留言更多操作
        this.isShowChildrenDel = false  //关闭子留言删除提示框
       }else{
        //  点击了父留言删除
        this.ifShowfeeDelete = false  //关闭父留言删除提示框
        item.ifShowMore = false  //关闭父留言功能选择
       }
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
    // 发表留言
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
      // 发表留言
     let {data} = await this.$axios.post("/mes/submit",{
       data:val
     })
     if(data.code){
       return this.$message.error(data.mes)
     }
     this.$message.success(data.mes)
     this.getMes()  // 更新留言
     this.textarea = "" // 清空输入内容
    },
    // 请求留言
    async getMes(){
      let {data} = await this.$axios.get("/mes/all") 
      let d = data.data
      d.forEach(item=>{
        item.ifShowReply = false // 用于控制回复框显不显示
        item.replyTxt = '' // 回复框内容绑定
        item.replayUser = item.author // 提示框文字内容
        item.ifShowMore = false //是否显示父留言更多操作
        item.ifShowChildrenMore = false //是否显示子留言更多操作
      })
      this.mesList = d
    },
    // 转化日期
    formatDate(data){
      let time = new Date(data)
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
    // 父留言点赞
    async parentLikeClick(id){
      // 判断用户是否登录
      if(!this.userInfo.user){
        return this.$message.warning("登陆后再来点赞哦~")
      }
      // 点赞
      let {data} = await this.$axios.post("/mes/parentLick",{
        data:{
          // 点赞评论的id
          id 
        }
      })
      if(data.code){
        return this.$message.warning(data.mes)
      }
      this.getMes()
    },
    // 回复留言评论
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
    // 发表评论
    async replySubmit(item){
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
      let {data} = await this.$axios.post("/mes/reply/submit",{
        data:{
          text:item.replyTxt,
          replayUser:item.replayUser._id,
          id:item._id    
        }
      })
      if(data.code) {
        return this.$message.warning(data.mes)
      }
      this.$message.success(data.mes)
      this.getMes()
    },
    // 子回复点赞
    async childLikeClick(pID,cID,cIndex){
      // 判断用户是否登录
      if(!this.userInfo.user) return this.$message.warning("登录后再来点赞哦~")
      // 发送请求
      let {data} = await this.$axios.post("/mes/childrenLick",{
        data:{
          pID,cID,cIndex
        }
      })
      if(data.code){
        return this.$message.warning(data.mes)
      }
      this.getMes()
    },
    // 子留言评论
    childReplyChilck(item,childItem){
      //判断用户是否登录
      if (!this.userInfo.user) {
        return this.$message.error("请先登录")
      }
      // 展开回复框
      if(childItem.author._id !== item.replayUser._id){
        item.ifShowReply = true
      }else{
        item.ifShowReply = !item.ifShowReply
      }
      // 改变提示
      item.replayUser = childItem.author
    },
    // 展开父留言更多操作
    userMoreOperations(item){
      item.ifShowMore = !item.ifShowMore
    },
    // 展开子留言更多操作
    userMoreChilrenOperations(item){
      item.ifShowChildrenMore = !item.ifShowChildrenMore
    },
    // 举报操作
    submitForm() {
      // 验证规则
      this.$refs.ruleForm.validate(async v => {
         // 是否登录
        if(!this.userInfo.user){
          return this.$message.warning("请先登录哦~")
        }
        if (v) {
          let data = null
          if(!this.ifPersonOrChilrenRules){
            // 子留言举报
            data = await this.$axios({
            method:"POST",
            url:"/mes/mesChildreport",
            data:{
              // 举报人id
              name:this.userInfo._id,
              // 举报类型
              conent:this.ruleForm,
              // 举报子留言id
              message:this.reportContent._id,
              // 子留言对应父留言的id
              pID:this.personMesRotID
              }
            })
          }else{
            // 留言举报
            data = await this.$axios({
            method:"POST",
            url:"/mes/mesreport",
            data:{
              name:this.userInfo._id,
              conent:this.ruleForm,
              message:this.reportContent._id
            }
          })
          }
          if(data.data.code){
            return this.$message({
              showClose: true,
              message: data.data.mes,
              type: 'warning'
            })
          }
          this.$message.success(data.data.mes)
          // 清空举报内容
          this.$refs.ruleForm.resetFields();
          // 隐藏举报内容
          this.ifShowfeedback = false
        } else {
          return false
        }
      })
    },
    resetForm() {
      // 关闭举报面板
      this.ifShowfeedback = false
    }

  },
  created(){
    // 获取留言
    this.getMes()
  },
  // dom操作
  mounted(){
    document.addEventListener("click",()=>{
       // 点击空白处隐藏表情
      this.ifShowEmoji = false
      // 点击空白处隐藏举报
      this.ifShowfeedback = false
    })
  }
}
</script>

<style scoped lang='less'>
#message{
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
    p{
      text-indent:2em;
      color:#444;
      font-size: 14px;
      letter-spacing: 4px;
      line-height: 30px;
      margin-bottom: 10px;
    }
    /deep/ textarea{
      font-family: "Pacifico";
      letter-spacing: 2px;
      height: 70px;
      font-size: 13px;
    }
    .btn{
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
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
.feedback{
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0,0,0,.5);
  left: 0;
  top: 0;
  z-index: 2000;
  .feedConet{
    width: 450px;
    height: 400px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding: 20px;
    padding-top: 10px;
    .title{
      width: 100%;
      height: 50px;
      text-align: center;
      font-size: 18px;
      letter-spacing: 1px;
      border-bottom: 1px solid #E5E9EF;
      line-height: 50px;
      margin-bottom: 10px;
    }
    .content{
      .type{
        color: #99A2AA;
        font-size: 14px;
        margin-top:10px;
      }
      .config{
        padding: 10px 20px 0;
        height: 55px;
      }
      .buttons{
        text-align: center;
        margin-top: 20px;
        .left{
          margin-right: 100px;
        }
      }
    }
  }
}
</style>