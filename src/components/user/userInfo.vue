<template>
    <div class="userInfo">
        <el-descriptions border>
            <template slot="extra">
                <el-button type="primary" size="small" @click="openDrawer">编辑</el-button>
            </template>
            <el-descriptions-item label="头像">
                <el-image style="width: 100px; height: 100px" :src="person.avatar" v-if="person.avatar"
                    fit="contain"></el-image>
                <el-image style="width: 100px; height: 100px" v-else fit="contain">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
            </el-descriptions-item>
            <el-descriptions-item label="用户名">{{ person.userName }}</el-descriptions-item>
            <el-descriptions-item label="昵称">{{ person.nickName ? person.nickName : '暂无' }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{ sexdesc }}</el-descriptions-item>
            <el-descriptions-item label="地址">{{ person.address ? person.address : "暂无" }}</el-descriptions-item>
            <el-descriptions-item label="邮箱"> {{ person.email ? person.email : "暂无" }} </el-descriptions-item>
            <el-descriptions-item label="电话号码"> {{ person.phonenumber ? person.phonenumber : "暂无" }}
            </el-descriptions-item>
            <el-descriptions-item label="状态"> {{ status }} </el-descriptions-item>
            <el-descriptions-item label="个人标签">
                <el-tag :key="tag" v-for="tag of person.tags" :disable-transitions="false">
                    {{ tag }}
                </el-tag>
            </el-descriptions-item>
        </el-descriptions>
        <el-drawer title="信息编辑" :before-close="handleClose" :visible.sync="showDialog" direction="rtl"
            custom-class="demo-drawer" ref="drawer">
            <div class="demo-drawer__content">
                <el-form :model="personEdit" :rules="rules" ref="editForm">
                    <el-form-item label="头像" :label-width="formLabelWidth" prop="userName">
                        <el-upload class="avatar-uploader" :action="action" :show-file-list="false"
                            :on-change="beforeAvatarUpload" :auto-upload="false" ref="upload" :headers="uploadHeaders">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar" :on-success="uploadSuccess">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickName">
                        <el-input v-model="personEdit.nickName"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
                        <el-select v-model="personEdit.sex" placeholder="sex" size="medium" clearable>
                            <el-option v-for="item in sexOption" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
                        <el-input v-model="personEdit.address"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                        <el-input v-model="personEdit.email"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码" :label-width="formLabelWidth" prop="phonenumber">
                        <el-input v-model="personEdit.phonenumber"></el-input>
                    </el-form-item>
                    <el-form-item label="标签" :label-width="formLabelWidth" prop="phonenumber">
                        <el-select v-model="personEdit.tag" multiple style="margin-left: 20px;" placeholder="请选择">
                            <el-option v-for="item of tagOption" :key="item.id" :label="item.tagName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="drawer-footer">
                    <el-button @click="cancelForm">取 消</el-button>
                    <el-button type="primary" @click="editUserInfo">
                        确定
                    </el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
export default {
    computed: {
        sexdesc() {
            let sex = this.person.sex
            let sexdesc = "未知";
            switch (sex) {
                case "1":
                    sexdesc = "男";
                    break;
                case "2":
                    sexdesc = "女";
                    break;
                default:
                    '保密'
                    break;

            }
            return sexdesc;
        },
        status() {
            let status = this.person.status
            if (status == 0) {
                return "有效";
            } else if (status == 1) {
                return "无效"
            } else {
                return "未知"
            }
        }
    },
    name: 'userInfo',
    data() {
        return {
            person: {},
            personEdit: {},
            showDialog: false,
            formLabelWidth: '100px',
            sexOption: [{
                value: '0',
                label: '保密'
            }, {
                value: '1',
                label: '男'
            }, {
                value: '2',
                label: '女'
            },],
            imageUrl: "",
            image: "",
            personEditimage: "",
            action: window.API_BASE_URL + 'system/user/profile/avatar',
            uploadHeaders: {
                Authorization: 'Bearer ' + window.localStorage.getItem('access_token'),
            },
            rules: {
                nickName: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                    { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请输入地址', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入电子邮箱', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的电子邮箱格式', trigger: ['blur', 'change'] },

                ],
                phonenumber: [
                    { required: true, message: '请输入电话号码', trigger: 'blur' },
                    { pattern: /^1\d{10}$/, message: '请输入正确的11位电话号码', trigger: ['blur', 'change'] }

                ]
            },
            tagOption: []
        }
    },
    methods: {
        getUserInfo() {
            this.$axios.get('system/user/profile').then((res) => {
                if (res.data.code == 200) {
                    this.person = res.data.data;
                    if (this.person.avatar) {
                        this.person.avatar = window.API_BASE_URL + this.person.avatar.substring(1)
                    }
                }
            }).catch((error) => {
                this.$notify.error({
                    title: '错误',
                    message: '获取用户失败！'
                });
            });
        },
        openDrawer() {
            this.showDialog = true;
            this.personEdit = JSON.parse(JSON.stringify(this.person))
            this.imageUrl = this.personEdit.avatar
        },
        editUserInfo() {
            let that = this;
            this.$refs['editForm'].validate((valid) => {
                if (valid) {
                    this.$axios.put('system/user/profile', this.personEdit).then((res) => {
                        if (res.data.code == 200) {
                            if (!that.imageUrl.startsWith('http')) {
                                that.$refs.upload.submit();
                            }
                            that.getUserInfo()
                            that.showDialog = false;
                            that.$notify({
                                title: '成功',
                                message: '用户信息修改成功！',
                                type: 'success'
                            });
                        }
                    }).catch((error) => {
                        that.$notify.error({
                            title: '错误',
                            message: '用户信息修改失败！'
                        });
                    });
                } else {
                    that.$notify.error({
                        title: '错误',
                        message: '用户信息未通过校验，请检查输入项！'
                    });
                    return false;
                }
            });
        },
        // 抽屉关闭事件
        handleClose() {
            this.showDialog = false;
            this.getUserInfo();
        },
        // 点击表单关闭按钮
        cancelForm() {
            this.showDialog = false
            this.getUserInfo();
        },
        beforeAvatarUpload(file) {
            let that = this;
            if (file) {
                if (!(file.raw.type == 'image/png' || file.raw.type == 'image/jpeg')) {
                    this.$notify.error({
                        title: '错误',
                        message: '仅可上传jpg/png格式图片！'
                    });
                    return;
                }
                const reader = new FileReader();
                reader.onload = function (event) {
                    let result = event.target.result;
                    that.imageUrl = result;
                }.bind(this);
                reader.readAsDataURL(file.raw);
                this.personEditimage = file
            }

        },
        uploadSuccess(response, file) {
            this.$notify({
                title: '成功',
                message: '用户信息修改成功！',
                type: 'success'
            });
        },
        getTag() {
            let that = this;
            this.$axios.get("system/TagInformation/list")
                .then((res) => {
                    that.tagOption = res.data.rows
                }).catch((e) => {
              this.$message.error('获取标签列表失败，请重试！');
                })
        }
    },
    mounted() {
        this.getUserInfo()
        this.getTag()
    },
}
</script>

<style scoped>
.userInfo {
    width: 1150px;
    margin: 20px auto;

}

.drawer-footer {
    display: flex;
    justify-content: center;
}

.el-select {
    display: block;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
</style>
