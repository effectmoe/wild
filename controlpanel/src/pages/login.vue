<script lang="ts" setup>
import { sha256, hmac256 } from '~/modules/application/utilities';
const configure = useRuntimeConfig().public;
const { loadingcount, showLoading, hideLoading, hideLoadingForce } = loader();

definePageMeta({
  layout: 'empty',
  middleware: ['checkauth'],
});

const { $appState } = useNuxtApp();

const email = ref('');
const password = ref('');
const checked = ref(false);

const logoColor = computed(() => ('white'));

const login = async (): Promise<void> => {
  console.log('email1=', email.value);
  // const mailhash = sha256(email.value + ':' + configure.AUTH_MAGIC);
  // console.log('mailhash1=', mailhash);
  // // showLoading();
  // // const getsalt = await fastfirestore().getinstance().get('salts', mailhash);
  // // console.log('getsalt=', getsalt);
  // // hideLoadingForce();
  // // if (false === getsalt) {
  // //     // エラー
  // //     const errorcode = fastfirestore().getinstance().geterrorcode('get:salts/' + mailhash);
  // //     console.log('errorcode=', errorcode);
  // //     switch (errorcode) {
  // //         case 'permission-denied':
  // //             alert('指定されたメールアドレスでの登録情報が見つかりませんでした。');
  // //             break;
  // //         default:
  // //             alert('想定外のエラーです。\nお問い合わせ下さい。');
  // //             break;
  // //     }
  // // }
  // // else if (getsalt) {
  //   const salt = getsalt.data();
  //   console.log('salt=', salt);
  //   const passwordhash = hmac256(password.value + ':' + configure.AUTH_MAGIC, salt[mailhash]);
  //   console.log('passwordhash=', passwordhash);
  showLoading();
  const res = await fastfireauth().signin(email.value, password.value);
  hideLoadingForce();
  console.log('res=', res);
  if (!res) {
    console.log('autherror=', fastfireauth().autherror.value.code);
    alert('登録情報が見つかりませんでした。');
    return;
  }
  // ログイン後の権限チェック
  console.log('role=', fastfireauth().role.value);
  if (1 > fastfireauth().role.value) {
    await fastfireauth().signout();
    alert('登録情報が見つかりませんでした。');
    return;
  }
  console.log('token=', fastfireauth().token.value);
  if (fastfireauth().token.value) {
    navigateTo('/');
  }
}
</script>

<template>
  <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
      <div class="col-12 mt-5 xl:mt-0 text-center">
        <!-- <img :src="`/images/logo-${logoColor}.svg`" alt="Sakai logo" class="mb-5" style="width:81px; height:60px;"> -->
      </div>
      <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0.2) 80%);">
        <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; ">

          <div class="w-full md:w-10 mx-auto">
            <!-- <label for="email1" class="block text-900 text-xl font-medium mb-2">■メールアドレス</label> -->
            <InputText
              id="email1"
              v-model="email"
              type="email"
              class="w-full mb-3"
              placeholder="メールアドレス"
              style="padding:1rem;"
              @keypress.enter="login"
            />
            <br/><br/>

            <!-- <label for="password1" class="block text-900 font-medium text-xl mb-2">■パスワード</label> -->
            <Password
              id="password1"
              v-model="password"
              placeholder="パスワード"
              :toggle-mask="true"
              class="w-full mb-3"
              input-class="w-full"
              @keypress.enter="login"
            />
            <br/><br/>

            <div class="flex align-items-center justify-content-between mb-5">
              <div class="flex align-items-center">
                <!-- <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2" />
                <label for="rememberme1">Remember me</label> -->
              </div>
              <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">パスワードを忘れましたか?</a>
            </div>
            <br/><br/>

            <Button label="ログイン" class="w-full p-3 text-xl" @click="login" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
    transform:scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform:scale(1.6);
    margin-right: 1rem;
}
</style>
<style>
.surface-0 {
  background-color: #1f2d40 !important;
}
.p-password-input {
    padding: 1rem !important;
}
</style>
