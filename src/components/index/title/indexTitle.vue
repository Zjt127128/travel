<template>
  <div>
    <div class="top3_swiper_bar">
      <div class="top3_swiper_bar_center">
        <div class="top3_swiper_bar_pad">
          <div class="swiper_bar_item" :style="item.color ? 'background-color: ' + item.color + ';' : ''"
               v-for="(item, index) in topBar3Swiper" :key="index" @click="goPage(item)">
            <span>{{ item.itemName }}</span>
          </div>
        </div>
        <div class="top3_swiper_bar_input">
          <el-input placeholder="搜目的地/攻略" v-model="searchInpt" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="searchGl"></el-button>
          </el-input>
        </div>

      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      searchInpt: "",
      topBar3Swiper: [
        {itemName: "攻略首页", skipUrl: "/glIndex", color: "#0d9199"},
        {itemName: "攻略库", skipUrl: "/glWarehouse", color: ""},
        {itemName: "攻略vlog", skipUrl: "/glVlog", color: ""},
        {itemName: "发表行程攻略", skipUrl: "/xcgl", color: ""},
        {itemName: "个人中心", skipUrl: "/glPerson", color: ""},
      ],
    }
  },
  methods: {
    goPage(path) {
      if (this.$route.path !== path.skipUrl) {
        this.$router.push({
          path: path.skipUrl
        });
      }
    },
    searchGl() {
      this.$emit('searchData', this.searchInpt);
    },
    setMenu() {
      for (let iterator of this.topBar3Swiper) {
        if (iterator.skipUrl == this.$route.path) {
          iterator.color = "#0d9199"
        } else {
          iterator.color = ""
        }
      }
    }
  },
  mounted() {
    this.setMenu()
  },
}
</script>

<style scoped>
.top3_swiper_bar {
  background-color: #1badb6;

}

.top3_swiper_bar_center {
  margin: auto;
  width: 1150px;
  display: flex;
  justify-content: space-between;

  align-items: center;
}

.top3_swiper_bar_pad {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 10px;
}

.el-input-group {
  width: 300px;
}

.swiper_bar_item {
  padding: 15px 40px;
  color: #fff;
}

.swiper_bar_item:hover {
  background-color: #0d9199;
  cursor: pointer;
}
</style>
