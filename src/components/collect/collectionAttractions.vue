<template>
    <div class="collectionAttractions">
        <div class="jdContent">
            <el-collapse v-model="activeName" accordion v-for="item of jdList" :key="item.id">
                <el-collapse-item :title="item.attractions" :name="item.id">
                    <el-row style="margin: 20px;margin-right: 0;">
                        <el-col :span="1" :offset="23">
                            <el-popconfirm confirm-button-text='删除' cancel-button-text='取消' icon="el-icon-info"
                                icon-color="red" :title="'确定删除\'' + item.attractions + '\'这个景点收藏吗？'"
                                @confirm="deleteJd(item.id)">
                                <!-- <el-button type="danger" slot="reference">删除</el-button> -->
                                <el-link type="danger" slot="reference">删除</el-link>
                            </el-popconfirm>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="6" v-for="(iterator,index) of item.attractionsUrls" :key="index">
                            <el-image :src="iterator" style="width: 100%;height: 100%;"
                                :preview-src-list="item.attractionsUrls"></el-image>
                        </el-col>
                    </el-row>
                </el-collapse-item>
            </el-collapse>

        </div>
    </div>
</template>
<script>
export default {
    computed: {

    },
    name: 'collectionAttractions',
    data() {
        return {
            jdList: [],
            activeName: '',
            baseUrl: window.API_BASE_URL.substring(0, window.API_BASE_URL.length - 1),
        }
    },
    methods: {
        getList() {
            let that = this
            this.$axios.get('system/attractions/list', null, {
            }).then((res) => {
                let data = JSON.parse(JSON.stringify(res.data.rows))
                for (let iterator of data) {
                    let imgList = []
                    for (let iteratorImg of iterator.attractionsUrls) {
                        let img = that.baseUrl + iteratorImg
                        imgList.push(img)
                    }
                    iterator.attractionsUrls = imgList;
                }
                debugger
                if(data && data.length > 0){
                  that.activeName = data[0].id
                }
                that.jdList = data
            }).catch((error) => {
                this.$notify.error({
                    title: '错误',
                    message: '获取景点收藏列表失败！'
                });
            });
        },
        deleteJd(id) {
            let that = this;
            this.$axios.delete('system/attractions/' + id).then((res) => {
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
        }
    },
    mounted() {
        this.getList()
    },
}
</script>

<style scoped>
.collectionAttractions {
    width: 1150px;
    margin: 20px auto;
}
</style>
