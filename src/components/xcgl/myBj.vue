<script>
export default {
  components: {},
  name: 'myBJ',
  data() {
    return {
      bjData: [],
      drawer: false,
      bjEdit: {},
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '请输入正文', trigger: 'blur'},
          {min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur'}
        ],
      },
      formLabelWidth: '100px',
      activeName: '',
      addFlag: false,
    }
  },
  methods: {
    getBjInfo() {
      let that = this;
      this.$axios.get("system/note/getlist")
        .then((res) => {
          that.bjData = res.data.rows;
        }).catch((err) => {
        this.$notify.error({
          title: '错误',
          message: '获取笔记信息失败！'
        });
      })
    },
    openBjDrawer() {
      this.drawer = true
      this.addFlag = true
    },
    closeBjDrawer() {
      this.drawer = false
    },
    editBjInfo() {
      let that = this;
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          if (that.addFlag) {
            this.$axios.post('system/note', this.bjEdit).then((res) => {
              if (res.data.code == 200) {
                that.getBjInfo()
                that.closeBjDrawer()
                that.$notify({
                  title: '成功',
                  message: '笔记新增成功！',
                  type: 'success'
                });
              }
            }).catch((error) => {
              that.$notify.error({
                title: '错误',
                message: '笔记新增失败！'
              });
            });
          } else {
            this.$axios.put('system/note', this.bjEdit).then((res) => {
              if (res.data.code == 200) {
                that.getBjInfo()
                that.closeBjDrawer()
                that.$notify({
                  title: '成功',
                  message: '笔记修改成功！',
                  type: 'success'
                });
              }
            }).catch((error) => {
              that.$notify.error({
                title: '错误',
                message: '笔记修改失败！'
              });
            })
          }
          this.getBjInfo()
        } else {
          that.$notify.error({
            title: '错误',
            message: '笔记信息未通过校验，请检查输入项！'
          });
          return false;
        }
      });
    },
    writeBj(bjInfo) {
      this.bjEdit = bjInfo;
      this.drawer = true
      this.addFlag = false
    },
    delBj(bjInfo) {
      let that = this;
      this.$axios.delete("system/note/"+bjInfo.id)
        .then(res => {
          if (res.data.code == 200){
            that.$notify({
              title: '成功',
              message: '笔记删除成功！',
              type: 'success'
            });
          }else {
            that.$notify({
              title: '错误',
              message: '笔记删除错误！',
              type: 'error'
            });
          }
          that.getBjInfo()
        }).catch(error => {
        that.$notify.error({
          title: '错误',
          message: '笔记删除错误！'
        });
        that.getBjInfo()
      })
    }
  },
  mounted() {
    this.getBjInfo()
  },
}

</script>

<template>
  <div>
    <div class="action-button">
      <el-link type="primary" @click="openBjDrawer">添加笔记</el-link>
    </div>
    <div class="content">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item :title="item.title" :name="index" v-for="(item,index) of bjData" :key="item.id">
          <div class="collapseContent">
            <div class="leftBox">
              <el-link class="content">内容:{{ item.content }}</el-link>
              <div class="comment">感悟:{{ item.comment }}</div>
              <div>
                城市：
                <el-tag
                  class="comment"
                  type="success"
                  effect="plain">
                  {{ item.comment }}
                </el-tag>
              </div>
              <div>
                景点：
                <el-tag effect="plain" class="scenicSpot">{{ item.scenicSpot }}</el-tag>
              </div>
            </div>
            <div class="btn">
              <div>
                <el-link type="success" @click="writeBj(item)">编辑</el-link>
              </div>
              <div>
                <el-popconfirm
                  confirm-button-text="删除"
                  cancel-button-text="取消"
                  confirm-button-type="Danger"
                  @confirm="delBj(item)"
                  :title="'确认删除\''+item.title+'\'这条笔记吗？'"
                >
                  <el-link type="danger" slot="reference">删除</el-link>
                </el-popconfirm>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div class="drawer">
      <el-drawer
        title="添加笔记"
        :visible="drawer"
        :before-close="closeBjDrawer"
        direction="rtl">
        <el-form :model="bjEdit" :rules="rules" ref="editForm">
          <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
            <el-input v-model="bjEdit.title" maxlength="20" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
            <el-input type="textarea" :rows="10" v-model="bjEdit.content" maxlength="80" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="感悟" :label-width="formLabelWidth" prop="comment">
            <el-input v-model="bjEdit.comment"></el-input>
          </el-form-item>
          <el-form-item label="城市" :label-width="formLabelWidth" prop="city">
            <el-input v-model="bjEdit.city"></el-input>
          </el-form-item>
          <el-form-item label="景点" :label-width="formLabelWidth" prop="scenicSpot">
            <el-input v-model="bjEdit.scenicSpot"></el-input>
          </el-form-item>
        </el-form>
        <div class="drawer-footer">
          <el-button @click="closeBjDrawer">关闭</el-button>
          <el-button type="primary" @click="editBjInfo">
            确定
          </el-button>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<style scoped>
.drawer-footer {
  display: flex;
  justify-content: center;
}

.action-button {
  display: flex;
  justify-content: end;
}


.content, .scenicSpot, .comment, .content {
  margin: 20px 5px;
}

.collapseContent {
  display: flex;
  justify-content: space-between;
}

.leftBox {
  width: 1000px;
}

.btn {
  display: flex;
  flex-direction: column; /* 主轴方向为垂直 */
  align-items: center; /* 在交叉轴上居中对齐 */
  justify-content: center; /* 在主轴上居中对齐 */
}
</style>
