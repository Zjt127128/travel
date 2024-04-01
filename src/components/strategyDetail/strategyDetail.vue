
<template>
  <div class="startegy_wrapper">
    <zjt-header></zjt-header>
    <index-title :colorIndex="2"></index-title>
    <div class="detialWrap">
      <div class="topImg">
        <img :src="topImgSrc" alt="" />
        <div class="left_top">
          <span>攻略</span><span class="margin_side">></span
          ><span>{{ recommendPlace }}</span
          ><span class="margin_side">></span><span>{{ recommandTitle }}</span>
        </div>
      </div>
      <div class="content">
        <div class="auth_info">
          <div class="auth_head">
            <img :src="commonImgUrl + authHeadImg" alt="" />
          </div>
          <div class="auth_right">
            <div class="auth_title">{{ recommandTitle }}</div>
            <div class="article_info">
              <div class="auth_name">{{ authName }}</div>
              <div class="create_time">
                <span>创建于</span><span>{{ createTime }}</span
                ><span class="split_icon">|</span>
              </div>
              <div class="read">
                <span class="read_type">浏览</span><span>{{ browseNum }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="trip_info">
          <div class="trip_box">
            <div class="box_left">
              <img src="@/assets/strategyDetial/time.png" alt="" />
              <div class="left_content">
                <span class="box_title">出发日期</span>
                <span class="split_icon">/</span>
                <span class="box_content" style="color: #c90">{{
                  createTime
                }}</span>
              </div>
            </div>
            <div class="box_right">
              <img src="@/assets/strategyDetial/dateTimes.png" alt="" />
              <div class="right_content">
                <span class="box_title">天数</span>
                <span class="split_icon">/</span>
                <span class="box_content">{{ totalDate }}</span>
                <span style="margin: 0 10px">天</span>
              </div>
            </div>
          </div>
          <div class="trip_content">
            <div class="trip_title">旅游游记</div>
            <div class="split_row"></div>
            <div class="content_deac" v-html="recommendTrip"></div>
            <div class="content_img">
              <img
                :src="item"
                alt=""
                v-for="(item, index) in tripImgSrcList"
                :key="index"
                class="img_item"
              />
            </div>
          </div>
          <div class="hotel_content">
            <div class="trip_title">推荐酒店</div>
            <div class="split_row"></div>
            <div class="hotel_deac">
              <img :src="hotelImg" alt="" />
              <div class="hotel_name">
                <div class="name1">{{ hotelName }}</div>
                <div class="hotel_price">{{ hotelPrice }}</div>
              </div>
            </div>
            <div class="hotel_rate">
              <span>推荐指数：</span>
              <el-rate v-model="hotelRate" disabled></el-rate>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import zjtHeader from "@/components/header/header.vue";
import indexTitle from "@/components/index/title/indexTitle.vue";
export default {
  components: { swiper, swiperSlide, zjtHeader, indexTitle },
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        // 显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true, //允许分页点击跳转
        },
        // 设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      commonImgUrl: "http://4h6p310736.vicp.fun",
      tripImgSrcList: [],
      topImgSrc: "",
      authHeadImg: "",
      authName: "",
      createTime: "",
      recommandTitle: "",
      recommendPlace: "",
      recommandSpot: "",
      recommendHotel: "",
      recommendTrip: "",
      browseNum: "",
      totalDate: "",
      hotelImg: "",
      hotelName: "",
      hotelPrice: "",
      hotelRate: "",
      isvideo: '',
      video: ''

    };
  },

  methods: {
    queryDetail() {
      this.$axios
        .get("/system/information/" + this.$route.query.id, null, {})
        .then((res) => {
          let detailInfo = res.data.data;
          detailInfo.imgLists.forEach((item, index) => {
            this.tripImgSrcList.push(this.commonImgUrl + item);
          });
          this.recommendPlace = detailInfo.city;
          this.recommandSpot = detailInfo.attractions;
          this.recommandTitle = detailInfo.title;
          this.authHeadImg = detailInfo.headImg;
          this.authName = detailInfo.nickname;
          this.createTime = detailInfo.goDate;
          this.browseNum = detailInfo.readCount;
          this.topImgSrc = this.commonImgUrl + detailInfo.cityUrl;
          this.totalDate = detailInfo.totalDate;
          this.recommendTrip = detailInfo.content;
          this.hotelImg = this.commonImgUrl + detailInfo.hotelUrl;
          this.hotelName = detailInfo.hotel;
          this.hotelRate = detailInfo.recommendationIndex;
          this.isvideo = detailInfo.isVideo
          this.video = detailInfo.video
          if (detailInfo.hotelPrice && detailInfo.hotelPrice != "") {
            this.hotelPrice = detailInfo.hotelPrice + "元";
          } else {
            this.hotelPrice = "暂无报价";
          }
        });
    },
  },
  mounted() {
    this.queryDetail();
  },
};
</script>
<style scoped>
.startegy_wrapper {
  padding-bottom: 200px;
}
.topImg img {
  width: 100%;
  height: 500px;
}
.topImg {
  position: relative;
}
.left_top {
  color: #fff;
  font-size: 12px;
  position: absolute;
  z-index: 999;
  top: 15px;
  left: 25%;
  font-weight: bold;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.auth_head {
  margin-right: 20px;
}
.auth_head img {
  border-radius: 50%;
  border: 1px #fff solid;
  height: 100px;
  width: 100px;
}
.margin_side {
  margin: 0 10px;
}
.auth_right {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.auth_info {
  position: relative;
  display: flex;
  top: -55px;
  z-index: 99;
  right: 300px;
}
.article_info {
  margin-top: 40px;
  font-size: 12px;
  display: flex;
  flex-direction: row;
}
.auth_title {
  color: #fff;
  font-size: 22px;
  font-weight: bold;
}
.auth_name {
  color: #0070d4;
  margin-right: 10px;
  cursor: pointer;
}
.split_icon {
  margin: 0 10px;
}

.read_type {
  margin-right: 10px;
}
.trip_box {
  background-color: #f7f7f7;
  padding: 13px 15px 0;
  color: #555;
  display: flex;
  width: 690px;
  padding: 15px 30px;
}
.trip_info {
  margin-right: 110px;
  margin-top: -30px;
}

.box_left img,
.box_right img {
  width: 30px;
  height: 30px;
  margin-right: 5px;
}
.box_left,
.box_right {
  font-size: 14px;
  display: flex;
  align-items: center;
}
.box_left {
  margin-right: 30px;
}
.trip_content {
  margin-top: 20px;
}
.trip_title {
  font-weight: bold;
  margin-left: 4px;
  height: 50px;
  line-height: 50px;
  font-size: 24px;
  color: #666;
}
.split_row {
  border-bottom: solid 4px #666;
  margin-bottom: 10px;
  width: 680px;
}
.trip_desc img {
  width: 30px;
  height: 30px;
}

.content_deac {
  width: 680px;
  margin-bottom: 20px;
}
.content_img {
  display: flex;
  flex-direction: column;
}
.content_img img {
  width: 680px;
}
.img_item {
  margin-bottom: 20px;
}
.hotel_content {
  width: 235px;
  height: 261px;
}
.hotel_deac img {
  width: 235px;
  height: 175px;
}

.hotel_name {
  width: 233px;
  height: 60px;
  border: 1px solid #e0e0e0;
  margin-top: -4px;
}
.name1 {
  font: 16px / 30px "microsoft yahei";
  padding: 6px 0 0 10px;
  color: #333;
}
.hotel_price {
  color: #919090;
  font-size: 12px;
  padding-left: 10px;
}
.hotel_rate{
  display: flex;
  margin-top: 10px;
}
</style>
