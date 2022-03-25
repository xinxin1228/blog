<template>
  <div id="UpdatePhoto">
    <el-alert
      title="上传头像"
      type="warning"
      description="点击下方 + 号上传并修改头像"
      :closable="false"
      show-icon>
    </el-alert>
    <el-upload
      class="avatar-uploader"
      :action="baseURL+'/upload/photo'"
      :show-file-list="false"
      :with-credentials="true"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>

import {mapMutations} from 'vuex'

export default {
  name: "UpdatePhoto",
  data() {
    return {
      imageUrl: ''
    };
  },
  methods: {
    ...mapMutations(['loginSuccess']),
    handleAvatarSuccess(res, file) {
      if (res.code){
        return this.$message.error(res.mes)
      }
      this.$message.success(res.mes)
      //显示缩略图
      this.imageUrl = URL.createObjectURL(file.raw)
      //更新vuex
      this.loginSuccess(res.data)
    },
    beforeAvatarUpload(file) {
      const isJPG = /^image\/(jpeg|png)$/.test(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style scoped lang="less">
#UpdatePhoto {
  /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-top: 10px;
    .avatar{
      display: block;
      max-width: 178px;
      max-height: 178px;
    }
    .avatar-uploader-icon{
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
  }
}
</style>














