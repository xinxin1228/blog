<template>
  <div id="Link">
    <article>
      <h2>友链</h2>
      <p>请在
        <router-link to="/message">留言区</router-link>或<a href="/#contanct">contanct me</a>
        申请友链，本站友链信息：
      </p>
      <p>名称：新新小朋友&gt;.&lt;</p>
      <p class="code">主页：<span>http://huangjianxin.cn</span></p>
      <p class="code">图标：<span>http://huangjianxin.cn/favicon.ico</span></p>
      <p>描述：一个正在努力的前端工程师💖</p>
    </article>
    <article class="a2">
      <ul>
        <li v-for="item in linkList" :key="item._id">
          <a :href="item.home" target="_blank">
            <svg
              viewBox="0 0 300 100"
              preserveAspectRatio="none"
            >
              <path
                stroke="red"
                fill="none"
                d="M 300 100 V 0 H 0 V 100 H 300"
              ></path>
            </svg>
            <div class="top">
              <p class="img" :style="`background-image: url(${item.logo})`"></p>
              <p class="name">{{item.name}}</p>
            </div>
            <div class="bottom">
              <p class="des">{{item.des}}</p>
            </div>
          </a>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from "vuex"
export default {
  name: "Link",
  data(){
    return{
      linkList:[],
    }
  },
  async created(){
    // // 获取友链信息
    let {data} = await this.$axios.get("/admin/get/linkList")
    this.linkList = data.mes
    // this.updateLinkData(this)
  },
  computed:{
    ...mapState(["linkData"])
  },
  methods:{
    ...mapActions(["updateLinkData"])
  }
}
</script>

<style lang="less" scoped>

#Link {
  article {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 15px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px;
    background-color: #fff;
    font-family: Quicksand, Microsoft YaHei, sans-serif;

    h2 {
      margin-bottom: 15px;
      font-size: 20px;
      letter-spacing: 3px;
      line-height: 24px;
      border-left: 5px solid #73b899;
      text-indent: 10px;
      font-weight: bold;
    }

    p {
      text-indent: 2em;
      color: #444;
      font-size: 14px;
      letter-spacing: 4px;
      line-height: 30px;

      code {
        font-family: Quicksand, Microsoft YaHei, sans-serif;
        letter-spacing: 4px;
      }

      a {
        color: #409eff;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }

    p.code span {
      color: #bd4147;
      background-color: rgba(27, 31, 35, .05);
      font-weight: 700;
    }

    p.border {
      border-bottom: 1px dotted rgb(170, 170, 170);
    }
  }

  article.a2 {
    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        position: relative;
        box-sizing: border-box;
        flex: 1;
        min-width: 260px;
        margin: 0 7.5px 15px;
        background-color: rgba(27, 31, 35, .05);

        p {
          text-indent: 0;
        }

        a {
          box-sizing: border-box;
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
          padding: 5px;
          text-decoration: none;

          svg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            path {
              stroke-dasharray: 800;
              stroke-dashoffset: 800;
              transition: 1s;
            }
          }

          &:hover svg path{
            stroke-dashoffset: 0;
          }

          .top {
            display: flex;
            height: 50px;

            .img {
              width: 50px;
              height: 50px;
              background-position: 50%;
              background-size: cover;
              border-radius: 50%;
            }

            .name {
              flex: 1;
              font-size: 14px;
              height: 50px;
              margin-left: 15px;
              line-height: 50px;
              color: #409eff;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }

          .bottom {
            p.des {
              font-size: 12px;
              height: 60px;
              word-break: break-all;
              text-overflow: ellipsis;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
  }
}
</style>