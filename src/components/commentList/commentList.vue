<!-- CommentList.vue -->
<template>
  <div style="letter-spacing: 1px">
    <div class="head">
      <!-- 评论区域如果当前用户有头像则显示头像,没有则显示默认头像 -->
      <img v-if="picture" :src="`http://4h6p310736.vicp.fun` + picture" alt="" />
      <img v-else src="@/assets/strategyDetial/defaultHead.png" />
      <!-- 评论框 -->
      <input
        type="text"
        placeholder="请输入评论 . . ."
        ref="input"
        v-model="form.content"
        @keyup.enter="sumbit"
      />
      <!-- 发布按钮 -->
      <button @click="sumbit">发表评论</button>
    </div>
    <div class="content">
      <!-- 一级评论 -->
      <div class="first" v-for="(item, index) in comments" :key="index">
        <a href="javascript:;" class="first-img">
          <!-- 如果当前用户有头像则显示头像,没有则显示默认头像 -->
          <!-- <img :src="`http://` + item.picture" /> -->
          <img v-if="item.avatar" :src="`http://4h6p310736.vicp.fun` + item.avatar" alt="" />
          <img v-else src="@/assets/strategyDetial/defaultHead.png" />
        </a>
        <div class="first-content">
          <!-- 一级评论用户昵称 -->
          <h6 class="first-username">{{ item.userName }}</h6>
          <!-- 一级评论发布时间 -->
          <span class="first-time">{{ item.createTime }}</span>
          <!-- 一级评论评论内容 -->
          <p class="first-comment">
            {{ item.content }}
          </p>
          <!-- 一级评论评论点赞 -->
          <div
            class="first-right"
          >
            <span
              class="delete"
              v-if="item.delete"
              @click="comment_delete(item, 0)"
            >删除</span
            >
            <span class="comments" @click="comment_input(item)">评论</span>
          </div>
          <!-- 回复一级评论 -->
          <div class="reply-comment" v-if="item.display">
            <input
              type="text"
              placeholder="请输入评论 . . ."
              v-model="childrenContent"
              @keyup.enter="reply_sumbit(item, 0)"
            />
            <!-- 0为回复一级评论 -->
            <button @click="reply_sumbit(item, 0)">发表评论</button>
          </div>
          <!-- 次级评论 -->
          <div class="second">
            <ul>
              <li v-for="(sons, index) in item.sons" :key="index">
                <div class="top">
                  <!-- 次级评论头像,该用户没有头像则显示默认头像 -->
                  <a href="JavaScript:;" class="second-img">
                    <img v-if="sons.avatar" :src="`http://4h6p310736.vicp.fun` + sons.avatar" />
                    <img v-else src="@/assets/strategyDetial/defaultHead.png" />
                  </a>
                  <div class="second-content">
                    <!-- 次级评论用户昵称 -->
                    <h6 class="second-username">{{ sons.userName }}</h6>
                    <!-- 次级评论评论时间 -->
                    <span class="second-time">{{ sons.createTime }}</span>
                    <!-- 次级评论内容 xxx回复xxx：评论内容-->
                    <p class="second-comment">
                      <span class="second-reply">
                        <span class="to_reply">{{ sons.username }}</span>
                        回复
                        <span class="to_reply">{{ sons.to_username }}</span
                        >：
                      </span>
                      {{ sons.content }}
                    </p>
                  </div>
                </div>
                <!-- 回复次级评论 -->
                <div class="reply-comment reply_li" v-if="sons.display">
                  <input
                    type="text"
                    placeholder="请输入评论 . . ."
                    v-model="childComments"
                    @keyup.enter="reply_sumbit(sons, 1)"
                  />
                  <!-- 1为回复次级评论 -->
                  <button @click="reply_sumbit(sons, 1)">发表评论</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 暂无评论的空状态 -->
      <el-empty description="暂无评论" v-if="show"></el-empty>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    strategyId:{
      type: String,
      required: true
    }
  },
  data(){
    return{
      show:false,
      picture:'',
      form:{
        carsId:'',
        userId:'',
        content:'',
        avatar:'',
        parentId:''
      },
      childrenContent:'',
      user:{},
      comments:[]
    }
  },
  created() {
    this.getUser()
    this.getStrategyComment()
  },
  methods: {
    comment_input(item){
      item.display = true
    },
    getUser() {
      this.$axios.get('system/user/profile').then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.data;
          if (this.user.avatar) {
            this.picture = this.user.avatar
          }
        }
      }).catch((error) => {
        this.$notify.error({
          title: '错误',
          message: '获取用户失败！'
        });
      });
    },
    sumbit(){
      let param = {
        strategyId: this.strategyId,
        content: this.form.content,
        parentId: -1
      }
      this.$axios.post('/system/commentinformation',param,{}).then((res)=>{
        this.$notify({
          title: '成功',
          message: '评论成功！',
          type: 'success'
        });
        this.getStrategyComment()
      })
    },
    reply_sumbit(item, type){
      let param = {
        strategyId: this.strategyId,
        content: this.childrenContent,
        parentId: item.id
      }
      this.$axios.post('/system/commentinformation',param,{}).then((res)=>{
        this.$notify({
          title: '成功',
          message: '评论成功！',
          type: 'success'
        });
        this.getStrategyComment()
      })
    },
    getStrategyComment(){
      this.$axios
        .get("/system/commentinformation/getCommentInformation/" + this.strategyId, null, {})
        .then((res) => {
          if(res&&res.data&&res.data.code&&res.data.code=='200'){
            this.comments = res.data.rows
          }

        })
    }
  }
};
</script>

