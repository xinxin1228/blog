<template>
 <div id="visitor">
   <h4>最近访客</h4>
   <ul>
     <li v-for="item in visitorData" 
     :key="item._id"
     :style="{backgroundImage:`url(${baseURL}${item.visitor.photo})`}"
     >
       <p>{{item.visitor.user}}</p>
     </li>
   </ul>
 </div>
</template>
 
<script>
export default {
  name: 'Visitor',
  data(){
    return{
      // 访客
      visitorData:[]
    }
  },
  async created(){
    let doc = await this.$axios.get("/admin/get/visitor")
    this.visitorData = doc.data.data
    console.log(this.visitorData)
  }
}
</script>

<style scoped lang='less'>
#visitor{
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
    width: 100%;
    overflow: hidden;
    li{
      width: 50px;
      height: 50px;
      float: left;
      margin-right: 10px;
      margin-bottom: 10px;
      position: relative;
      background-size: cover;
      &:nth-child(4n){
        margin-right: 0;
      }
      p{
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        position: absolute;
        bottom: 0;
        text-align: center;
        background-color: rgba(0,0,0,.5);
        color: #fff;
      }
    }
  }
  
}
</style>