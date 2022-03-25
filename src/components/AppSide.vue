<template>
 <div id="appside">
   <!-- 个人介绍 -->
  <Introduce></Introduce>
  <div class="fex"
    :class='{"fixed":isFixed}'
  >
     <!-- 热门文章 -->
    <HotArticle></HotArticle>
    <!-- 最近访客 -->
    <Visitor></Visitor>
  </div>
 </div>
</template>
 
<script>
import Introduce from "@/components/AppSide/Introduce";
import HotArticle from "@/components/AppSide/HotArticle";
import Visitor from "@/components/AppSide/Visitor";

export default {
  name: '',
  components:{
    Introduce,
    HotArticle,
    Visitor
  },
  data(){
    return{
      isFixed:false
    }
  },
  methods:{
    scrollFn(){
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.isFixed = scrollTop>=240
    }
  },
  mounted(){
    this.scrollFn()
    window.addEventListener("scroll",()=>{
      this.scrollFn()
    })
  }
}
</script>

<style scoped lang='less'>
.fixed{
  position: fixed;
  top: 50px;
  width: 270px;
}
</style>