<style>
.comment-list {
  width: 100%;
}

.comment {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.comment-details {
  flex: 1;
}

.comment-content {
  margin-bottom: 5px;
}

.comment-time {
  font-size: 0.8em;
  color: #999;
}
/* 评论框 */
.head {
  background-color: rgb(248, 248, 248);
  position: relative;
  height: 75px;
  border-radius: 5px;
}
.head img {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  left: 13px;
}
/* 评论框 */
.head input {
  position: absolute;
  top: 13px;
  left: 80px;
  height: 45px;
  border-radius: 5px;
  outline: none;
  width: 65%;
  font-size: 20px;
  padding: 0 20px;
  border: 2px solid #f8f8f8;
}
/* 发布评论按钮 */
.head button {
  position: absolute;
  top: 13px;
  right: 20px;
  width: 120px;
  height: 48px;
  border: 0;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 500;
  color: #fff;
  background-color: rgb(118, 211, 248);
  cursor: pointer;
  letter-spacing: 2px;
}
/* 鼠标经过字体加粗 */
.head button:hover {
  font-weight: 600;
}

/* 评论内容区域 */
.content .first {
  display: flex;
  position: relative;
  padding: 10px 10px 0px 0;
}
.first .first-img {
  flex: 1;
  text-align: center;
}
.first img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.first-username,
.second-username {
  color: #504f4f;
}
.first-content {
  flex: 9;
}
.first-time,
.second-time {
  color: #767575;
}
.first-comment,
.second-comment {
  margin-top: 5px;
}
/* 右边点赞和评论 */
.first-right,
.second-right {
  position: absolute;
  right: 1%;
  top: 10px;
}
.first-right span,
.second-right span {
  margin-right: 20px;
  cursor: pointer;
}
/* 删除评论 */
.delete:hover {
  color: red;
}
/* 评论字体图标 */
.comments::before {
  /* 想使用的icon的十六制编码，去掉&#x之后的 */
  content: "\e8b9";
  /* 必须加 */
  font-family: "iconfont";
  margin-right: 4px;
  font-size: 16px;
}
/* 点赞字体图标 */
.praise::before {
  /* 想使用的icon的十六制编码，去掉&#x之后的 */
  content: "\ec7f";
  /* 必须加 */
  font-family: "iconfont";
  margin-right: 4px;
  font-size: 19px;
}
.second {
  background-color: #f3f3f3;
  margin-top: 10px;
}
.second li {
  padding: 10px 10px 10px 0;
  border-bottom: 1px solid rgb(237, 237, 237);
}
.second .top {
  display: flex;
  position: relative;
}
.second-img {
  flex: 1;
  text-align: center;
}
.to_reply {
  color: rgb(106, 106, 106);
}
.second-content {
  flex: 9;
}
.second .reply_li {
  margin-left: 70px;
}
/* 评论框 */
.reply-comment {
  margin: 10px 0 0 0;
}
.reply-comment input {
  height: 40px;
  border-radius: 5px;
  outline: none;
  width: 70%;
  font-size: 18px;
  padding: 0 20px;
  /* border: 2px solid #f8f8f8; */
  border: 2px solid skyblue;
}
/* 发布评论按钮 */
.reply-comment button {
  width: 15%;
  height: 43px;
  border: 0;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  background-color: rgb(118, 211, 248);
  cursor: pointer;
  letter-spacing: 2px;
  margin-left: 20px;
}
/* 鼠标经过字体加粗 */
.reply-comment button:hover {
  font-weight: 600;
}
/* 评论点赞颜色 */
.comment-like {
  color: red;
}
</style>
