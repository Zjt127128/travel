<template>
  <div>
    <zjtHeader></zjtHeader>
    <div class="swiper-main">
      <indexTitle :colorIndex="1" @searchData="searchGl"/>
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(item, index) in swiperList" :key="index">
          <img :src="item.imgUrl" alt=""/>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="part_middle">
      <div class="part_title">当季推荐</div>
      <div class="recommand">
        <div class="recommand_item">
          <img
            src="http://tr-osdcp.qunarzz.com/tr-osd-tr-manager/img/09da45332823f014429b94e55fa96c5d.jpg?width=2048&height=1365&top=0&color=#928f52"
            alt=""/>
          <span class="descrip">北京小长假周末必玩榜</span>
        </div>
        <div class="recommand_item">
          <img
            src="http://tr-osdcp.qunarzz.com/tr-osd-tr-manager/img/086174eabf6bd34955ce7b76fb8be567.jpg?width=1024&height=683&top=0&color=#5191bb"
            alt=""/>
          <span class="descrip">上海小长假周末必玩榜</span>
        </div>
        <div class="recommand_item">
          <img
            src="http://tr-osdcp.qunarzz.com/tr-osd-tr-manager/img/c06304f3eb91aa6bca56c1f88dff7986.jpg?width=577&height=400&top=0&color=#446323"
            alt=""/>
          <span class="descrip">成都小长假周末必玩榜</span>
        </div>
      </div>
    </div>
    <div class="part_bottom">
      <div class="glList">
        <div class="part_bottom">
          <div class="diary_title">热门攻略<i class="el-icon-sunny" style="color: red;"></i></div>
          <div class="share_area">
            <div class="share_item" v-for="(item, index) in hotGl" :key="index" @click="goTodetial(item)">
              <div class="share_top">
                <img :src="'http://4h6p310736.vicp.fun' + item.headImg" alt="" class="userHead"/>
                <div class="user_info">
                  <div class="firt_line">
                    <span class="share_title">{{ item.title }}</span>
                    <div class="tag1_back" v-if="item.tag1"></div>
                  </div>
                  <div class="second_line">
                    <div class="second_left">
                      <span class="nickname">{{ item.author }}</span>
                      <div class="tag2_back" v-if="item.tag1"></div>
                      <div class="go_date">
                        <span class="date_detail">{{ item.goDate }}</span><span>出发</span>
                      </div>
                      <span class="split">|</span>
                      <div>共{{ item.totalDate }}天</div>
                    </div>
                    <div class="secont_right">
                      <div class="interact">
                        <i class="iconfont el-icon-wallet"></i>{{ item.readCount }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="share_main">
                <div class="route_info" v-if="item.duringBegin && item.duringEnd">
                  <span class="rout_type">途经：</span><span>{{ item.duringBegin }}</span><span
                  class="arrow_right">></span><span>{{ item.duringEnd }}</span>
                </div>
                <div class="route_info" v-if="item.eventBegin && item.eventEnd">
                  <span class="rout_type">行程：</span><span>{{ item.eventBegin }}</span><span
                  class="arrow_right">></span><span>{{ item.eventEnd }}</span>
                </div>
                <div class="share_img">
                  <img v-for="(e, i) in item.imgLists" :src="'http://4h6p310736.vicp.fun' + e" alt=""
                       :key="i" style="width: 200px; height: 150px; margin-right: 5px"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="part_bottom">
      <div class="glList">
        <div class="part_bottom">
          <div class="diary_title">攻略日记</div>
          <div class="share_area">
            <div class="share_item" v-for="(item, index) in shareDiaryList" :key="index" @click="goTodetial(item)">
              <div class="share_top">
                <img :src="'http://4h6p310736.vicp.fun' + item.headImg" alt="" class="userHead"/>
                <div class="user_info">
                  <div class="firt_line">
                    <span class="share_title">{{ item.title }}</span>
                    <div class="tag1_back" v-if="item.tag1"></div>
                  </div>
                  <div class="second_line">
                    <div class="second_left">
                      <span class="nickname">{{ item.author }}</span>
                      <div class="tag2_back" v-if="item.tag1"></div>
                      <div class="go_date">
                        <span class="date_detail">{{ item.goDate }}</span><span>出发</span>
                      </div>
                      <span class="split">|</span>
                      <div>共{{ item.totalDate }}天</div>
                    </div>
                    <div class="secont_right">
                      <div class="interact">
                        <i class="iconfont el-icon-wallet"></i>{{ item.readCount }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="share_main">
                <div class="route_info" v-if="item.duringBegin && item.duringEnd">
                  <span class="rout_type">途经：</span><span>{{ item.duringBegin }}</span><span
                  class="arrow_right">></span><span>{{ item.duringEnd }}</span>
                </div>
                <div class="route_info" v-if="item.eventBegin && item.eventEnd">
                  <span class="rout_type">行程：</span><span>{{ item.eventBegin }}</span><span
                  class="arrow_right">></span><span>{{ item.eventEnd }}</span>
                </div>
                <div class="share_img">
                  <img v-for="(e, i) in item.imgLists" :src="'http://4h6p310736.vicp.fun' + e" alt=""
                       :key="i" style="width: 200px; height: 150px; margin-right: 5px"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="page">
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="pageNum"
            :limit.sync="pageSize"
            @pagination="getGlList"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入插件
import {swiper, swiperSlide} from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import "../../assets/font_4479788_ky6fdzprg/iconfont.css";
import zjtHeader from '@/components/header/header.vue';
import indexTitle from '@/components/index/title/indexTitle.vue';
import pagination from '@/components/util/pagination.vue';

export default {
  components: {
    swiper,
    swiperSlide,
    zjtHeader,
    indexTitle,
    pagination,
  },
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
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev"
        // }
      },
      swiperList: [],
      regionList: [],
      shareDiaryList: [],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      hotGl: [],
      cityName: ""
    };
  },
  methods: {
    goTodetial(item) {
      this.$router.push({
        path: '/strategyDetail',
        query: {
          id: item.strategyId,
        }
      });
    },
    getGlList(page) {
      let param = {};
      let uri = ""
      if (page){
        uri = 'system/information/getStrategyInformationList?pageSize='+page.limit+'&pageNum='+page.page
      }else {
        uri = 'system/information/getStrategyInformationList'
      }
      let that = this;
      this.$axios.post(uri, param).then((res) => {
        this.$message({
          message: '攻略获取成功！',
          type: 'success'
        });
        if (res.data.code == 200) {
          that.shareDiaryList = res.data.rows;
          that.total = res.data.total;
        } else {
          this.$notify.error({
            title: '错误',
            message: '获取列表失败！'
          });
        }
      }).catch((error) => {
        this.$notify.error({
          title: '错误',
          message: '获取列表失败！'
        });
      });
    },
    pageChange(pageNum) {
      this.pageNum = pageNum;
      if (this.sortName == '全部') {
        this.getGlList(undefined, this.search)
      } else {
        this.getGlList(this.sortName, this.search)
      }
    },
    getCity() {
      this.$axios.get('system/SortInformation/list', null, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then((res) => {
        if (res.data.code == 200) {
          for (const iterator of res.data.rows) {
            iterator.color = ""
          }
          let all = {
            'sortName': '全部',
            'color': "#1badb6"
          }
          res.data.rows.unshift(all);
          this.regionList = res.data.rows
          this.sortName = '全部'
        }
      }).catch((error) => {
        this.$notify.error({
          title: '错误',
          message: '获取城市列表失败！'
        });
      });
    },
    // 搜索框事件
    searchGl(data) {
      this.getGlList(undefined, data)
    },
    getHotGl() {
      let that = this;
      this.$axios.get("system/information/getCountList", null).then((res) => {
        that.hotGl = res.data.rows;
        let imgUri = [];
        for (let index in that.hotGl) {
          let data = {}
          if (index < 3) {
            data.imgUrl = window.API_BASE_URL.substring(0, window.API_BASE_URL.length - 1) + that.hotGl[index].attractionsUrl;
            imgUri.push(data)
          }
        }
        that.swiperList = imgUri;
      }).catch((e) => {
        this.$message.error('获取热门攻略出错，请重试！');
      })
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  mounted() {
    this.getGlList()
    this.getCity();
    this.getHotGl();
  },
};
</script>
<style scoped>
.top_bar {
  font-size: 12px;
  text-align: right;
  margin-right: 20%;
}

.firt_level {
  padding: 0 10px;
  border-right: #dddddd 1px solid;
}

.top_hover_class:hover {
  cursor: pointer;
  color: #00a3d2 !important;
}

.top2_bar {
  display: flex;
  justify-content: center;
  align-items: end;
  margin-right: 300px;
}

.top2_bar_item {
  font-size: 17px;
  font-weight: bold;
  margin: 0 15px;
  position: relative;
}

.top2_text:hover {
  cursor: pointer;
  color: #0088a4 !important;
}

.swiper-main {
  width: 100%;
  height: 500px;
  background-color: #f4f4f4;
}

.swiper-container {
  width: 100%;
  height: 500px;
  background-color: #f4f4f4;
}

.swiper-container img {
  width: 100%;
  height: 500px;
}

::v-deep .swiper-pagination-bullet-active {
  background-color: #b0352f;
}

.part_title {
  font-size: 28px;
}

.part_middle {
  background-color: #f4f4f4;
  padding-bottom: 30px;
  padding-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.diary_title {
  font-size: 28px;
  /* margin:  auto; */
  margin-top: 40px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.recommand {
  display: flex;
  margin-top: 30px;
  justify-content: center;
  position: relative;
}

.recommand_item {
  position: relative;
}

.recommand_item img {
  width: 390px;
  height: 302px;
  margin: 10px;
}

.descrip {
  position: absolute;
  color: #fff;
  z-index: 99;
  width: 80%;
  bottom: 20px;
  left: 10px;
}

.diary_bar {
  display: flex;
  border: solid 1px #dfdfdf;
  line-height: 38px;
  width: 880px;
  margin: 30px 325px;
}

.destination {
  background-color: #f4f4f4;
  color: #999;
  width: 80px;
  text-align: center;
}

.city {
  margin-left: 29px;
  font-size: 14px;
}

.city:hover {
  cursor: pointer;
  color: #3cb0d9;
  font-weight: bold;
}

.userHead {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 20px;
}

.share_area {
  //margin-left: 325px;
}

.share_top {
  display: flex;
}

.tag1_back {
  background-image: url("//source.qunarzz.com/site/images/travel/home/icon_flag_essence.jpg");
  background-position: -8px -91px;
  width: 66px;
  height: 20px;
  margin: 0 10px;
}

.tag2_back {
  background: url("https://s.qunarzz.com/travel/home/smart_traveler.png") no-repeat 0 0;
  width: 75px;
  height: 18px;
}

.share_title {
  font-size: 20px;
}

.share_title:hover {
  color: #3cb0d0;
  cursor: pointer;
}

.firt_line {
  display: flex;
  align-items: center;
}

.second_line {
  font-size: 12px;
  display: flex;
  color: #999;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  width: 810px;
}

.second_left {
  display: flex;
  align-items: center;
}

.secont_right {
  display: flex;
  align-items: center;
}

.nickname {
  color: #0084bb;
  margin-right: 8px;
  cursor: pointer;
}

.date_detail {
  margin-right: 5px;
}

.split {
  margin: 0 5px;
  color: #999;
  font-family: "simsun";
}

.share_item {
  padding-bottom: 20px;
  border-bottom: 1px dashed #e5e5e5;
  width: 890px;
}

.share_main {
  margin-left: 70px;
}

.route_info {
  font-size: 12px;
  margin-top: 10px;
}

.rout_type {
  color: #999;
}

.arrow_right {
  margin: 0 5px;
  color: #999;
}

.interact {
  margin-left: 10px;
}

.share_img {
  margin-top: 10px;
}

.part_bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page {
  display: flex;
  justify-content: center;
}
</style>
