<script lang="ts">
import { DocumentData } from 'firebase-admin/firestore';
import { serverTimestamp, FieldValue } from 'firebase/firestore';
import { StringLiteralLike } from 'typescript';
import * as application from '~/modules/application/application';

const configure = useRuntimeConfig().public;
const { loadingcount, showLoading, hideLoading, hideLoadingForce } = loader();
const { $firebaseApp } = useNuxtApp();

type One = { uid: string, label: string, title: string, body: string, link: string, notified: boolean, summarycount: number, sendperseint: number, reciveperseint: number, openperseint: number, targetpersons: string, sendpersons: [], recivepersons: [], openpersons: [], targetdate: Date, registerdate: FieldValue, modifydate: FieldValue, available: boolean, method: string, };

export default {
  data() {
    return {
      isSp: false,
      windowsize: 0,
      tableheigth: 100,
      spsearchDialog: false,
      detailDialog: false,
      removeDialog: false,
      isnew: false,
      isdetail: false,
      targetall: false,
      one: <One>{},
      cluster: <Array<One>>[],
      page: 0,
      rows: 0,
      loading: false,
      searchword: '',
      perpagerecords: 100,
      totalrecords: 0,
      currentmaxpage: 0,
      currentorderfield: 'registerdate',
      currentorderAD: 'desc',
      submitted: false,
    };
  },
  updated() {
    this.windowsize = window.innerWidth;
    this.tableheigth = window.innerHeight - 302;
    if (767 >= this.windowsize) {
      this.isSp = true;
      this.tableheigth = window.innerHeight - 262;
    }
  },
  async mounted() {
    if (fastfireauth().role.value < 100) {
      // アクセス拒否
      navigateTo('/');
    }
    window.addEventListener('resize', this.resizeWindow);
    await this.search(null);
  },
  methods: {
    resizeWindow () {
      this.windowsize = window.innerWidth;
      this.tableheigth = window.innerHeight - 302;
      if (767 >= this.windowsize) {
        this.isSp = true;
        this.tableheigth = window.innerHeight - 262;
      }
    },
    async showEdit(docindex: number|null) {
      console.log('docindex=', docindex);
      this.isnew = true;
      this.isdetail = false;
      this.targetall = false;
      this.one = <One>{};
      let now = new Date();
      now.setSeconds(0);
      this.one.targetdate = now;
      this.one.targetpersons = '';
      this.submitted = false;
      if (null !== docindex) {
        const doc = <DocumentData>this.cluster[docindex];
        if (doc) {
          this.isnew = false;
          this.isdetail = true;

          showLoading();
          const _doc = await fastfirestore().getinstance().get('notifications', doc.id);
          hideLoading();
          if (!_doc) {
            // XXX あり得ないので無視
            return;
          }
          this.one = _doc.data();
          this.one.targetdate = (<any>this.one.targetdate).toDate();
        }
      }
      console.log('this.one=', this.one);
      this.detailDialog = true;
    },
    confirmRemove(docindex: number) {
      console.log('docindex=', docindex);
      const doc = <DocumentData>this.cluster[docindex];
      if (doc) {
        this.one = doc.data();
      }
      this.removeDialog = true;
    },
    async search(arglastdoc: DocumentData|null) {
      console.log('arglastdoc=', arglastdoc);
      console.log('searchword=', this.searchword);
      try {
        this.loading = true;
        let whereis = [];
        if (!arglastdoc) {
          this.totalrecords = 0;
          this.currentmaxpage = 0;
          this.cluster = [];
          // ページング以外の検索時にページングを強制リセット
          const datatable = <any>this.$refs.dt;
          datatable.resetPage();
        }
        if ('string' == typeof this.searchword && 0 < this.searchword.length) {
          whereis.push(['email', '==', this.searchword]);
        }
        whereis.push(['available', '==', true]);
        console.log('whereis=', whereis);
        const result = await fastfirestore().getinstance().gets('notifications', whereis, [[this.currentorderfield, this.currentorderAD]], this.perpagerecords, arglastdoc);
        console.log('result=', result);
        if (result.total) {
          this.totalrecords = result.total;
          this.cluster = this.cluster.concat(result.docs);
        }
        this.rows = this.perpagerecords;
        console.log('this.totalrecords=', this.totalrecords);
        console.log('this.cluster=', this.cluster);
        return true;
      }
      catch (error) {
        console.error('error=', error);
        return false;
      }
      finally {
        this.spsearchDialog = false;
        // XXX チラチラすると気持ち悪いのであえてちょっと非表示まで時間を掛ける
        setTimeout(() => {
          const _docs1 = document.getElementsByClassName('p-selectable-row');
          console.log('_docs1=', _docs1);
          if (_docs1) {
            for (var didx=0; didx < _docs1.length; didx++) {
              if (_docs1[didx]) {
                _docs1[didx].classList.add('nodata');
                _docs1[didx].classList.remove('isdata');
              }
            }
          }
          const _docs2 = document.getElementsByClassName('isdataresolve');
          console.log('_docs2=', _docs2);
          if (_docs2) {
            for (var didx=0; didx < _docs2.length; didx++) {
              if (_docs2[didx] && _docs2[didx].parentElement && _docs2[didx].parentElement) {
                _docs2[didx].parentElement?.parentElement?.classList.remove('nodata');
                _docs2[didx].parentElement?.parentElement?.classList.add('isdata');
              }
            }
          }
          this.loading = false;
        }, 200);
      }
    },
    async save() {
      this.submitted = true;
      if (!(this.one.title && this.one.title.trim())) {
        return false;
      }
      if (!(this.one.body && this.one.body.trim())) {
        return false;
      }
      if (!this.targetall) {
        if (!(this.one.targetpersons && this.one.targetpersons.trim())) {
          return false;
        }
      }
      console.log('this.one.targetdate=', this.one.targetdate);
      let isnew = false;
      if (!this.one.uid) {
        // 追加
        this.one.sendpersons = [];
        this.one.recivepersons = [];
        this.one.openpersons = [];
        this.one.notified = false;
        this.one.summarycount = 0;
        this.one.sendperseint = 0;
        this.one.reciveperseint = 0;
        this.one.openperseint = 0;
        this.one.registerdate = serverTimestamp();
        isnew = true;
      }
      if (this.targetall) {
        this.one.targetpersons = '全配信';
      }
      //this.one.targetpersons = this.one.targetpersons.trim();

      console.log('isnew=', isnew);
      this.one.modifydate = serverTimestamp();
      this.one.available = true;

      showLoading();

      try {
        const res = await fastfirestore().getinstance().set('notifications', this.one);
        console.log('res=', res);
        if (!res) {
          if (isnew) {
            throw new Error('notification create fail');
          }
          else {
            throw new Error('notification update fail');
          }
        }
      }
      catch (error: any) {
        alert('保存に失敗しました。\n\n' + error.toLocaleString());
        console.log('Error save notification:', error);
        return;
      }
      finally {
        hideLoading();
      }

      if (isnew) {
        // 追加
        this.$toast.add({ severity: 'success', summary: '正常終了', detail: 'Push通知の予約を追加しました。', life: 3000 });
      }
      else {
        // 更新
        this.$toast.add({ severity: 'success', summary: '正常終了', detail: 'Push通知の予約を更新しました。', life: 3000 });
      }

      this.one = <One>{};
      this.detailDialog = false;
      await this.search(null);
    },
    async remove() {
      if (!this.one.uid) {
        return false;
      }
      showLoading();
      try {
        // 削除
        this.one.modifydate = serverTimestamp();
        this.one.available = false;
        const res = await fastfirestore().getinstance().set('notifications', this.one);
        console.log('res=', res);
        if (!res) {
          throw new Error('auth remove fail');
        }
      }
      catch (error) {
        alert('削除に失敗しました。');
        console.log('Error remove user:', error);
        hideLoading();
        return;
      }
      finally {
        hideLoading();
      }
      this.$toast.add({ severity: 'success', summary: '正常終了', detail: 'Push通知を削除しました。', life: 3000 });
      this.one = <One>{};
      this.removeDialog = false;
      await this.search(null);
    },
    async onRowselect(event: any) {
      console.log('onRowSelect event.index=', event.index);
      this.showEdit(event.index);
    },
    async onPage(event: any) {
      console.log('page event=', event);
      if (this.cluster && this.currentmaxpage < event.page) {
        // まだ未取得のレコードにページングが進んだ場合に、データを追取得する
        const lastdoc = <DocumentData>this.cluster[this.cluster.length - 1];
        if (await this.search(lastdoc)) {
          this.currentmaxpage = event.page;
        }
      }
      else {
        setTimeout(() => {
          const _docs1 = document.getElementsByClassName('p-selectable-row');
          console.log('_docs1=', _docs1);
          if (_docs1) {
            for (var didx=0; didx < _docs1.length; didx++) {
              if (_docs1[didx]) {
                _docs1[didx].classList.add('nodata');
                _docs1[didx].classList.remove('isdata');
              }
            }
          }
          const _docs2 = document.getElementsByClassName('isdataresolve');
          console.log('_docs2=', _docs2);
          if (_docs2) {
            for (var didx=0; didx < _docs2.length; didx++) {
              if (_docs2[didx] && _docs2[didx].parentElement && _docs2[didx].parentElement) {
                _docs2[didx].parentElement?.parentElement?.classList.remove('nodata');
                _docs2[didx].parentElement?.parentElement?.classList.add('isdata');
              }
            }
          }
        }, 200);
      }
      window.scrollTo({ left: 0, top: 0 });
    },
    async onSort(event: any) {
      console.log('event=', event);
      this.currentorderfield = event.sortField;
      this.currentorderAD = (0 < event.sortOrder)? 'asc' : 'desc';
      console.log('this.currentorderAD=', this.currentorderAD);
      await this.search(null);
    },
    async alert(argmsg: string) {
      alert(argmsg);
    }
  },
};
</script>
<script lang="ts" setup>
definePageMeta({
    middleware: ['checkauth']
})
</script>

