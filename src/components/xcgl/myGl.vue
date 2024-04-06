<template>
  <div class="body">
    <div class="part_bottom">
      <div class="diary_title">攻略日记</div>
      <div class="share_area" v-if="shareDiaryList">
        <div class="share_item" v-for="(item, index) in shareDiaryList" :key="index">
          <div class="share_top">
            <img :src="baseUrl + item.headImg" alt="" class="userHead"/>
            <div class="user_info">
              <div class="firt_line_div">
                <div class="firt_line">
                  <span class="share_title" @click="goGlInfo(item)">{{ item.title }}</span>
                  <div class="tag1_back" v-if="item.tag1"></div>
                </div>
                <div class="firt_line_end">
                  <el-popconfirm confirm-button-text='删除' cancel-button-text='取消' icon="el-icon-info"
                                 icon-color="red" :title="'确定删除这份攻略收藏吗？'" @confirm="deleteGl(item.id)">
                    <el-link type="danger" slot="reference">删除</el-link>
                  </el-popconfirm>
                </div>

              </div>
              <div class="second_line">
                <div class="second_left">
                  <span class="nickname">{{ item.author }}</span>
                  <div class="tag2_back" v-if="item.tag1"></div>
                  <div class="go_date">
                                        <span class="date_detail">{{
                                            item.goDate
                                          }}</span><span>出发</span>
                  </div>
                  <span class="split">|</span>
                  <div>共{{ item.totalDate }}天</div>
                </div>
                <div class="secont_right">
                  <div class="interact">
                    <i class="iconfont el-icon-wallet"></i>
                    {{ item.readCount }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="share_main">
            <div class="route_info"
                 v-if="item.duringBegin && item.duringEnd">
              <span class="rout_type">途经：</span><span>{{
                item.duringBegin
              }}</span><span class="arrow_right">></span><span>{{
                item.duringEnd
              }}</span>
            </div>
            <div class="route_info"
                 v-if="item.eventBegin && item.eventEnd">
              <span class="rout_type">行程：</span><span>{{
                item.eventBegin
              }}</span><span class="arrow_right">></span><span>{{
                item.eventEnd
              }}</span>
            </div>
            <div class="share_img">
              <img v-for="(e, i) in item.imgLists" :src="baseUrl + e" alt="" :key="i"
                   style="width: 200px; height: 150px; margin-right: 5px"/>
            </div>
          </div>
        </div>
      </div>
      <div class="share_area" v-else>
        <el-empty description="没找到"></el-empty>
      </div>
    </div>
    <div class="page" :v-if="total <= 10">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  computed: {},
  name: 'myGl',
  data() {
    return {
      userId: '',
      searchInpt: '',
      sizer: [],
      total: 0,
      pageNum: 1,
      city: [],
      sizerList: [
        {"quarter": "一季度", "num": "1"},
        {"quarter": "二季度", "num": "2"},
        {"quarter": "三季度", "num": "3"},
        {"quarter": "四季度", "num": "4"},
      ],
      shareDiaryList: [],
      regionList: [],
      baseUrl: window.API_BASE_URL.substring(0, window.API_BASE_URL.length - 1),
    }
  },
  methods: {
    getUserInfo() {
      let that = this;
      this.$axios.get('system/user/profile', null).then((res) => {
        if (res.data.code == 200) {
          that.userId = res.data.data.userId;
          that.getList();

        }
      }).catch((error) => {
        this.$notify.error({
          title: '错误',
          message: '获取用户失败！'
        });
      });
    },
    getList() {
      let that = this;
      let param = {
        "userId": this.userId,
        'pageSize': 10,
        'pageNum': that.pageNum
      }
      this.$axios.post('system/information/getStrategyInformationListWithAll', param).then((res) => {
        if (res.data.code == 200) {
          that.shareDiaryList = res.data.rows;
          that.total = res.data.total;
        }
      }).catch((error) => {
        this.$notify.error({
          title: '错误',
          message: '获取攻略失败！'
        });
      });
    },
    pageChange(pageNum) {
      this.pageNum = pageNum;
      this.getList()
    },
    deleteGl(id) {
      let that = this;
      this.$axios.delete('system/strategy/' + id).then((res) => {
        if (res.data.code == 200) {
          that.getList()
          this.$notify.success({
            title: '成功',
            message: '删除收藏成功！'
          });
        }
      }).catch((error) => {
        this.$notify.error({
          title: '错误',
          message: '删除收藏失败！'
        });
      });
    },
    goGlInfo(item){
      this.$router.push({
        path: '/strategyDetail',
        query: {
          id: item.strategyId,
        }
      });
    }
  },
  mounted() {
    this.getUserInfo();
  },
}
</script>

<style scoped>
.body {
  width: 1150px;
  margin: 20px auto;
}

.searchContent,
.sizerBox {
  width: 1150px;
  margin: 20px auto;

}

.diary_title {
  font-size: 28px;
  /* margin-left: 325px; */
  margin-top: 40px;
  margin-bottom: 40px;
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

.firt_line_div {
  display: flex;
  justify-content: space-between;
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
  width: 1150px;
}

.user_info, .second_line, .share_main {
  width: 1050px;
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
