<script lang="ts">
// XXX 名前と電話番号の登録を行う場合はそれぞれのフラグを有効にし、管理ツールの再ビルドと再デプロイを行って下さい
const usename = false;// 名前フィールドの表示フラグ
const usetel = false;// 電話番号フィールドの表示フラグ
// ■ビルドコマンド
// cd controlpanel
// npm run generate
// ■デプロイコマンド
// cd [プロジェクトのルートディレクトリ]
// firebase deploy --only hosting:private



import { DocumentData } from 'firebase-admin/firestore';
import { FirebaseApp } from 'firebase/app';
import { serverTimestamp, FieldValue } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import * as application from '~/modules/application/application';

const configure = useRuntimeConfig().public;
const { loadingcount, showLoading, hideLoading, hideLoadingForce } = loader();
const { $firebaseApp } = useNuxtApp();

type One = { uid: string, name: string, url: string, rank: number, registerdate: FieldValue, modifydate: FieldValue, available: boolean, method: string, };

export default {
  data() {
    return {
      isSp: false,
      debug: false,
      usename: usename,
      usetel: usetel,
      windowsize: 0,
      tableheigth: 100,
      spsearchDialog: false,
      detailDialog: false,
      removeDialog: false,
      isnew: false,
      isdetail: false,
      one: <One>{},
      cluster: <Array<One>>[],
      origindocs: <Array<One>>[],
      page: 0,
      rows: 0,
      loading: false,
      searchword: '',
      perpagerecords: 100,
      totalrecords: 0,
      currentmaxpage: 0,
      currentorderfield: 'registerdate',
      currentorderAD: 'desc',
      uploadfiles: null,
      imagepreview1: <string|null>null,
      submitted: false,
    };
  },
  created() {
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
    this.debug = (-1 < location.search.indexOf('?debug')) || false;
    console.log('this.debug=', this.debug);
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
    showEdit(docindex: number|null) {
      console.log('docindex=', docindex);
      this.isnew = true;
      this.isdetail = false;
      this.one = <One>{};
      this.one.rank = 0;
      this.uploadfiles = null;
      this.imagepreview1 = null;
      this.submitted = false;
      if (null !== docindex) {
        const doc = <DocumentData>this.cluster[docindex];
        if (doc) {
          this.isnew = false;
          this.isdetail = true;
          this.one = doc.data();
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
    async searchlocal() {
      if ('string' == typeof this.searchword && 0 < this.searchword.length) {
        // ページング以外の検索時にページングを強制リセット
        const datatable = <any>this.$refs.dt;
        datatable.resetPage();
        this.cluster = this.origindocs.filter((doc: DocumentData) => {
          const data = doc.data();
          if (-1 < data.email.indexOf(this.searchword)) {
            return true;
          }
          return false;
        });
        this.totalrecords = this.cluster.length;
        console.log('this.totalrecords=', this.totalrecords);
      }
      else {
        await this.search(null);
      }
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
        // if ('string' == typeof this.searchword && 0 < this.searchword.length) {
        //   whereis.push(['email', '==', this.searchword]);
        // }
        whereis.push(['available', '==', true]);
        console.log('whereis=', whereis);
        //const result = await fastfirestore().getinstance().gets('persons', whereis, [[this.currentorderfield, this.currentorderAD]], this.perpagerecords, arglastdoc);
        const result = await fastfirestore().getinstance().gets('persons', whereis, [[this.currentorderfield, this.currentorderAD]], null, null);
        console.log('result=', result);
        if (result.total) {
          //this.totalrecords = result.total;
          //this.cluster = this.cluster.concat(result.docs);
          this.origindocs = result.docs;
          this.cluster = this.origindocs.concat();
          this.totalrecords = this.cluster.length;
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
      if (!(this.one.name && this.one.name.trim())) {
        return false;
      }
      let isnew = false;
      if (!this.one.uid) {
        // 追加
        this.one.registerdate = serverTimestamp();
        isnew = true;
      }

      console.log('isnew=', isnew);
      this.one.modifydate = serverTimestamp();
      this.one.available = true;

      showLoading();

      try {
        const res = await fastfirestore().getinstance().set('makers', this.one);
        console.log('res=', res);
        if (!res) {
          if (isnew) {
            throw new Error('auth create fail');
          }
          else {
            throw new Error('auth update fail');
          }
        }
      }
      catch (error: any) {
        alert('保存に失敗しました。\n\n' + error.toLocaleString());
        console.log('Error save user:', error);
        return;
      }
      finally {
        hideLoading();
      }

      if (isnew) {
        // 追加
        this.$toast.add({ severity: 'success', summary: '正常終了', detail: 'メーカーを追加しました。', life: 3000 });
      }
      else {
        // 更新
        this.$toast.add({ severity: 'success', summary: '正常終了', detail: 'メーカーを更新しました。', life: 3000 });
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
        const res = await fastfirestore().getinstance().set('makers', this.one);
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
      this.$toast.add({ severity: 'success', summary: '正常終了', detail: 'メーカーを削除しました。', life: 3000 });
      this.one = <One>{};
      this.removeDialog = false;
      await this.search(null);
    },
    async onRowselect(event: any) {
      console.log('onRowSelect event.index=', event.index);
      this.showEdit(event.index);
    },
    // async onPage(event: any) {
    //   console.log('page event=', event);
    //   if (this.cluster && this.currentmaxpage < event.page) {
    //     // まだ未取得のレコードにページングが進んだ場合に、データを追取得する
    //     const lastdoc = <DocumentData>this.cluster[this.cluster.length - 1];
    //     if (await this.search(lastdoc)) {
    //       this.currentmaxpage = event.page;
    //     }
    //   }
    //   else {
    //     setTimeout(() => {
    //       const _docs1 = document.getElementsByClassName('p-selectable-row');
    //       console.log('_docs1=', _docs1);
    //       if (_docs1) {
    //         for (var didx=0; didx < _docs1.length; didx++) {
    //           if (_docs1[didx]) {
    //             _docs1[didx].classList.add('nodata');
    //             _docs1[didx].classList.remove('isdata');
    //           }
    //         }
    //       }
    //       const _docs2 = document.getElementsByClassName('isdataresolve');
    //       console.log('_docs2=', _docs2);
    //       if (_docs2) {
    //         for (var didx=0; didx < _docs2.length; didx++) {
    //           if (_docs2[didx] && _docs2[didx].parentElement && _docs2[didx].parentElement) {
    //             _docs2[didx].parentElement?.parentElement?.classList.remove('nodata');
    //             _docs2[didx].parentElement?.parentElement?.classList.add('isdata');
    //           }
    //         }
    //       }
    //     }, 200);
    //   }
    //   window.scrollTo({ left: 0, top: 0 });
    // },
    // async onSort(event: any) {
    //   console.log('event=', event);
    //   this.currentorderfield = event.sortField;
    //   this.currentorderAD = (0 < event.sortOrder)? 'asc' : 'desc';
    //   console.log('this.currentorderAD=', this.currentorderAD);
    //   await this.search(null);
    // },
    async quickPush(mode: string, devicetoken: string) {
      if (mode === 'fcmtoken' && !this.debug) {
        return;
      }
      const title = prompt('Pushのタイトル');
      if (!title) {
        return;
      }
      const body = prompt('Pushの本文');
      if (!body) {
        return;
      }
      const link = prompt('Pushのリンク');
      if (!confirm('以下の内容で即時Push通知します。\nよろしいですか？\n\n' + '[送信先]' + devicetoken + '\n[タイトル] ' + title + '\n[本文] ' + body + '\n[リンク] ' + link)) {
        return;
      }
      console.log('title=', title);
      console.log('body=', body);
      try {
        const res = await httpsCallable(getFunctions(<FirebaseApp>$firebaseApp, 'asia-northeast1'), 'quickpush')({ title: title, body: body, link: link, devicetoken: devicetoken, });
        console.log('res=', res);
        alert('送信しました。');
      }
      catch (error) {
        console.error('error=', error);
        alert('送信に失敗しました。\n最初からやり直して下さい。');
      }
    },
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

        <!-- <DataTable
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
        > -->
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
                ユーザー一覧
              </h5>
              <!-- <span class="block mt-2 md:mt-0 p-input-icon-left">
                <Button label="追加" icon="pi pi-plus" class="p-button-info ml-5" @click="showEdit(null)" />
              </span> -->
            </div>
            <div v-else class="flex flex-row justify-content-between md:align-items-center">
              <small class="m-0">
                ユーザー一覧
              </small>
              <span class="block p-input-icon-left">
                <Button label="" icon="pi pi-plus" class="p-button-rounded p-button-info ml-5" @click="showEdit(null)" />
                <Button label="" icon="pi pi-search" class="p-button-rounded p-button-primary ml-2" @click="spsearchDialog = true" />
              </span>
            </div>
            <div v-if="!isSp" class="flex flex-column mt-2 md:flex-row md:justify-content-between md:align-items-center">
              <h5 class="m-0">
                &nbsp;
              </h5>
              <span class="block mt-2 md:mt-0">
                <span class="p-input-icon-right">
                  <!-- <InputText v-model="searchword" placeholder="Search..." @keypress.enter="search(null)"/> -->
                  <InputText v-model="searchword" placeholder="Search..." @keypress.enter="searchlocal()"/>
                  <i v-if="searchword" class="pi pi-times" @click="searchword=''"/>
                </span>
                <!-- <Button label="検索" icon="pi pi-search" class="p-button-primary ml-2" @click="search(null)" /> -->
                <Button label="検索" icon="pi pi-search" class="p-button-primary ml-2" @click="searchlocal()" />
              </span>
            </div>
          </template>

          <Column field="email" header="メールアドレス">
            <template #body="doc">
              <span class="p-column-title">メールアドレス</span>
              <Button type="button" class="m-2 p-button-outlined" :label="application.formatFirestoreDoc(cluster[doc.index], doc.field)" @click="quickPush('email', application.formatFirestoreDoc(cluster[doc.index], doc.field))"/>
            </template>
          </Column>
          <Column v-if="usename" field="name" header="氏名" style="min-width:100px">
            <template #body="doc">
              <span class="p-column-title">氏名</span>
              {{ application.formatFirestoreDoc(cluster[doc.index], doc.field) }}
            </template>
          </Column>
          <Column v-if="usetel" field="tel" header="電話番号" style="min-width:100px">
            <template #body="doc">
              <span class="p-column-title">電話番号</span>
              {{ application.formatFirestoreDoc(cluster[doc.index], doc.field) }}
            </template>
          </Column>
          <Column field="devicetokens" header="Pushトークン">
            <template #body="doc">
              <span class="p-column-title">Pushトークン</span>
              <template v-for="devicetoken in application.formatFirestoreDoc(cluster[doc.index], doc.field).split('\n')">
                <Button type="button" class="m-2" style="word-break: break-all; font-size: x-small;" :label="devicetoken" @click="quickPush('fcmtoken', devicetoken)"/>
              </template>
            </template>
          </Column>
          <Column field="modifydate" header="最終アクセス" style="width:200px">
            <template #body="doc">
              <span class="p-column-title">最終アクセス</span>
              {{ application.formatFirestoreDoc(cluster[doc.index], doc.field) }}
            </template>
          </Column>
          <Column field="registerdate" header="登録日" style="width:200px">
            <template #body="doc">
              <span class="p-column-title">登録日</span>
              {{ application.formatFirestoreDoc(cluster[doc.index], doc.field) }}
            </template>
          </Column>
          <Column style="width:150px">
            <template #body="doc">
              <Button v-if="application.formatFirestoreDoc(cluster[doc.index], 'uid')" icon="pi pi-pencil" class="isdataresolve p-button-rounded p-button-info mr-2" @click="showEdit(doc.index)" />
              <Button v-if="application.formatFirestoreDoc(cluster[doc.index], 'uid')" icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmRemove(doc.index)" />
            </template>
          </Column>
        </DataTable>

        <Dialog v-model:visible="spsearchDialog" :style="{ width: '450px' }" header="キーワード検索" :modal="true" :dismissableMask="true">
          <div class="flex align-items-center justify-content-center">
            <span class="p-input-icon-right">
              <InputText v-model="searchword" placeholder="Search..." @keypress.enter="search(null)"/>
              <i v-if="searchword" class="pi pi-times" @click="searchword=''"/>
            </span>
          </div>
          <template #footer>
            <Button label="キャンセル" icon="pi pi-times" class="p-button-text" @click="spsearchDialog = false" />
            <Button label="検索" icon="pi pi-search" class="p-button-info" @click="search(null)" />
          </template>
        </Dialog>

        <Dialog
          v-model:visible="detailDialog" :style="{ width: (windowsize > 834) ? 'calc(100% - 300px - 4rem)' : '100%' }" header="メーカー情報"
          :modal="true"
          class="fullscreen p-fluid"
          position="right"
          :dismissableMask="true"
        >
          <div class="field">
            <label class="mb-3">メーカー名</label>
            <div v-if="isdetail" class="mb-5"><b>{{ one.name }}</b></div>
            <InputText
              v-else
              id="name" v-model.trim="one.name" required="true"
              type="text"
              :class="{ 'p-invalid': submitted && !one.name }"
              @keypress.enter="save"
            />
            <small v-if="submitted && !one.name" class="p-invalid p-error">メーカー名は必須項目です。</small>
          </div>

          <div class="field">
            <label class="mb-3">URL</label>
            <div v-if="isdetail" class="mb-5"><b><a :href="one.url" target="_blank">{{ one.url }}</a></b></div>
            <InputText
              v-else
              id="name" v-model.trim="one.url"
              type="text"
              @keypress.enter="save"
            />
          </div>

          <div class="field">
            <label class="mb-3">並び順</label>
            <div v-if="isdetail" class="mb-5"><small v-if="one.rank">{{ one.rank }}</small><small v-else>指定なし</small></div>
            <InputNumber
              v-else
              id="name" v-model.trim="one.rank"
              type="number"
              :class="{ 'p-invalid': submitted && !one.rank }"
              @keypress.enter="save"
            />
          </div>

          <template #footer>
            <Button v-if="isdetail" label="閉じる" icon="pi pi-times" class="p-button-danger" @click="detailDialog = false" />
            <Button v-else label="キャンセル" icon="pi pi-times" class="p-button-danger" @click="(isnew)? detailDialog = false : isdetail = true" />
            <Button v-if="isdetail" label="編集" icon="pi pi-check" class="p-button-info" @click="isdetail = false" />
            <Button v-else label="保存" icon="pi pi-check" class="p-button-info" @click="save" />
          </template>
        </Dialog>

        <Dialog v-model:visible="removeDialog" :style="{ width: '450px' }" header="最終確認" :modal="true" :dismissableMask="true">
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem; color: orange;" />
            <span v-if="one">この管理者「<b>{{ one.name }}</b>」を削除します。<br/>本当に削除してよろしいですか？?</span>
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
