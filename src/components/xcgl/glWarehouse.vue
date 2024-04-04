<template>
  <div>
    <div>
      <zjtHeader/>
      <indexTitle :colorIndex="1"/>
    </div>
    <div class="searchContent">
      <el-input placeholder="搜攻略" v-model="searchInpt" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="getGlList"></el-button>
      </el-input>
      <div class="glList">
        <div class="part_bottom">
          <div class="diary_title">攻略日记</div>
          <div class="diary_bar">
            <div class="destination">城市</div>
            <div v-for="(item, index) in regionList" :key="index" class="city"
                 :style="item.color ? 'color:' + item.color : ''" @click="mddChange(item)">
              {{ item.sortName }}
            </div>
          </div>
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
                      <!-- <div class="interact">
                      <i class="iconfont icon-dianzan"></i>{{ item.great }}
                  </div> -->
                      <!-- <div class="interact">
                      <i class="iconfont icon-31pinglun"></i>{{ item.comment }}
                  </div> -->
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
<!--          <el-pagination background layout="prev, pager, next" :total="total" @current-change="pageChange">-->
<!--          </el-pagination>-->
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
import zjtHeader from '@/components/header/header.vue';
import indexTitle from '@/components/index/title/indexTitle.vue';
import pagination from '@/components/util/pagination.vue';


export default {
  components: {
    zjtHeader,
    indexTitle,
    pagination,
  },
  name: 'xcgl',
  data() {
    return {
      searchInpt: '',
      sizer: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      city: [],
      cityName: '',
      sizerList: [
        {"quarter": "一季度", "num": "1"},
        {"quarter": "二季度", "num": "2"},
        {"quarter": "三季度", "num": "3"},
        {"quarter": "四季度", "num": "4"},
      ],
      shareDiaryList: [],
      regionList: [],
    }
  },
  methods: {
    goTodetial(item) {
      this.$router.push({
        path: '/strategyDetail',
        query: {
          id: item.strategyId,
          userId: item.userId
        }
      });
    },
    getGlList(page) {
      let param = {}
      if (page){
        param = page
      }else {
        param["page"] = 1;
        param["limit"] = this.pageSize
      }
      param['isVideo'] = "0"
      if (this.cityName && this.cityName != "全部"){
        param["city"] = this.cityName;
      }
      if (this.searchInpt){
        param["title"] = this.searchInpt;
      }
      let uri = ""
      if (page){
        uri = 'system/information/getStrategyInformationListWithAll?pageSize='+page.limit+'&pageNum='+page.page
      }else {
        uri = 'system/information/getStrategyInformationListWithAll'
      }
      let that = this;
      this.$axios.post(uri, param).then((res) => {
        if (res.data.code == 200) {
          that.shareDiaryList = res.data.rows;
          that.total = res.data.total;
          this.$message({
            message: '攻略获取成功！',
            type: 'success'
          });
        } else {

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
      this.getGlList()
    },
    mddChange(item) {
      for (const iterator of this.regionList) {
        iterator.color = ""
      }
      item.color = "#1badb6"
      this.cityName = item.sortName;
      let page = {
        "page":'1',
        'limit':this.pageSize
      }
      this.getGlList(page)
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
          this.cityName="全部"
        }
      }).catch((error) => {
        this.$notify.error({
          title: '错误',
          message: '获取城市列表失败！'
        });
      });
    },
    searchGl() {
      let param = {}
      if (this.searchInpt){
        param["title"] = this.searchInpt;
        param["page"] = this.pageNum;
        param["limit"] = this.pageSize
      }
      this.$axios.post("/system/information/getStrategyInformationListWithAll", param)
        .then((data) => {
          console.log(data)
        })
    }
  },
  mounted() {
    this.getGlList({'page':1,'limit':this.pageSize})
    this.getCity();
    this.searchGl();
  },
}
</script>

<style scoped>
.searchContent,
.sizerBox {
  width: 1150px;
  margin: 20px auto;

}

.diary_title {
  font-size: 28px;
  /* margin-left: 325px; */
  margin-top: 40px;
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
  margin: 30px 0px;
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

.page {
  display: flex;
  justify-content: center;
}
</style>
