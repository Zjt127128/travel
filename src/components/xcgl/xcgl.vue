<template>
    <div>
        <div>
            <zjtHeader />
            <indexTitle />
        </div>
        <div class="searchContent">
            <el-input placeholder="搜攻略" v-model="searchInpt" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <div class="sizerBox">
            <el-row>
                <el-card class="box-card">
                    <div>
                        <span>季度：</span>
                        <el-checkbox-group v-model="sizer" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="item of sizerList" :label="item.quarter" border></el-checkbox>
                        </el-checkbox-group>
                    </div>
                </el-card>
            </el-row>
        </div>
        <div class="glList">
            <div class="part_bottom">
                <div class="diary_title">攻略日记</div>
                <div class="diary_bar">
                    <div class="destination">目的地</div>
                    <div v-for="(item, index) in regionList" :key="index" class="city">
                        {{ item }}
                    </div>
                </div>
                <div class="share_area">
                    <div class="share_item" v-for="(item, index) in shareDiaryList" :key="index">
                        <div class="share_top">
                            <img :src="item.headImg" alt="" class="userHead" />
                            <div class="user_info">
                                <div class="firt_line">
                                    <span class="share_title">{{ item.title }}</span>
                                    <div class="tag1_back" v-if="item.tag1"></div>
                                </div>
                                <div class="second_line">
                                    <div class="second_left">
                                        <span class="nickname">{{ item.nickname }}</span>
                                        <div class="tag2_back" v-if="item.tag1"></div>
                                        <div class="go_date">
                                            <span class="date_detail">{{ item.goDate }}</span><span>出发</span>
                                        </div>
                                        <span class="split">|</span>
                                        <div>共{{ item.totalDate }}天</div>
                                    </div>
                                    <div class="secont_right">
                                        <div class="interact">
                                            <i class="iconfont icon-icon-"></i>{{ item.read }}
                                        </div>
                                        <div class="interact">
                                            <i class="iconfont icon-dianzan"></i>{{ item.great }}
                                        </div>
                                        <div class="interact">
                                            <i class="iconfont icon-31pinglun"></i>{{ item.comment }}
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
                                <img v-for="(e, i) in item.imgList" :src="e" alt="" :key="i"
                                    style="width: 200px; height: 150px; margin-right: 5px" />
                            </div>
                        </div>
                    </div>
                </div>
                <el-pagination background layout="prev, pager, next" :total="10"></el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import zjtHeader from '@/components/header/header.vue';
import indexTitle from '@/components/index/title/indexTitle.vue';
export default {
    components: {
        zjtHeader,
        indexTitle,
    },
    name: 'xcgl',
    data() {
        return {
            searchInpt: '',
            sizer: [],
            sizerList: [
                { "quarter": "一季度", "num": "1" },
                { "quarter": "二季度", "num": "2" },
                { "quarter": "三季度", "num": "3" },
                { "quarter": "四季度", "num": "4" },
            ],
            shareDiaryList: [
                {
                    headImg:
                        "https://qcommons.qunar.com/headshot/headshotsById/71654.png?m&ssl=true",
                    title: "【辽西】初春巡礼，辽代建筑的土木华章",
                    nickname: "太空精灵儿",
                    tag1: "文艺范",
                    tag2: "聪明旅行家",
                    read: "91",
                    great: "0",
                    comment: "0",
                    goDate: "2024-03-16",
                    totalDate: "5",
                    duringBegin: "朝阳",
                    duringEnd: "北镇",
                    eventBegin: "城隍庙",
                    eventEnd: "医巫闾山",
                    imgList: [
                        "https://tr-osdcp.qunarzz.com/tr_osd_tr_hy/tr-osd-tr-space-img_da5737babd27fbdff90884e5b2b566c3.jpg_200x150x95_74b47f11.jpg",
                        "https://tr-osdcp.qunarzz.com/tr_osd_tr_hy/tr-osd-tr-space-img_567387ea74947b885b2b7100d56e083a.jpg_200x150x95_09fb188b.jpg",
                        "https://tr-osdcp.qunarzz.com/tr_osd_tr_hy/tr-osd-tr-space-img_30c51b7fe72f20bb6c2a075765dcbd15.jpg_200x150x95_0d757b45.jpg",
                        "https://tr-osdcp.qunarzz.com/tr_osd_tr_hy/tr-osd-tr-space-img_b1d18f962f824a6320117b44abe3e704.jpg_200x150x95_c520a639.jpg",
                    ],
                },
                {
                    headImg:
                        "https://qcommons.qunar.com/headshot/headshotsById/148873637.png?m&ssl=true",
                    title: "五千年的穿越之旅  2024春节埃及4城游",
                    nickname: "烂烂的布头",
                    tag1: "文艺范",
                    tag2: "聪明旅行家",
                    read: "2490",
                    great: "1",
                    comment: "0",
                    goDate: "2024-02-14",
                    totalDate: "7",
                    imgList: [
                        "https://tr-osdcp.qunarzz.com/tr_osd_tr_hy/tr-osd-tr-space-img_93f68730604eec9b75cffb57a8f83ba9.jpg_200x150x95_4e977e87.jpg",
                        "https://tr-osdcp.qunarzz.com/tr_osd_tr_hy/tr-osd-tr-space-img_0bd7845b61ec1d5712d20d9e75765600.jpeg_200x150x95_70a8735a.jpeg",
                        "https://tr-osdcp.qunarzz.com/tr_osd_tr_hy/tr-osd-tr-space-img_e87b4b37541947920ae883e4189b6e30.jpeg_200x150x95_6465cfb0.jpeg",
                        "https://tr-osdcp.qunarzz.com/tr_osd_tr_hy/tr-osd-tr-space-img_8da9a08a697b62d5c561488d391ceedd.jpeg_200x150x95_2ee7919b.jpeg",
                    ],
                },
            ],
            regionList: [
                "全部",
                "成都",
                "上海",
                "重庆",
                "西安",
                "北京",
                "杭州",
                "长沙",
                "三亚",
                "青岛",
                "深圳",
            ],
        }
    },
    methods: {
        handleCheckedCitiesChange(value) {
            console.log(value);
            console.log(this.sizer);
        }
    }
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
    margin-left: 325px;
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
    margin-left: 325px;
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
</style>