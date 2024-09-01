<template>
  <Header :isSidebarOpen="isSidebarOpen" @toggleSidebar="toggleSidebar" @openSettings="toggleRSide"
    :version="version" />
  <div class="d-flex flex-grow-1" @click="handleClickOutside">
    <LSide :isOpen="isSidebarOpen" @click.stop />
    <div :class="['contents-wrapper', { 'rounded-right': isRSideOpen }]">
      <Contents />
    </div>
    <RSide :isOpen="isRSideOpen" @click.stop @closeRSide="toggleRSide" />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import LSide from './components/LSidebar.vue'  // 正しいファイルパスと名前を確認
import RSide from './components/RSidebar.vue'  // 正しいファイルパスと名前を確認
import Contents from './components/Contents.vue'

export default {
  name: 'App',
  components: {
    Header,
    LSide,
    RSide,
    Contents
  },
  data() {
    return {
      isSidebarOpen: false,
      isRSideOpen: false,
      version: 'v0.0.1' // バージョン情報を設定
    }
  },
  methods: {
    toggleSidebar() {
      if (this.isRSideOpen) {
        this.isRSideOpen = false; // 右のサイドバーを閉じる
      }
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    toggleRSide() {
      if (this.isSidebarOpen) {
        this.isSidebarOpen = false; // 左のサイドバーを閉じる
      }
      this.isRSideOpen = !this.isRSideOpen;
    },
    handleClickOutside(event) {
      // サイドバーが開いている場合、サイドバー以外の場所をクリックしたら閉じる
      if (this.isSidebarOpen && !event.target.closest('.sidebar')) {
        this.isSidebarOpen = false;
      }
      if (this.isRSideOpen && !event.target.closest('.rside')) {
        this.isRSideOpen = false;
      }
    }
  }
}
</script>

<style>
/* スタイルはそのまま使用 */
lside,
main {
  overflow-y: auto;
}

rside {
  background-color: aqua;
}

/* Contentsの外側を#212529にし、左上と右上を丸くする */
.contents-wrapper {
  background-color: var(--headercolor);
  flex-grow: 1;
  overflow: hidden;
}

.contents-wrapper>* {
  background-color: white;
  border-radius: 15px 15px 0 0;
  /* 右上と左上を丸くする */
  height: 100%;
}

@media (max-width: 767px) {
  .contents-wrapper {
    border-radius: 0;
  }

  .contents-wrapper>* {
    border-radius: 0;
  }
}
</style>
