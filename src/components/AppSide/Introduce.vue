<template>
<!-- 自我介绍 -->
 <div id="introduce">
   <div class="top">
    <div class="me">
       <div class="img">

       </div>
       <div class="name">
         <p>新新小朋友</p>
         <p>WEB高级开发工程师</p>
       </div>
       <div class="clear">

       </div>
    </div>
    <div class="showInfo">
      <a href="https://github.com/xinxin1228" target="_blank" title="点击进入我的GitHub" class="iconfont icon-huaban881"></a>
      <a href="https://blog.csdn.net/weixin_45777923?spm=1001.2100.3001.5343" title="点击进入我的CSND空间" target="_blank" class="iconfont icon-csdn"></a>
      <a href="https://gitee.com/hjx520" target="_blank" class="iconfont icon-mayun" title="点击进入我的码云仓库"></a>
        <el-popover
        placement="bottom"
        :width="100"
        trigger="click"
      >
        <template #reference>
          <a class="iconfont icon-wechat" title="点击添加我的微信"></a>
        </template>
        <img src="../../assets/img/code.jpg" alt="" style="width:150px;height:150px;display:block;">
      </el-popover>

      <a href="http://wpa.qq.com/msgrd?v=3&uin=2719382032&site=qq&menu=yes" title="点击与我发起QQ在线聊天" target="_blank" class="iconfont icon-QQ"></a>
    </div>
   </div>
   <div class="download">
     <a href="https://github.com/xinxin1228" target="_blank">DWONLOAD CV</a>
   </div>
 </div>
</template>
 
<script>
export default {
  name: '',
}
</script>

<style scoped lang='less'>
#introduce{
  width: 100%;
  height: 220px;
  box-shadow: 0 0 4px #fff;
  .top{
    background-color: #BDE1E2;
    overflow: hidden;
    .me{
      
      .img{
        margin-top: 20px;
        margin-left: 30px;
        // background: url("@/assets/img/me.jpg");
        background: url("../../assets/img/me.jpg");
        width: 60px;
        height: 60px;
        background-size: cover;
        border-radius: 50%;
        overflow: hidden;
        float: left;
      }
      .name{
        float: left;
        margin-top: 29px;
        width: 150px;
        margin-left: 18px;
        p{
          font-size: 16px;
          color: #333;
          // margin-top: 10px;
          &:nth-child(1){
            margin-bottom: 13px;
            font-weight: bolder;
            font-size: 18px;
            letter-spacing:1px;
          }
          &:nth-child(2){
            font-size: 15px;
          }
        }
      }
      .clear{
        clear:both;
      }
      
    }
    .showInfo{
      width: 240px;
      // h
      margin: 20px 0 10px;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      a{
        width: 30px;
        height: 30px;
        text-decoration: none;
        font-size: 20px;
        color: #525252;
      }
    
    }

  }
  .download{
    width: 100%;
    padding: 20px 0;
    background-color: #fff;
    a{
      display: block;
      width: 65%;
      height: 40px;
      border-radius: 23px;
      box-shadow:  0 0 0 #888;
      text-decoration: none;
      background-color: #bfe2e6;
      line-height: 40px;
      color: #000;
      margin: 0 auto;
      text-align: center;
      font-weight: bolder;
      font-size: 14px;
      letter-spacing: 1px;
      &:hover{
        box-shadow: 0 2px 10px #888;
      }
    }
  }
}
</style>