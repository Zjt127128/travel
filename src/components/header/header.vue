<template>
  <div>
    <div class="top_bar">
      <span v-if="loginFlag" class="firt_level">您好，{{ userInfo.nickName }}|<span
        style="color: #00bcd4; margin-left: 5px"
        class="top_hover_class" @click="logout">注销</span></span>
      <span class="firt_level" v-else>请<span style="color: #0084bb; margin: 0 5px" class="top_hover_class"
                                              @click="goLogin()">登录</span>或<span
        style="color: #00bcd4; margin-left: 5px"
        class="top_hover_class" @click="toReg()">免费注册</span></span>
    </div>
<!--    <div class="top2_bar">-->
<!--      <img src="https://s.qunarzz.com/f_cms/2021/1638865973476_447461838.png" style="width: 130px"-->
<!--           @click="goHome"/>-->
<!--      <div v-for="(item, index) in top2BarList" :key="index" class="top2_bar_item" @click="goPage(item)">-->
<!--        <img :src="item.topImg" v-if="item.topImg" style="position: absolute; top: -15px; left: -10px"/>-->
<!--        <div :style="'color:' + item.color" class="top2_text">-->
<!--          {{ item.itemName }}-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

  </div>
</template>

<script>

import indexTitle from '@/components/index/title/indexTitle.vue';

export default {
  name: 'zjtHeader',
  data() {
    return {
      loginFlag: !!localStorage.getItem('access_token'),
      userInfo: {},
    }
  },
  methods: {
    goLogin() {
      this.$router.push({
        path: '/login'
      });
    },
    toReg() {
      this.$router.push({
        path: '/register'
      });
    },
    goHome() {
      this.$router.push({
        path: '/'
      });
    },
    goPage(path) {
      if (path.skipUrl == "/") {
        for (let iterator of this.top2BarList) {
          iterator.color = "#3c3c3c"
        }
        path.color = "#0088a4"
        if (this.$route.path !== '/') {
          this.$router.push({
            path: path.skipUrl
          });
        }
      }
    },
    logout() {
      localStorage.removeItem('access_token');
      if (this.$route.path == '/') {
        this.$router.go(0);
      } else {
        this.goHome()
      }
    },
    getUserInfo() {
      let flag = this.loginFlag;
      let that = this;
      if (flag) {
        this.$axios.get('system/user/profile', null, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        }).then((res) => {
          if (res.data.code == 200) {
            that.userInfo = res.data.data

          }
        }).catch((error) => {
          this.$notify.error({
            title: '错误',
            message: '获取用户失败！'
          });
        });
      }
    },

  },
  mounted() {
    this.getUserInfo()
  }
}
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

.top3_swiper_bar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1badb6;
  margin-top: 10px;
}
</style>