<template>
  <div class="grid crud-demo">
    <div class="col-12">
      <div class="card">
        <Toast />

        <DataTable
          ref="dt"
          :value="cluster"
          :page="page"
          lazy
          paginator
          :scrollable="true"
          :scroll-height="tableheigth + 'px'"
          :totalRecords="totalrecords"
          :loading="loading"
          :rows="rows"
          @page="onPage($event)"
          @sort="onSort($event)"
          stripedRows
          paginator-template="PrevPageLink NextPageLink CurrentPageReport"
          :rows-per-page-options="[10, 20, 100]"
          current-page-report-template="{totalRecords}件中 {first}件目 〜 {last}件目表示中"
          responsive-layout="scroll"
        >
          <template #empty><b>該当データ 0 件</b></template>
          <template #header>
            <div v-if="!isSp" class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
              <h5 class="m-0">
                Push通知一覧
              </h5>
              <!-- <span class="block mt-2 md:mt-0 p-input-icon-left">
                <Button label="追加" icon="pi pi-plus" class="p-button-info ml-5" @click="showEdit(null)" />
              </span> -->
            </div>
            <div v-else class="flex flex-row justify-content-between md:align-items-center">
              <small class="m-0">
                Push通知一覧
              </small>
              <span class="block p-input-icon-left">
                <Button label="" icon="pi pi-plus" class="p-button-rounded p-button-info ml-5" @click="showEdit(null)" />
                <!-- <Button label="" icon="pi pi-search" class="p-button-rounded p-button-primary ml-2" @click="spsearchDialog = true" /> -->
              </span>
            </div>
            <div v-if="!isSp" class="flex flex-column mt-2 md:flex-row md:justify-content-between md:align-items-center">
              <h5 class="m-0">
                &nbsp;
              </h5>
              <span class="block mt-2 md:mt-0">
                <!-- <span class="p-input-icon-right">
                  <InputText v-model="searchword" placeholder="Search..." @keypress.enter="search(null)"/>
                  <i v-if="searchword" class="pi pi-times" @click="searchword=''"/>
                </span>
                <Button label="検索" icon="pi pi-search" class="p-button-primary ml-2" @click="search(null)" /> -->
                <Button label="追加" icon="pi pi-plus" class="p-button-info ml-5" @click="showEdit(null)" />
              </span>
            </div>
          </template>

          <Column field="label" header="管理ラベル">
            <template #body="doc">
              <span class="p-column-title">管理ラベル</span>
              <b>{{ application.formatFirestoreDoc(cluster[doc.index], doc.field) }}</b>
            </template>
          </Column>
          <Column field="title" header="タイトル">
            <template #body="doc">
              <span class="p-column-title">タイトル</span>
              {{ application.formatFirestoreDoc(cluster[doc.index], doc.field) }}
            </template>
          </Column>
          <Column field="body" header="本文">
            <template #body="doc">
              <span class="p-column-title">本文</span>
              <pre style="max-width: 200px; display: -webkit-box; overflow: hidden; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">{{ application.formatFirestoreDoc(cluster[doc.index], doc.field) }}</pre>
            </template>
          </Column>
          <Column field="targetpersons" header="対象者">
            <template #body="doc">
              <span class="p-column-title">対象者</span>
              <pre style="max-width: 200px; display: -webkit-box; overflow: hidden; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">{{ application.formatFirestoreDoc(cluster[doc.index], doc.field) }}</pre>
            </template>
          </Column>
          <Column field="sendpersons" header="送信成功者">
            <template #body="doc">
              <span class="p-column-title">送信成功者</span>
              <pre style="max-width: 200px; display: -webkit-box; overflow: hidden; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">{{ application.formatFirestoreDoc(cluster[doc.index], doc.field) }}</pre>
            </template>
          </Column>
          <Column field="openpersons" header="開封者">
            <template #body="doc">
              <span class="p-column-title">開封者</span>
              <pre style="max-width: 200px; display: -webkit-box; overflow: hidden; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">{{ application.formatFirestoreDoc(cluster[doc.index], doc.field) }}</pre>
            </template>
          </Column>
          <Column field="targetdate" header="送信日">
            <template #body="doc">
              <span class="p-column-title">送信日</span>
              {{ application.formatFirestoreDoc(cluster[doc.index], doc.field) }}
            </template>
          </Column>
          <Column field="notified" header="送信済" body-class="text-center">
            <template #body="doc">
              <span class="p-column-title">送信済</span>
              <button v-if="application.formatFirestoreDoc(cluster[doc.index], doc.field)" class="p-button p-button-success p-button-text"><b>完了</b></button>
              <button v-else class="p-button p-button-warning p-button-text"><b>送信前</b></button>
            </template>
          </Column>
          <Column style="width:150px" body-class="text-center">
            <template #body="doc">
              <Button v-if="application.formatFirestoreDoc(cluster[doc.index], 'uid')" icon="pi pi-pencil" class="isdataresolve p-button-rounded p-button-info mr-2" @click="showEdit(doc.index)" />
              <Button v-if="application.formatFirestoreDoc(cluster[doc.index], 'uid')" icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmRemove(doc.index)" />
            </template>
          </Column>
        </DataTable>

        <Dialog
          v-model:visible="detailDialog" :style="{ width: (windowsize > 834) ? 'calc(100% - 300px - 4rem)' : '100%' }" header="Push通知詳細"
          :modal="true"
          class="fullscreen p-fluid"
          position="right"
          :dismissableMask="false"
        >
          <div class="grid">
            <div :class="(isdetail)? 'col-5' : 'col-12'">
              <div class="field">
                <label v-if="!isdetail" class="mb-3">管理ラベル <b v-if="!isdetail" class="p-error">(必須)</b></label>
                <h3 v-if="isdetail" class="mb-5"><b>{{ one.label }}</b></h3>
                <InputText
                  v-else
                  id="title" v-model.trim="one.label" required="true"
                  type="text"
                  :class="{ 'p-invalid': submitted && !one.label }"
                  placeholder="このPush通知に管理上の名前を付けて下さい。(※お客様には通知されません)"
                  @keypress.enter="save"
                />
                <small v-if="submitted && !one.label" class="p-invalid p-error">ラベルは必須項目です。</small>
                <small v-else-if="!isdetail" class="p-invalid p-error">&nbsp;</small>
              </div>

              <div class="field">
                <label class="mb-3">通知タイトル <b v-if="!isdetail" class="p-error">(必須)</b></label>
                <div v-if="isdetail" class="mb-5"><b>{{ one.title }}</b></div>
                <InputText
                  v-else
                  id="title" v-model.trim="one.title" required="true"
                  type="text"
                  :class="{ 'p-invalid': submitted && !one.title }"
                  @keypress.enter="save"
                />
                <small v-if="submitted && !one.title" class="p-invalid p-error">通知タイトルは必須項目です。</small>
                <small v-else-if="!isdetail" class="p-invalid p-error">&nbsp;</small>
              </div>

              <div class="field">
                <label class="mb-3">通知本文 <b v-if="!isdetail" class="p-error">(必須)</b></label>
                <div v-if="isdetail" class="mb-5"><b><pre>{{ one.body }}</pre></b></div>
                <Textarea
                  v-else
                  id="body" v-model.trim="one.body"
                  :class="{ 'p-invalid': submitted && !one.body }"
                  rows="5"
                />
                <small v-if="submitted && !one.body" class="p-invalid p-error">通知タイトルは必須項目です。</small>
                <small v-else-if="!isdetail" class="p-invalid p-error">&nbsp;</small>
              </div>

              <div class="field">
                <label class="mb-3">対象者 <b v-if="!isdetail" class="p-error">(必須)</b></label>
                <div v-if="isdetail" class="mb-5"><pre style="font-weight: bold;">{{ one.targetpersons }}</pre></div>
                <div v-else>
                  <SelectButton id="targetall" class="mb-2" style="width: 30%;" v-model="targetall" :options="[{ name:'全配信', value: true },{ name:'対象者配信', value: false }]" optionDisabled="constant" optionLabel="name" optionValue="value"/>
                  <Textarea v-if="!targetall"
                    id="targetpersons" v-model.trim="one.targetpersons"
                    :class="{ 'p-invalid': submitted && !one.targetpersons }"
                    rows="5"
                  />
                  <small v-if="!targetall && submitted && !one.targetpersons" class="p-invalid p-error">対象者は必須項目です。</small>
                  <small v-else-if="!isdetail" class="p-invalid p-error">&nbsp;</small>
                </div>
              </div>

              <div class="field">
                <label class="mb-3">リンク <b v-if="!isdetail">(任意)</b></label>
                <div v-if="isdetail" class="mb-5"><b v-if="one.link">{{ one.link }}</b><b v-else>無し</b></div>
                <InputText
                  v-else
                  id="link" v-model.trim="one.link"
                  type="text"
                  placeholder="/profile 等 (※ ドメインは不要です)"
                  @keypress.enter="save"
                />
                <small class="p-invalid p-error">&nbsp;</small>
              </div>

              <div class="field">
                <label class="mb-3">通知日時 <b v-if="!isdetail" class="p-error">(必須)</b></label>
                <div v-if="isdetail" class="mb-5"><small v-if="one.targetdate"><b>{{ one.targetdate.toLocaleTimeString('ja-JP', {year: 'numeric', month: '2-digit', day: '2-digit',}) }}</b></small><small v-else>指定なし</small></div>
                <Calendar v-else id="targetdate" dateFormat="yy/mm/dd" inline showTime hourFormat="24" v-model="one.targetdate" />
                <small v-if="submitted && !one.targetdate" class="p-invalid p-error">通知日時は必須項目です。</small>
                <small v-else-if="!isdetail" class="p-invalid p-error">&nbsp;</small>
              </div>

              <div v-if="isdetail" class="field">
                <label class="mb-3">送信成功者一覧</label>
                <div v-if="one.sendpersons instanceof Array && 0 < one.sendpersons.length" class="mb-5"><pre style="font-weight: bold;">{{ one.sendpersons.join('\n') }}</pre></div>
                <div v-else class="mb-5"><b>無し</b></div>
              </div>

              <div v-if="isdetail" class="field">
                <label class="mb-3">到達(受信)者一覧</label>
                <div v-if="one.recivepersons instanceof Array && 0 < one.recivepersons.length" class="mb-5"><pre style="font-weight: bold;">{{ one.recivepersons.join('\n') }}</pre></div>
                <div v-else class="mb-5"><b>無し</b></div>
              </div>

              <div v-if="isdetail" class="field">
                <label class="mb-3">開封者一覧</label>
                <div v-if="one.openpersons instanceof Array && 0 < one.openpersons.length" class="mb-5"><pre style="font-weight: bold;">{{ one.openpersons.join('\n') }}</pre></div>
                <div v-else class="mb-5"><b>無し</b></div>
              </div>
            </div>
            <div v-if="isdetail" :class="(isdetail)? 'col-7' : 'col-0'" style="background-color: ghostwhite;">
              <div v-if="one.targetpersons == '全配信'" class="p-3">
                <label class="mb-3">※全配信は集計対象外です</label>
              </div>
              <div v-else class="p-3">
                <h5>■ 集計結果</h5>

                <div class="grid mt-5 mb-5">
                  <div class="col-4">
                    <div class="card ">
                      <div class="flex justify-content-between">
                        <div>
                          <label class="block font-medium mb-3">送信数</label>
                        </div>
                        <div class="flex align-items-center justify-content-center border-round" :class="'bg-' + ((one.sendperseint > 80)? 'green' : (one.sendperseint > 30)? 'orange' : 'pink') + '-100'" style="width:10rem;height:4rem;">
                          <div class="text-900 font-medium text-xl">&nbsp;{{ one.targetpersons.trim().split('\n').length }} / {{ one.sendpersons.length }} 件&nbsp;</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-4">
                    <div class="card ">
                      <div class="flex justify-content-between">
                        <div>
                          <label class="block font-medium mb-3">到達数</label>
                        </div>
                        <div class="flex align-items-center justify-content-center border-round" :class="'bg-' + ((one.reciveperseint > 80)? 'green' : (one.reciveperseint > 30)? 'orange' : 'pink') + '-100'" style="width:10rem;height:4rem;">
                          <div class="text-900 font-medium text-xl">&nbsp;{{ one.recivepersons.length }} / {{ one.sendpersons.length }}件&nbsp;</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-4">
                    <div class="card ">
                      <div class="flex justify-content-between">
                        <div>
                          <label class="block font-medium mb-3">開封数</label>
                        </div>
                        <div class="flex align-items-center justify-content-center border-round" :class="'bg-' + ((one.openperseint > 80)? 'green' : (one.openperseint > 30)? 'orange' : 'pink') + '-100'" style="width:10rem;height:4rem;">
                          <div class="text-900 font-medium text-xl">&nbsp;{{ one.openpersons.length }} / {{ one.sendpersons.length }} 件&nbsp;</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                  <div>
                    <span class="text-900 font-medium mr-2 mb-1 md:mb-0">送信率</span>
                  </div>
                  <div class="mt-2 md:mt-0 flex align-items-center">
                    <span class="ml-3 mr-3 font-medium" :class="'text-' + ((one.sendperseint > 80)? 'green' : (one.sendperseint > 30)? 'orange' : 'pink') + '-500'">{{ one.sendperseint }} %</span>
                    <div class="surface-300 border-round overflow-hidden w-30rem" style="height:8px">
                      <div class="h-full" :class="'bg-' + ((one.sendperseint > 80)? 'green' : (one.sendperseint > 30)? 'orange' : 'pink') + '-500'" :style="'width:' + one.sendperseint + '%'" />
                    </div>
                  </div>
                </div>
                <div class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                  <div>
                    <span class="text-900 font-medium mr-2 mb-1 md:mb-0">到達率</span>
                  </div>
                  <div class="mt-2 md:mt-0 flex align-items-center">
                    <span class="ml-3 mr-3 font-medium" :class="'text-' + ((one.reciveperseint > 80)? 'green' : (one.reciveperseint > 30)? 'orange' : 'pink') + '-500'">{{ one.reciveperseint }} %</span>
                    <div class="surface-300 border-round overflow-hidden w-30rem" style="height:8px">
                      <div class="h-full" :class="'bg-' + ((one.reciveperseint > 80)? 'green' : (one.reciveperseint > 30)? 'orange' : 'pink') + '-500'" :style="'width:' + one.reciveperseint + '%'" />
                    </div>
                  </div>
                </div>
                <div class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                  <div>
                    <span class="text-900 font-medium mr-2 mb-1 md:mb-0">開封率</span>
                  </div>
                  <div class="mt-2 md:mt-0 flex align-items-center">
                    <span class="ml-3 mr-3 font-medium" :class="'text-' + ((one.openperseint > 80)? 'green' : (one.openperseint > 30)? 'orange' : 'pink') + '-500'">{{ one.openperseint }} %</span>
                    <div class="surface-300 border-round overflow-hidden w-30rem" style="height:8px">
                      <div class="h-full" :class="'bg-' + ((one.openperseint > 80)? 'green' : (one.openperseint > 30)? 'orange' : 'pink') + '-500'" :style="'width:' + one.openperseint + '%'" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <template #footer class="pt-5">
            <Button v-if="isdetail" label="閉じる" icon="pi pi-times" class="p-button-danger" @click="detailDialog = false" />
            <Button v-else label="キャンセル" icon="pi pi-times" class="p-button-danger" @click="(isnew)? detailDialog = false : isdetail = true" />
            <Button v-if="isdetail" label="編集" icon="pi pi-check" class="p-button-info" @click="(one.targetdate.getTime() > new Date().getTime())? isdetail = false : alert('送信日を過ぎたPush通知の編集は出来ません。')" />
            <Button v-else label="保存" icon="pi pi-check" class="p-button-info" @click="save" />
          </template>
        </Dialog>

        <Dialog v-model:visible="removeDialog" :style="{ width: '450px' }" header="最終確認" :modal="true" :dismissableMask="true">
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem; color: orange;" />
            <span v-if="one">このPush通知「<b>{{ one.label }}</b>」を削除します。<br/>本当に削除してよろしいですか？?</span>
          </div>
          <template #footer>
            <Button label="キャンセル" icon="pi pi-times" class="p-button-danger" @click="removeDialog = false" />
            <Button label="削除" icon="pi pi-check" class="p-button-info" @click="remove" />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
	.status-badge {
		border-radius: 2px;
		padding: .25em .5rem;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 12px;
		letter-spacing: .3px;

		&.status-super {
			background: #f5091c;
			color: #ffffff;
		}

		&.status-manager {
			background: #0edd1c;
			color: #ffffff;
		}

		&.status-staff {
			background: #0996f5;
			color: #ffffff;
		}
	}
  .p-image {
    height: 200px;
    overflow: hidden;
  }
  .p-datatable-tbody {
    .p-image {
      height: 100px;
      overflow: hidden;
    }
  }
  .layout-main>.grid>.col-12>.card {
    padding-bottom: 0;
  }
</style>
