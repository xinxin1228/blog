import { createStore } from 'vuex'

export default createStore({
  state: {
    // 用户的信息
    userInfo:{},
    // 友链列表
    linkData:[]
  },
  mutations: {
    // 更变用户信息
    loginSuccess(state, userInfo) {
      state.userInfo = userInfo
    },
    // 退出登录  清除用户信息
    loginOut(state){
      state.userInfo = {}
    },
    // 更新友链信息
    updateLinkData(state,data){
      state.linkData = data
    }

  },
  // 用户调用异步函数
  actions: {
    //异步更新linkData
    getLinkData({commit},vm) {
      (async function(){
        let {data} = await this.$axios({
          method: "GET",
          url: "/get/link"
        })

        if (data.code) {
          return this.$message.error(data.msg)
        }

        commit('updateLinkData',data.data)
      }.bind(vm))();
    }
  },
  modules: {

  }
})
