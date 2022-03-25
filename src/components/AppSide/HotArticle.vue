<template>
 <div id="article">
   <h4>Hot Article</h4>
   <ul>
     <li v-for="(item,index) in hotArticle" :key="item._id">
       <i>{{index+1}}</i>
       <router-link :to="`/article/${item._id}`" target="_blank">{{item.title}}</router-link>
     </li>
   </ul>
 </div>
</template>
 
<script>
export default {
  name: 'HotArticle',
  data(){
    return{
      // 热门文章
      hotArticle:[]
    }
  },
  async created(){
    // 获取热门文章
    let {data} = await this.$axios.get("/admin/get/hotArticle")
    this.hotArticle = data.data
  }
}
</script>

<style scoped lang='less'>
#article{
  margin: 15px 0;
  box-sizing: border-box;
  font-family: Quicksand;
  box-shadow: 0 0 4px #fff;
  background-color: #fff;
  padding: 20px;
  h4{
    line-height: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e8e9e7;
    font-size: 16px;
    font-weight: bolder;
  }
  ul{
    margin-top: 12px;
    li{
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      height: 40px;
      line-height: 40px;
      padding: 0 3px;
      justify-content: space-between;
      &:nth-child(1) i{
        background-color: #6CA291;
      }
      &:nth-child(2) i{
        background-color: #66AC9B;
      }
      &:nth-child(3) i{
        background-color: #8CB8AB;
      }
      i{
        display: block;
        width: 22px;
        height: 22px;
        margin-top: 9px;
        margin-right: 15px;
        border-radius: 50%;
        line-height: 16px;
        font-size: 16px;
        color: #fff;
        text-align: center;
        font-weight: 100;
        font-family: Pacifico;
      }
      a{
        text-decoration: none;
        display: block;
        flex: 1;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #787977;
      }
    }
  }
}
</style>