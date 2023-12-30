<script lang="ts">
import { defineComponent } from 'vue';
import AppTopBar from '~/components/layouts/default/AppTopbar.vue';
import AppMenu from '~/components/layouts/default/AppMenu.vue';
import AppConfig from '~/components/layouts/default/AppConfig.vue';
import AppFooter from '~/components/layouts/default/AppFooter.vue';
import { checkIP } from '~/modules/application/utilities';

const configure = useRuntimeConfig().public

export default defineComponent({
  components: {
    AppTopBar,
    AppMenu,
    AppConfig,
    AppFooter
  },
  data() {
    return {
      $toast: <any>{},
      $primevue: <any>{},
      layoutMode: 'static',
      menuActive: false,
      menuClick: false,
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      staffmenus: [
        {
          label: 'ダッシュボード',
          icon: 'pi pi-fw pi-home',
          style: 'padding-left: 0',
          to: '/'
        },
        {
          label: '通知管理',
          icon: 'pi pi-fw pi-send',
          style: 'padding-left: 0',
          to: '/notifications'
        },
      ],
      managermenus: [
        {
          label: 'ダッシュボード',
          icon: 'pi pi-fw pi-home',
          style: 'padding-left: 0',
          to: '/'
        },
        {
          label: '通知管理',
          icon: 'pi pi-fw pi-send',
          style: 'padding-left: 0',
          to: '/notifications'
        },
        {
          label: '会員管理',
          icon: 'pi pi-fw pi-user',
          style: 'padding-left: 0',
          to: '/persons'
        },
        // {
        //   label: '設定',
        //   icon: 'pi pi-fw pi-cog',
        //   style: 'padding-left: 0',
        //   items: [
        //     { label: '管理者管理', icon: 'pi pi-fw pi-id-card', to: '/managers' },
        //   ]
        // },
      ]
    };
  },

  computed: {
    containerClass() {
      const newlayout = ['layout-wrapper', {
        'layout-overlay': this.layoutMode === 'overlay',
        'layout-static': this.layoutMode === 'static',
        'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
        'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
        'layout-mobile-sidebar-active': this.mobileMenuActive,
        'p-input-filled': this.$primevue.config.inputStyle === 'filled',
        'p-ripple-disabled': this.$primevue.config.ripple === false,
        'layout-theme-light': true
      }];
      console.log('newlayout=', newlayout);
      console.log('this.$appState.theme?=', this.$appState.theme);
      return newlayout;
    },
    logo() {
      return (this.$appState.darkTheme) ? '/images/logo-white.svg' : '/images/logo.svg';
    }
  },
  async mounted() {
    if ('local' === configure.ENV) {
      console.info('local実行はIP制限無し');
    }
    // XXX 以下は開発中の暫定
    else if ('prod' !== configure.ENV && -1 < configure.superuseruids.indexOf((<any>fastfireauth().authorizeduser.value).uid)) {
      console.info('本番環境外でのSuperUserでの実行はIP制限無し');
    }
    // ローカル開発以外ではIPチェック
    else if (!await checkIP()) {
      console.error('許可されていないIPアドレスのため終了');
      throw createError({
        statusCode: 401,
        statusMessage: '401 Unauthorized',
        message: '許可されていないIPからのアクセスのため処理を終了しました。',
        fatal: true,
      });
    }
  },
  watch: {
    $route() {
      this.menuActive = false;
      this.$toast.removeAllGroups();
    }
  },
  beforeUpdate() {
    if (this.mobileMenuActive) {
      this.addClass(document.body, 'body-overflow-hidden');
    } else {
      this.removeClass(document.body, 'body-overflow-hidden');
    }
  },
  methods: {
    onWrapperClick() {
      if (!this.menuClick) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }

      this.menuClick = false;
    },
    onMenuToggle(event: Event) {
      this.menuClick = true;

      if (this.isDesktop()) {
        if (this.layoutMode === 'overlay') {
          if (this.mobileMenuActive) {
            this.overlayMenuActive = true;
          }

          this.overlayMenuActive = !this.overlayMenuActive;
          this.mobileMenuActive = false;
        } else if (this.layoutMode === 'static') {
          this.staticMenuInactive = !this.staticMenuInactive;
        }
      } else {
        this.mobileMenuActive = !this.mobileMenuActive;
      }

      event.preventDefault();
    },
    onSidebarClick() {
      this.menuClick = true;
    },
    onMenuItemClick(event: any) {
      if (event.item && !event.item.items) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }
    },
    onLayoutChange(layoutMode: string) {
      this.layoutMode = layoutMode;
    },
    addClass(element: Element, className: string) {
      if (element.classList) {
        element.classList.add(className);
      } else {
        element.className += ` ${className}`;
      }
    },
    removeClass(element: Element, className: string) {
      if (element.classList) {
        element.classList.remove(className);
      } else {
        element.className = element.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' ');
      }
    },
    isDesktop() {
      return window.innerWidth >= 992;
    },
    isSidebarVisible() {
      if (this.isDesktop()) {
        if (this.layoutMode === 'static') {
          return !this.staticMenuInactive;
        } else if (this.layoutMode === 'overlay') {
          return this.overlayMenuActive;
        }
      }

      return true;
    }
  }
});
</script>

<template>
    <!--▼loader-->
    <loader />

    <div :class="containerClass" @click="onWrapperClick">
    <AppTopBar @menu-toggle="onMenuToggle" />
    <div class="layout-sidebar" @click="onSidebarClick">
      <AppMenu v-if="fastfireauth().role.value > 100" :model="managermenus" @menuitem-click="onMenuItemClick" />
      <AppMenu v-else :model="staffmenus" @menuitem-click="onMenuItemClick" />
    </div>

    <div class="layout-main-container">
      <div class="layout-main">
        <slot />
      </div>
      <AppFooter />
    </div>

    <!-- <AppConfig :layout-mode="layoutMode" @layout-change="onLayoutChange" /> -->
    <transition name="layout-mask">
      <div v-if="mobileMenuActive" class="layout-mask p-component-overlay" />
    </transition>
  </div>
</template>

<style lang="scss">
  @import '~/assets/styles/App.scss';
</style>
