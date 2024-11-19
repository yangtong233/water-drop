<script setup lang='ts'>
import { reactive } from 'vue';

let arr = reactive<Array<string>>([])

const remove = (index: number) => {
    arr.splice(index, 1)
}
</script>

<template>
    <div>
        <div>
            <span v-for="(item, index) in arr" class="breadcrumb">
                <span>{{ item }}</span>
                <i class="iconfont icon-guanbi icon" @click="remove(index)"></i>
            </span>
        </div>
    </div>
</template>

<style scoped>
span {
    display: inline-block;
    transition: all .3s ease;
}

.breadcrumb {
    display: inline-block;
    margin: 5px;
    min-width: 50px;
    height: 30px;
    background-color: #f6f5ff;
    color: #909399;
    border-radius: 6px;
    line-height: 30px;
    text-align: center;
    font-size: 12px;
    padding: 0 10px;
    transition: all .3s ease;

}

.breadcrumb .icon {
    margin-left: 5px;
    vertical-align: middle;
    border-radius: 50%;
    font-size: 14px;
    display: inline-block;
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 19px;
}

.breadcrumb .icon:hover {
    background-color: #909399;
    color: #FFF;
}
</style>