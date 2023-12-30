<script lang="ts" setup>
definePageMeta({
    middleware: ['checkauth']
})
</script>
<script lang="ts">
import { collection, getCountFromServer, getFirestore, query, where } from 'firebase/firestore';
const documentStyle = getComputedStyle(document.documentElement);
export default {
  data() {
    return {
      totalpersoncount: 0,
      todaypersoncount: 0,
      totaldevicetokencount: 0,
      todaydevicetokencount: 0,
      summarycolors: [
        documentStyle.getPropertyValue('--red-500'),
        documentStyle.getPropertyValue('--green-500'),
        documentStyle.getPropertyValue('--yellow-500'),
        documentStyle.getPropertyValue('--bluegray-500'),
        documentStyle.getPropertyValue('--blue-500'),
       ],
      summarydatas: <any>{},
      chartdata: {
        labels: <string[]>[],
        datasets: <object[]>[],
      },
    }
  },
  async mounted() {
    this.totalpersoncount = (await getCountFromServer(query(collection(getFirestore(), 'persons')))).data().count;
    let q = query(collection(getFirestore(), 'persons'));
    let yesterday = new Date();
    yesterday = new Date(yesterday.toLocaleTimeString('ja-JP', {year: 'numeric', month: '2-digit', day: '2-digit',}).split(' ')[0] + ' 00:00:00');
    q = query(q, where('registerdate', '>=', yesterday));
    this.todaypersoncount = (await getCountFromServer(q)).data().count;
    this.totaldevicetokencount = (await getCountFromServer(query(query(collection(getFirestore(), 'persons')), where('isdevicetoken', '==', true)))).data().count;
    this.todaydevicetokencount = (await getCountFromServer(query(query(query(collection(getFirestore(), 'persons')), where('registerdate', '>=', yesterday)), where('isdevicetoken', '==', true)))).data().count;

    // 直近7日間の通知の開封率
    const now = new Date();
    for (let didx=0; didx < 7; didx++) {
      const targetday = new Date(new Date().setDate(now.getDate() - (6 - didx))).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', })
      this.chartdata.labels.push(targetday);
      console.log('targetday=', targetday);
      const summary = await fastfirestore().getinstance().gets('summary', [['targetday', '==', targetday.replace('/', '-').replace('/', '-')]], this.summarycolors.length, null);
      console.log('summary=', summary);
      for (let sidx=0; sidx < summary.total; sidx++) {
        const notify = summary.docs[sidx].data();
        console.log('notify=', notify);
        if (!this.summarydatas[notify.targetuid + '<>' + notify.label]) {
          this.summarydatas[notify.targetuid + '<>' + notify.label] = {};
        }
        this.summarydatas[notify.targetuid + '<>' + notify.label][notify.targetday.replace('-', '/').replace('-', '/')] = notify.openperseint;
        console.log('this.summarydatas1=', this.summarydatas);
      }
    }
    console.log('this.summarydatas2=', this.summarydatas);
    const summaryuids = Object.keys(this.summarydatas);
    for (let sidx=0; sidx < summaryuids.length; sidx++) {
      const summarylabel = summaryuids[sidx].split('<>')[1];
      const summardata = this.summarydatas[summaryuids[sidx]];
      const dataset = { label: summarylabel, data: <number[]>[], fill: false, backgroundColor: this.summarycolors[sidx], borderColor: this.summarycolors[sidx], tension: 0.4, };
      let beforedata = 0;
      for (let didx=0; didx < 7; didx++) {
        const targetday = new Date(new Date().setDate(now.getDate() - (6 - didx))).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', })
        if (this.summarydatas[summaryuids[sidx]][targetday]) {
          dataset.data.push(this.summarydatas[summaryuids[sidx]][targetday]);
          beforedata = this.summarydatas[summaryuids[sidx]][targetday];
        }
        else {
          dataset.data.push(beforedata);
        }
      }
      this.chartdata.datasets.push(dataset);
    }
  },
}
</script>

<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-6">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <h4 class="block font-medium mb-3">総ユーザー数</h4>
            <div class="text-900 font-medium text-xl">
              {{ totalpersoncount }} 人
            </div>
          </div>
          <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width:2.5rem;height:2.5rem">
            <i class="pi pi-users text-blue-500 text-xl" />
          </div>
        </div>
        <span class="text-500">本日の登録者数 </span>
        <span class="text-green-500 font-medium">{{ todaypersoncount }} 人</span>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-6">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <h4 class="block font-medium mb-3">総通知登録者数</h4>
            <div class="text-900 font-medium text-xl">
              {{ totaldevicetokencount }}
            </div>
          </div>
          <div class="flex align-items-center justify-content-center bg-green-100 border-round" style="width:2.5rem;height:2.5rem">
            <i class="pi pi-send text-green-500 text-xl" />
          </div>
        </div>
        <span class="text-500">本日の登録者数 </span>
        <span class="text-green-500 font-medium">{{ todaydevicetokencount }} 人</span>
      </div>
    </div>

    <div class="col-12 mt-5">
      <div class="card">
        <h5>開封率(直近7日間)</h5>
        <Chart type="line" :data="chartdata" :options="{ responsive: true, maintainAspectRatio: false, }" class="h-30rem"/>
      </div>
    </div>
</div>
</template>
