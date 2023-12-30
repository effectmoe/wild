<script lang="ts">
import { DocumentData } from 'firebase-admin/firestore';
import { FirebaseApp } from 'firebase/app';
import { or, where, serverTimestamp, FieldValue } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { UploadTaskSnapshot } from 'firebase/storage';
import * as application from '~/modules/application/application';
import { sha256, decryptAESFromUTF8Base64 } from '~/modules/application/utilities';

const configure = useRuntimeConfig().public;
const { loadingcount, showLoading, hideLoading, hideLoadingForce } = loader();
const { $firebaseApp } = useNuxtApp();

type One = { uid: string, image: string|null, name: string, email: string, password: string, role: number, registerdate: FieldValue, modifydate: FieldValue, available: boolean, method: string, };

export default {
  data() {
    return {
      issp: false,
      windowsize: 0,
      tableheigth: 100,
      spsearchDialog: false,
      detailDialog: false,
      removeDialog: false,
      isnew: false,
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
      uploadfiles: null,
      imagepreview1: <string|null>null,
      roles: [
        { name: 'スタッフ', value: 1 },
        { name: '管理者', value: 101 },
        { name: 'スーパーユーザー', value: 999, constant: true },
      ],
      submitted: false,
    };
  },
  created() {
    this.windowsize = window.innerWidth;
    this.tableheigth = window.innerHeight - 377;
    if (767 >= this.windowsize) {
      this.issp = true;
      this.tableheigth = window.innerHeight - 367;
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
      this.tableheigth = window.innerHeight - 377;
      if (767 >= this.windowsize) {
        this.issp = true;
        this.tableheigth = window.innerHeight - 367;
      }
    },
    onFileChange(event: any) {
      if (event.target && event.target.files) {
        this.imagepreview1 = null;
        if (event.target.files[0]) {
          console.log('event.target.files[0]=', event.target.files[0]);
          this.uploadfiles = Object.assign({}, event.target.files);
          const reader = new FileReader();
          const thisis: any = this;
          reader.addEventListener('load', function () {
            console.log('reader.result=', reader.result);
            thisis.imagepreview1 = reader.result;
          }, false);
          reader.readAsDataURL(event.target.files[0]);
        }
      }
    },
    clickReset(event: any) {
      console.log('event.target=', event.target);
      if (typeof this.imagepreview1 == 'string' && 0 > this.imagepreview1!.indexOf('http')) {
        if (this.one.image) {
          this.imagepreview1 = this.one.image;
        }
        else {
          this.imagepreview1 = null;
        }
      }
    },
    showEdit(docindex: number|null) {
      console.log('docindex=', docindex);
      this.isnew = true;
      this.one = <One>{};
      this.one.role = this.roles[0].value;
      this.uploadfiles = null;
      this.imagepreview1 = null;
      this.submitted = false;
      if (null !== docindex) {
        const doc = <DocumentData>this.cluster[docindex];
        if (doc) {
          this.isnew = false;
          this.one = doc.data();
          if (typeof this.one.email == 'string' && 0 < this.one.email.length) {
            this.one.email = decryptAESFromUTF8Base64(this.one.email, null, null);
            const mailhash = sha256(this.one.email + ':' + configure.AUTH_MAGIC);
            console.log('mailhash=', mailhash);
          }
          if (typeof this.one.image == 'string' && 0 < this.one.image.length) {
            this.imagepreview1 = this.one.image;
          }
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
          whereis.push(['or', or(where('name', '==', this.searchword), where('role', '==', this.searchword))]);
        }
        whereis.push(['available', '==', true]);
        console.log('whereis=', whereis);
        const result = await fastfirestore().getinstance().gets('managers', whereis, [[this.currentorderfield, this.currentorderAD]], this.perpagerecords, arglastdoc);
        console.log('result=', result);
        if (result.total) {
          this.totalrecords = result.total;
          this.cluster = this.cluster.concat(result.docs);
          // this.rows = result.docs.length;
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
      if (!(this.one.name && this.one.name.trim() && this.one.email && this.one.email.trim())) {
        return false;
      }
      this.one.image = null;
      let isnew = false;
      if (!this.one.uid) {
        // 追加
        this.one.registerdate = serverTimestamp();
        isnew = true;
      }
      if (isnew && !this.one.password) {
        return false;
      }

      console.log('isnew=', isnew);
      this.one.modifydate = serverTimestamp();
      this.one.available = true;
      if (this.imagepreview1 && this.uploadfiles && this.uploadfiles[0]) {
        console.log('this.uploadfiles=', this.uploadfiles);
        // アイコン画像をFirestoregeにアップロード
        let suffix = '.png';
        const uploadfile = <File>this.uploadfiles[0];
        if (uploadfile.type == 'image/jpeg' || uploadfile.type == 'image/jpg') {
          suffix = '.jpg';
        }
        const filename = sha256(this.imagepreview1) + suffix;
        showLoading();
        const imageurl = await fastfirestore().upload(this.uploadfiles[0], 'images/managers/' + filename, function (argprogress: number, argsnapshot: UploadTaskSnapshot) {
          console.log('progress=', argprogress);
        });
        hideLoading();
        if (!imageurl) {
          alert('アイコン画像のアップロードに失敗しました。');
          return false;
        }
        else {
          this.one.image = <string>imageurl;
        }
      }

      showLoading();

      try {
        this.one.method = 'PUT';
        if (isnew) {
          // ユーザーをAuthに追加
          this.one.method = 'POST';
        }
        const res = await httpsCallable(getFunctions(<FirebaseApp>$firebaseApp, 'asia-northeast1'), 'manager')(this.one);
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
        this.$toast.add({ severity: 'success', summary: '正常終了', detail: '管理者を追加しました。', life: 3000 });
      }
      else {
        // 更新
        this.$toast.add({ severity: 'success', summary: '正常終了', detail: '管理者を更新しました。', life: 3000 });
      }

      this.one = <One>{};
      this.detailDialog = false;
      await this.search(null);
    },
    async remove() {
      showLoading();
      try {
        this.one.method = 'DELETE';
        const res = await httpsCallable(getFunctions($firebaseApp, 'asia-northeast1'), 'manager')(this.one);
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
      // this.cluster = this.cluster.filter((val: { uid: any; }) => val.uid !== this.one.uid);
      this.$toast.add({ severity: 'success', summary: '正常終了', detail: '管理者を削除しました。', life: 3000 });
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
          selectionMode="single"
          @rowSelect="onRowselect"
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
            <div v-if="!issp" class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
              <h5 class="m-0">
                管理者一覧
              </h5>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <Button label="追加" icon="pi pi-plus" class="p-button-info ml-5" @click="showEdit(null)" />
              </span>
            </div>
            <div v-else class="flex flex-row justify-content-between md:align-items-center">
              <small class="m-0">
                管理者一覧
              </small>
              <span class="block p-input-icon-left">
                <Button label="" icon="pi pi-plus" class="p-button-rounded p-button-info ml-5" @click="showEdit(null)" />
                <Button label="" icon="pi pi-search" class="p-button-rounded p-button-primary ml-2" @click="spsearchDialog = true" />
              </span>
            </div>
            <div v-if="!issp" class="flex flex-column mt-2 md:flex-row md:justify-content-between md:align-items-center">
              <h5 class="m-0">
                &nbsp;
              </h5>
              <span class="block mt-2 md:mt-0">
                <span class="p-input-icon-right">
                  <InputText v-model="searchword" placeholder="Search..." @keypress.enter="search(null)"/>
                  <i class="pi pi-times" @click="searchword=''"/>
                </span>
                <Button label="検索" icon="pi pi-search" class="p-button-primary ml-2" @click="search(null)" />
              </span>
            </div>
          </template>

          <Column field="image" header="アイコン" style="width:150px">
            <template #body="doc">
              <span class="p-column-title">アイコン</span>
              <Image v-if="application.formatFirestoreDoc(cluster[doc.index], doc.field)" :src="application.formatFirestoreDoc(cluster[doc.index], doc.field)" width="100" preview />
              <Image v-else-if="application.formatFirestoreDoc(cluster[doc.index], 'uid')" src="/images/blank_profile.png" width="100" />
              <Image v-else src="/images/blank_profile.png" width="100" style="visibility: hidden"/>
            </template>
          </Column>
          <Column field="name" header="名前">
            <template #body="doc">
              <span class="p-column-title">名前</span>
              {{ application.formatFirestoreDoc(cluster[doc.index], doc.field) }}
            </template>
          </Column>
          <Column field="email" header="メールアドレス">
            <template #body="doc">
              <span class="p-column-title">メールアドレス</span>
              {{ application.formatFirestoreDoc(cluster[doc.index], doc.field) }}
            </template>
          </Column>
          <Column field="role" header="権限" :sortable="true" style="width:150px">
            <template #body="doc">
              <span class="p-column-title">権限</span>
              <span v-if="application.formatFirestoreDoc(cluster[doc.index], doc.field) === 999" class="status-badge status-super">スーパーユーザー</span>
              <span v-else-if="application.formatFirestoreDoc(cluster[doc.index], doc.field) > 100" class="status-badge status-manager">管理者</span>
              <span v-else-if="application.formatFirestoreDoc(cluster[doc.index], doc.field) > 0" class="status-badge status-staff">スタッフ</span>
            </template>
          </Column>
          <Column field="registerdate" header="作成日" :sortable="true" style="width:200px">
            <template #body="doc">
              <span class="p-column-title">作成日</span>
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
              <i class="pi pi-times" @click="searchword=''"/>
            </span>
          </div>
          <template #footer>
            <Button label="キャンセル" icon="pi pi-times" class="p-button-text" @click="spsearchDialog = false" />
            <Button label="検索" icon="pi pi-search" class="p-button-info" @click="search(null)" />
          </template>
        </Dialog>

        <Dialog
          v-model:visible="detailDialog" :style="{ width: (windowsize > 834) ? 'calc(100% - 300px - 4rem)' : '100%' }" header="管理者情報"
          :modal="true"
          class="fullscreen p-fluid"
          position="right"
          :dismissableMask="false"
        >
          <div class="field">
            <label class="mb-3">アイコン画像</label>
            <FileUpload
              mode="basic"
              class="mb-3"
              chooseLabel="ファイル選択"
              name="demo[]"
              accept="image/jpeg, image/jpg, image/png"
              :max-file-size="1000000"
              @input="onFileChange"
              @click="clickReset"
            />
            <div class="flex justify-content-center">
              <Image v-if="imagepreview1" :src="imagepreview1" width="200" preview />
              <Image v-else src="/images/blank_profile.png" width="200" />
            </div>
          </div>

          <div class="field">
            <label class="mb-3">メールアドレス</label>
            <InputText
              id="name" v-model.trim="one.email" required="true"
              type="email"
              :class="{ 'p-invalid': submitted && !one.email }"
              @keypress.enter="save"
            />
            <small v-if="submitted && !one.email" class="p-invalid p-error">メールアドレスは必須項目です。</small>
          </div>

          <div class="field">
            <label class="mb-3">パスワード</label>
            <Password
              id="name" v-model.trim="one.password"
              :toggle-mask="true"
              @keypress.enter="save"
            />
            <small v-if="isnew　&& submitted && !one.password" class="p-invalid p-error">パスワードは必須項目です。</small>
          </div>

          <div class="field">
            <label class="mb-3">名前</label>
            <InputText
              id="name" v-model.trim="one.name" required="true"
              :class="{ 'p-invalid': submitted && !one.name }"
              @keypress.enter="save"
            />
            <small v-if="submitted && !one.name" class="p-invalid p-error">名前は必須項目です。</small>
          </div>

          <div class="field">
            <label class="mb-3">権限</label>
            <SelectButton v-model="one.role" :options="roles" optionDisabled="constant" optionLabel="name" optionValue="value" />
          </div>

          <template #footer>
            <Button label="キャンセル" icon="pi pi-times" class="p-button-danger" @click="detailDialog = false" />
            <Button label="保存" icon="pi pi-check" class="p-button-info" @click="save" />
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
