<template>
    <div style="position: relative;width: 100%;height: 100%">
        <zjtHeader />
      <img src="@/assets/login/background.png" style="width: 100%;height: 100%">
        <div class="loginDiv">
            <div class="loginBox">
                <div class="loginTitle">
                    <h2>注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</h2>
                </div>
                <el-row>
                    <el-col :span="22" :offset="1">
                        <el-input placeholder="请输入用户名" v-model="person.username" class="username">
                            <i slot="prefix" class="el-input__icon el-icon-user"></i>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22" :offset="1">
                        <el-input placeholder="请输入密码" v-model="person.password" show-password class="password">
                            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22" :offset="1">
                        <el-input placeholder="请重新输入密码" v-model="person.surepassword" show-password
                            class="surepassword">
                            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22" :offset="1">
                        <el-input placeholder="请输入地址" v-model="person.address" class="address">
                            <i slot="prefix" class="el-input__icon el-icon-house"></i>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22" :offset="1">
                        <el-input placeholder="请输入邮箱" v-model="person.email" class="email">
                            <i slot="prefix" class="el-input__icon el-icon-message"></i>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-input placeholder="请输入验证码" v-model="captchaCode" class="password">
                            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                        </el-input>
                    </el-col>
                    <el-col :span="9" :offset="3">
                        <el-image :src="'data:image/png;base64,' + captchaImage" class="captchaImage"
                            @click="getCaptchaImage()"></el-image>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22" :offset="1">
                        <el-button type="success" @click="reg" class="regbtn">注册</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22" :offset="1">
                        <h5>已有帐号？ <el-link type="primary" @click="goLogin">去登录</el-link></h5>
                    </el-col>
                </el-row>

            </div>
        </div>
    </div>
</template>

<script>

import zjtHeader from '@/components/header/header.vue';
export default {
    components: {
        zjtHeader
    },
    data() {
        return {
            person: {
                username: "",
                password: "",
                surepassword: "",
                address: "",
                email: "",
            },
            captchaUuid:'',
            captchaImage:'',
            captchaCode:''
        };
    },
    methods: {
        goLogin() {
            this.$router.push({
                path: '/login'
            });
        },
        reg() {
            let param = JSON.parse(JSON.stringify(this.person))
            param.uuid = this.captchaUuid;
            param.code = this.captchaCode;
            this.$axios.post('register', param, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then((data) => {
                if (data.data.code == 200) {
                    // window.localStorage.setItem('access_token', data.data.token);
                    this.$router.push({
                        path: '/login'
                    });
                } else {
                  this.$message.error('注册失败，请重试！');
                }
            }).catch((error) => {
              this.$message.error('注册失败，请重试！');
            });
        },
        getCaptchaImage(){
            this.$axios.get('captchaImage', null, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then((data) => {
                if (data.data.code == 200) {
                    this.captchaImage = data.data.img
                    this.captchaUuid = data.data.uuid
                } else {
                    this.$message.error('验证码获取失败，请重试！');
                }
            }).catch((error) => {
                this.$message.error('验证码获取失败，请重试！');
            });
        }
    },
    computed: {

    },
    mounted() {
        this.getCaptchaImage()
    },
};
</script>
<style scoped>
.loginDiv {
    /* 使用rgba设置淡灰色背景，并赋予一定的透明度 */
    backdrop-filter: blur(10px);
    /* 如果需要毛玻璃效果 */
    -webkit-backdrop-filter: blur(10px);
    /* 对 Safari 浏览器的支持 */
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    /* 为了水平和垂直居中，假设内容是flexible的 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loginBox {
    width: 600px;
    height: 700px;
    background-color: rgba(200, 200, 200, 0.2);
}

.loginTitle {
    display: flex;
    justify-content: center;
    padding-top: 30px;
    padding-bottom: 30px;
    border-bottom: 2px #fff solid;
}

.loginTitle h2 {
    color: #000;
}

.username,
.password,
.surepassword,
.address,
.email {
    margin-top: 40px;
}

.loginbtn,
.regbtn {
    width: 550px;
    margin-top: 30px;
}

.captchaImage {
    margin-top: 30px;
}
</style>
