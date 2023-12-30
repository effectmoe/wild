<script lang="ts">
export default {
  emits: ['topbar-menu-toggle', 'menu-toggle'],
  data() {
    return {
      issp: false,
      windowsize: 0,
    }
  },
  async mounted() {
    window.addEventListener('resize', this.resizeWindow);
  },
  computed: {
    darkTheme() {
      return this.$appState.darkTheme;
    }
  },
  created() {
    this.windowsize = window.innerWidth;
    if (767 >= this.windowsize) {
      this.issp = true;
    }
  },
  methods: {
    resizeWindow () {
      this.windowsize = window.innerWidth;
      if (767 >= this.windowsize) {
        this.issp = true;
      }
    },
    onMenuToggle(event: any) {
      this.$emit('menu-toggle', event);
    },
    onTopbarMenuToggle(event: any) {
      this.$emit('topbar-menu-toggle', event);
    },
    topbarImage() {
      return this.$appState.darkTheme ? '/images/logo-white.svg' : '/images/logo-dark.svg';
    },
    async signout(event: any) {
      const res = await fastfireauth().signout();
      if (!fastfireauth().token.value) {
          return navigateTo('/login');
      }
      return navigateTo('/');
    }
  }
};
</script>
<template>
  <div class="layout-topbar">
    <NuxtLink to="/" class="layout-topbar-logo">
      <!-- <img alt="Logo" :src="topbarImage()"> -->
      <span>■ {{ useRuntimeConfig().public.APP_TITLE }}</span>
    </NuxtLink>

    <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
      <i class="pi pi-bars" />
    </button>


    <button
      v-if="fastfireauth().authorizeduser"
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        enterActiveClass: 'scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'fadeout',
        hideOnOutsideClick: true
      }"
      class="p-link layout-topbar-menu-button layout-topbar-button"
    >
      <img v-if="fastfireauth().authorizeduser.value?.photoURL" :src="<string>fastfireauth().authorizeduser.value?.photoURL" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;">
      <img v-else src="/images/blank_profile.png" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;">
      <div v-if="!issp" class="ml-2 p-chip-text" style="font-size: x-small;">
        <p v-if="fastfireauth().role.value==999" class="p-badge p-badge-danger mb-1" style="font-size: 8px;">スーパーユーザー</p>
        <p v-else-if="fastfireauth().role.value>=100" class="p-badge p-badge-success mb-1" style="font-size: 8px;">管理者</p>
        <p v-else class="p-badge mb-1" style="font-size: 8px;">スタッフ</p>
        <br/>
        {{ fastfireauth().authorizeduser.value?.displayName }}
      </div>
    </button>

    <ul class="layout-topbar-menu hidden origin-top">
      <li v-if="issp">
        <p v-if="fastfireauth().role.value==999" class="p-badge ml-3" style="font-size: 8px;">スーパーユーザー</p>
        <p v-else-if="fastfireauth().role.value>=100" class="p-badge ml-3" style="font-size: 8px;">管理者</p>
        <p v-else class="p-badge ml-3" style="font-size: 8px;">スタッフ</p>
        <p class="ml-3 mb-3">{{ fastfireauth().authorizeduser.value?.displayName }}</p>
        <hr/>
      </li>
      <!-- <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-calendar" />
          <span>お知らせ</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-cog" />
          <span>設定</span>
        </button>
      </li> -->
      <li>
        <button class="p-link layout-topbar-button" @click="signout">
          <i class="pi pi-sign-out" />
          <span>ログアウト</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.layout-topbar-menu-button {
  width: 10rem;
  display: inline-flex;
}
.layout-topbar-menu-button:hover {
  background-color: transparent !important;
}
</style>
