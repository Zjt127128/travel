// 直接在组件中引入

// dplayer.vue

<template>
  <div :id="flag"></div>
</template>

<script>
import DPlayer from "dplayer";

export default {
  props: {
    flag: {  // 每个dplayer的id不可以重复
      type: String,
      default: "",
    },
    videoUrl:{
      type: String,
      default: ""
    }

  },
  data() {
    return {
      dp: null,
      playedTime: 0,

    };
  },
  mounted() {},
  methods: {
    async init(id) {
      let currentTime = 0;
      let maxTime = 0;
      let src = this.videoUrl;
      this.dp = new DPlayer({
        container: document.getElementById(this.flag),  // 播放器容器元素
        hotkey: true,  // 开启热键，支持快进、快退、音量控制、播放暂停，默认是true
        lang: "zh-cn",  // 可选值：'en'、'zh-cn'、'zh-tw'
        screenshot: false,  // 开启截图，如果开启，视频和视频封面需要允许跨域
        playbackSpeed: [0.75, 1, 1.25, 1.5, 2, 3],  // 可选的视频播放倍速，可以设置自定义的数组
        video: {  // 视频信息，更多可以参考官网：https://dplayer.diygod.dev/zh/guide.html
          url: src,  // 视频地址
        },
      });
      // 监听视频开始播放
      this.dp.on("play", () => {
        let playTime = 0;
        if (
          Number(Math.floor(this.playedTime)) ===
          Number(Math.floor(this.dp.video.duration))
        ) {
          this.playedTime = 0;
          playTime = 0;
        } else if (
          Number(Math.floor(this.dp.video.currentTime)) !==
          Number(Math.floor(this.playedTime))
        ) {
          playTime = this.playedTime;
          this.dp.seek(playTime);
        }
      });
      // 监听视频暂停
      this.dp.on("pause", () => {
        this.playedTime = this.dp.video.currentTime;
      });
      // 设置不可以快进（timeupdate：当前播放位置更改时触发）
      this.dp.on("timeupdate", () => {
        let timeDisplay = this.dp.video.currentTime;
        if (timeDisplay - currentTime > 1) {
          this.dp.video.currentTime =
            currentTime > maxTime ? currentTime : maxTime;
          this.dp.notice("禁止快进", 2000);
        }
        currentTime = this.dp.video.currentTime;
        maxTime = currentTime > maxTime ? currentTime : maxTime;
      });
      // 快进的提示，在禁止快进的提醒存在时不显示
      this.dp.on("notice_show", function (e) {
        var text = e.innerHTML;
        if (
          "禁止快进" != text &&
          (text.indexOf("快进") > -1 || text.indexOf("快退") > -1)
        ) {
          e.style.display = "none";
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
