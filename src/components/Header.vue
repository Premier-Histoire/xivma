<template>
  <header class="bg-header text-white d-flex align-items-center gap-2 justify-content-between">
    <div class="d-flex align-items-center gap-3">
      <button @click="$emit('toggleSidebar')" class="btn btn-light btn-side">
        <!-- FontAwesomeアイコンを使用 -->
        <font-awesome-icon :icon="isSidebarOpen ? 'times' : 'bars'" class="icon" />
      </button>
      <router-link to="/" class="h5 m-0 d-flex align-items-center">
        <div class="logo-img"></div>
      </router-link>
       <span class="badge bg-secondary" v-if="version">{{ version }}</span>
    </div>
    <button @click="$emit('openSettings')" class="btn btn-light btn-settings">
      <!-- 設定アイコンを表示 -->
      <font-awesome-icon icon="cog" class="icon" />
    </button>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    isSidebarOpen: {
      type: Boolean,
      required: true
    },
    version: {
      type: String,
      required: false,
      default: 'v0.0.1' // デフォルトバージョン
    }
  }
}
</script>

<style scoped>
header {
  height: 50px !important;
  z-index: 1000;
}

.btn-side,
.btn-settings {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  font-size: 0.8rem;
  /* アイコンのサイズを0.8remに設定 */
}

.bg-header {
  background-color: var(--headercolor);
  padding: 0.5rem 10px;
  font-size: 0.8rem;
}

.badge {
  font-size: 0.75rem;
  /* バッジのフォントサイズを調整 */
  padding: 0.25em 0.5em;
  /* バッジのパディングを調整 */
}

.logo-img {
  background-image: url('/img/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 34px;
  width: 100px;
  /* 幅は必要に応じて調整してください */
}

/* レスポンシブ対応の追加 */
@media (max-width: 767px) {
  header {
    height: 60px;
    /* モバイルで少し高くする */
    padding: 0.5rem 1rem;
    /* パディングを調整 */
  }

  .h5 {
    font-size: 1rem;
    /* タイトルのフォントサイズを少し大きくする */
  }

  .btn-side,
  .btn-settings {
    width: 35px;
    /* ボタンのサイズを少し大きくする */
    height: 35px;
  }

  .icon {
    font-size: 1rem;
    /* アイコンのサイズを少し大きくする */
  }

  .logo-img {
    height: 35px;
    /* ロゴ画像の高さを調整 */
  }

  .badge {
    font-size: 0.8rem;
    /* バッジのフォントサイズを少し大きくする */
    padding: 0.3em 0.6em;
    /* バッジのパディングを調整 */
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  header {
    height: 55px;
    /* タブレットでの高さを設定 */
  }

  .h5 {
    font-size: 0.9rem;
    /* タイトルのフォントサイズを調整 */
  }

  .btn-side,
  .btn-settings {
    width: 32px;
    /* ボタンのサイズを少し調整 */
    height: 32px;
  }

  .icon {
    font-size: 0.9rem;
    /* アイコンのサイズを調整 */
  }

  .logo-img {
    height: 32px;
    /* ロゴ画像の高さを調整 */
  }

  .badge {
    font-size: 0.75rem;
    /* バッジのフォントサイズを調整 */
    padding: 0.25em 0.5em;
    /* バッジのパディングを調整 */
  }
}
</style>
