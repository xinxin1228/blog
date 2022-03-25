<template>
  <div class="article">
    <article>
      <h2>文章</h2>
      <p>我会在这里不定期的更新一些前后端相关技术栈的文章，如果文章有错误或者不足之处，欢迎在相关文章评论区内多多指正，我将会在第一时间内回复处理的🥰~</p>
    </article>
    <article class="artTexts" v-infinite-scroll="load">
      <div v-for="item in articleData" :key="item._id" class="artcileShow articleAnimate">
        <div class="artLeft">
          <img :src="`${baseURL}${item.cover}`" alt="">
        </div>
        <div class="artRight">
          <div class="title">
            <router-link :to="`/article/${item._id}`" target="_blank">{{item.title}}</router-link>
          </div>
          <div class="des">
            {{item.des}}
          </div>
          <div class="more">
            <p class="time">{{getDate(item.date)}}</p>
            <p class="views">阅读量：<span>{{item.pv}}</span></p>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>
 
<script>
export default {
  name: 'Article',
  data(){
    return{
      // 文章内容
      articleData:[],
      // 懒加载数据初始值
      skip:0,
      // 所有内容
      articleAll:[]
    }
  },
  methods:{
    // 获取文章列表
    async getArticleData(){
      let {data} = await this.$axios.get("/admin/get/article",{
        params:{
          skip:this.skip
        }
      })
      // console.log(this.articleData)
      // this.articleData = data.data
      this.skip += 3

      this.articleData.push(...this.articleAll.slice(this.skip,this.skip+3))

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
    },
    // 懒加载
    load(){
      this.getArticleData()
    },
  },
  async created(){
      let {data} = await this.$axios.get("/admin/get/articleAll")
      // console.log(data.data) 
      this.articleAll = data.data
      this.articleData.push(...this.articleAll.slice(this.skip,this.skip+3))
    },
}
</script>

<style scoped lang='less'>
.article{
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
  article.artTexts{
    .artcileShow{
      display: flex;
      justify-content: space-between;
      position: relative;
      margin-bottom: 20px;
      padding-bottom:20px ;
      border-bottom: 1px solid #e9e9e9;
      &:last-child{
        border-bottom: none;
        margin-bottom: 0;
      }
      .artLeft{
        flex: 1;
        height: 200px;
        margin-right: 40px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .artRight{
        flex: 2;
        font-family: "Pacifico";
        .title{
          font-family: "Quicksand";
          font-size: 18px;
          color: #333333;
          letter-spacing: 1px;
          font-weight: bold;
          margin-top: 10px;
          a{
            text-decoration: none;
            color: #333333;
            &:hover{
              color: #73b899;
            }
          }
        }
        div.des{
          font-family: "Pacifico";
          width: 100%;
          font-size: 14px;
          line-height: 24px;
          margin-top: 40px;
          letter-spacing: 1px;
          color: #878787;
          height: 72px;
          white-space: normal;        //使文本可以多行显示
          text-overflow: ellipsis;    //使多余的部分用省略号来代替
          overflow: hidden;           //隐藏多余的部分
          display: -webkit-box;       //浮动布局
          -webkit-line-clamp: 3;      //显示的行数
          -webkit-box-orient: vertical;   //垂直排列
        }
        .more{
          position: absolute;
          bottom: 20px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          font-family: 'Courier New', Courier, monospace;
          font-weight: bold;
          p.time{
            // flex: 1;
            color: #7c7c7c;
            text-indent: 0;
            white-space: nowrap;
            margin-right: 20px;
            letter-spacing: 0;
          }
          p.views{
            // flex: 1;
            float: right;
             color: #999999;
          }
        }
      }
    }
    .articleAnimate{
      animation: fadeIn 1s 1;
      animation-fill-mode: backwards;
    }
    @keyframes fadeIn {
      from {
        transform: scale(.5);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }
  }
}
</style>