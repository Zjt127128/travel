<template>
    <div>
        <div>
            <zjtHeader />
            <indexTitle />
        </div>
        <div class="tabsDiv">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="用户管理" name="userinfo">
                    <userInfo />
                </el-tab-pane>
                <el-tab-pane label="景点收藏" name="second">
                    <collectionAttractions />
                </el-tab-pane>
                <el-tab-pane label="攻略收藏" name="third">
                    <glList />
                </el-tab-pane>
                <el-tab-pane label="我的攻略" name="fourth">
                    <myGl />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import zjtHeader from '@/components/header/header.vue';
import indexTitle from '@/components/index/title/indexTitle.vue';
import userInfo from '@/components/user/userInfo.vue';
import collectionAttractions from '@/components/collect/collectionAttractions.vue';
import glList from '@/components/glList/glList.vue';
import myGl from '@/components/xcgl/myGl.vue';
export default {
    components: {
        zjtHeader,
        indexTitle,
        userInfo,
        collectionAttractions,
        glList,
        myGl,
    },
    name: 'glPerson',
    data() {
        return {
            activeName:'userinfo'
        }
    },
    methods: {
        
    },
    mounted() {

    },
}
</script>

<style scoped>
.tabsDiv {
    width: 1150px;
    margin: 20px auto;
}
</style>