<template>
  <div class="app-container">
    <zjt-header></zjt-header>
    <index-title :colorIndex="2"></index-title>
    <!-- 添加或修改攻略信息对话框 -->
    <div class="add_area">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="是否vlog" prop="isVideo">
          <el-switch
            v-model="form.isVideo"
            active-text="Vlog"
            inactive-text="内容">
          </el-switch>
        </el-form-item>
        <el-form-item label="攻略内容" v-if="form.isVideo == false">
          <editor v-model="form.content" :min-height="192"/>
        </el-form-item>
        <el-form-item label="vlog视频" prop="video" v-if="form.isVideo == true">
          <video-upload v-model="form.video"></video-upload>
        </el-form-item>
        <el-form-item label="所推荐城市" prop="city">
          <el-select v-model="form.city" placeholder="请输入所推荐城市">
            <el-option
              v-for="item in cityList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所推荐城市图片" prop="cityUrl">
          <image-upload v-model="form.cityUrl"/>
        </el-form-item>
        <el-form-item label="景点" prop="attractions">
          <el-input v-model="form.attractions" placeholder="请输入景点" />
        </el-form-item>
        <el-form-item label="美食" prop="delicacy">
          <el-input v-model="form.delicacy" placeholder="请输入美食" />
        </el-form-item>
        <el-form-item label="酒店名称" prop="hotel">
          <el-input v-model="form.hotel" placeholder="请输入酒店名称" />
        </el-form-item>
        <el-form-item label="酒店图片" prop="hotelUrl">
          <image-upload v-model="form.hotelUrl"/>
        </el-form-item>
        <el-form-item label="酒店价格" prop="hotelPrice">
          <el-input v-model="form.hotelPrice" placeholder="请输入酒店价格" />
        </el-form-item>
        <el-form-item label="推荐指数" prop="recommendationIndex">
          <el-rate v-model="form.recommendationIndex"></el-rate>
        </el-form-item>

        <el-form-item label="攻略标签" prop="tag">
          <el-select v-model="form.tag" placeholder="请输入攻略标签">
            <el-option
              v-for="item in tagList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出发时间" prop="goDate">
          <el-date-picker clearable
                          v-model="form.goDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择出发时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="总共时长" prop="totalDate">
          <el-input v-model="form.totalDate" placeholder="请输入总共时长" />
        </el-form-item>
        <el-form-item label="开始地点" prop="duringBegin">
          <el-input v-model="form.duringBegin" placeholder="请输入开始地点" />
        </el-form-item>
        <el-form-item label="结束地点" prop="duringEnd">
          <el-input v-model="form.duringEnd" placeholder="请输入结束地点" />
        </el-form-item>
        <el-form-item label="图片" prop="imgList">
          <image-upload v-model="form.imgList"/>
        </el-form-item>
        <el-form-item label="景点图片" prop="attractionsUrl">
          <image-upload v-model="form.attractionsUrl"/>
        </el-form-item>
      </el-form>
    </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
  </div>
</template>

<script>
import videoUpload from '@/components/videoUpload/index.vue';
import editor from '@/components/editor/index.vue';
import imageUpload from '@/components/imageUpload/index.vue';
import zjtHeader from '@/components/header/header.vue';
import indexTitle from '@/components/index/title/indexTitle.vue';
import {swiper, swiperSlide} from "vue-awesome-swiper";

export default {
  name: "Information",
  components: {
    videoUpload,
    editor,
    imageUpload,
    swiper,
    swiperSlide,
    zjtHeader,
    indexTitle,
  },
  data() {
    return {
      tagList:[],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 攻略信息表格数据
      informationList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        city: null,
      },
      cityList: [],
      // 表单参数
      form: {
        title: '',
        content: '',
        isVideo: false,
        cityUrl:'',
        city:'',
        attractions:'',
      },
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.queryCityList()
    this.queryTagList()
  },
  methods: {
    handleFileChange(event) {
      // 获取选择的视频文件
      this.form.video = event.target.files[0];
    },
    // 表单重置
    reset() {
      this.form = {
        title: null,
        content: null,
        cityList: [],
        city: '',
        cityUrl: null,
        attractions: null,
        delicacy: null,
        hotel: null,
        hotelUrl: null,
        hotelPrice: null,
        recommendationIndex: null,
        video: null,
        isVideo: false,
        headImg: null,
        tag: null,
        goDate: null,
        totalDate: null,
        duringBegin: null,
        duringEnd: null,
        imgList: null
      };
      this.resetForm("form");
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.isVideo){
            this.form.isVideo = 1
          }else {
            this.form.isVideo = 0
          }
          this.$axios.post('/system/information',this.form,{}).then(res=>{
            this.$message.success('提交成功！');
          }).catch((e)=>{
            this.$message.error('提交失败！');
          })
        }
      });
    },
    queryCityList(){
      let that = this
      this.$axios
        .get("/system/SortInformation/list", null, {})
        .then((res) => {
          if(res&&res.data&&res.data.code&&res.data.code=='200'){
            res.data.rows.forEach((item)=>{
              let param = {
                value: item.id,
                label: item.sortName
              }
              that.cityList.push(param)
            })
          }
        })
    },
    queryTagList(){
      let that = this
      this.$axios
        .get("/system/TagInformation/list", null, {})
        .then((res) => {
          if(res&&res.data&&res.data.code&&res.data.code=='200'){
            res.data.rows.forEach((item)=>{
              let param = {
                value: item.id,
                label: item.tagName
              }
              that.tagList.push(param)
            })
          }
        })
    }
  }
};
</script>
<style scoped>
.add_area{
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.el-form{
  width: 60%;
}
.el-button{
  width: 10%;
}
.dialog-footer{
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}
</style>
