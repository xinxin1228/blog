<template>
 <div id="about">
   <article>
     <h2>ABOUT ME</h2>
     <p>或许帅气这个词，大概就是为我所创造的吧</p>
     <p>谢谢你这么好看还特意来访问我的博客！我是新新小朋友，一个希望可以无忧无虑生活的小朋友</p>
     <p>目前...头发都健在，或许脱发对我来说是不存在...</p>
   </article>
   <article>
     <h2>ABOUT SITE</h2>
     <p class="code">
       <code>前  &nbsp;端：</code><span>Vue + Element</span>
     </p>
     <p class="code">
       <code>后  &nbsp;端：</code><span>Node + Nuxt + Express + Mongodb</span>
     </p>
     <p class="boder">
       <code>服务器：</code>
       <a href="https://ecs.console.aliyun.com/" target="_blank">阿里云ECS</a>
     </p>
     <p>
       这个项目我在UI设计和技术选型上策划了很久,最终选择用当下国内最流行的Vue3脚手架所搭建,虽然在技术水平上不是很高,但也确实我迈向WEB工程师的一大步。
     </p>
     <p>
       当前项目成果不代表最终成果,更多功能和玩法还在开发中哦~
     </p>
   </article>
   <article>
     <h2>ABOUT COPYRIGHT</h2>
     <p>源码开源：<a href="" target="_blank">新新小朋友的GitHub</a></p>
     <p>开源推动进步，但不要CV哦！</p>
     <p>在注明出处的前提下，本站文章允许非商业用途的转载。</p>
   </article>
   <article>
     <h2>OTHER</h2>
     <p>如果你也对我正在做的事情感兴趣，或者是有好的建议给我，可以通过<a href="/#contanct">contanct me</a>联系我，或者是找到左侧边栏的联系方式联系我哦！</p>
   </article>
 </div>
</template>
 
<script>
export default {
  name: 'About',
}
</script>

<style scoped lang='less'>
#about{
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
      &.code{
        span{
          color: #bd4147;
          background-color: rgba(27,31,35,.05);
          font-weight: 700;
        }
      }
      code{
        font-family: Quicksand;
      }
      a{
        color: #409eff;
        text-decoration: none;
        &:hover{
          text-decoration: underline;

        }
      }
    }
    p.boder{
      border-bottom: 1px dotted rgb(170,170,170 );
    }
  }
}
</style>