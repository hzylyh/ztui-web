<template>
  <div class="wrapper">
    <div class="panel">
      <div v-for="(item, index) in 4" class="card-container">
        <ElCard shadow="hover"
                class="card">
        </ElCard>
      </div>
    </div>
    <div class="table-container">dd</div>
  </div>

</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {Ref} from "vue";
import {getResult} from "@/api/dashboard";
import {GetResultReq} from "@/api/model";


const btRef = ref('')

interface TData {
  date: string,
  name: string,
  address?: string
}

const tableData: Array<TData | string> = new Array<TData | string>()

//yi
let c: Ref<number>
c = ref(0)

onMounted(() => {
  initData()

})

function initData() {
  const reqInfo: GetResultReq = {

  }
  // getResult(reqInfo).then(response: TData => {
  //   console.log(response)
  // })
}

function test(arr: Array<Array<number>>, type: string): Array<number> {
  let typeMap: Record<string, number> = {
    'x': 0,
    'y': 1
  }
  let res: Array<number> = []
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i][typeMap[type]] > arr[i+1][typeMap[type]]) {
      res = arr[i]
    } else {
      res = arr[i + 1]
    }
  }
  return res
}

function handleClick() {
  console.log('ddd')
  console.log(btRef)
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  .panel {
    height: 150px;
    display: flex;
    flex-wrap: wrap;
    .card-container {
      height: 100%;
      max-width: 25%;
      flex: 0 0 25%;
      //padding-left: 10px;
      //padding-right: 10px;
      .card {
        //width: 100%;
        margin-left: 5px;
        margin-right: 5px;
        height: 100%;
      }
    }
  }
  .table-container {
    height: calc(100% - 150px);
  }
}

</style>
