<template>
  <div :class="['sidebar', { 'collapsed': !isOpen }]" @mouseleave="handleMouseLeaveEntireSidebar">
    <ul class="nav flex-column">
      <li
        v-for="link in links"
        :key="link.name"
        @mouseenter="handleMouseEnter(link, $event)"
        @mouseleave="handleMouseLeave(link)"
        :class="['nav-item', 'hover-area']"
      >
        <!-- ルートリンクの場合 -->
        <template v-if="!link.children">
          <router-link :to="link.to" class="nav-link d-flex align-items-center">
            <div class="icon-wrapper d-flex align-items-center custom-center">
              <font-awesome-icon :icon="link.icon" class="icon" />
            </div>
            <span v-if="isOpen" class="link-text ms-3">{{ link.name }}</span>
          </router-link>
        </template>
        <!-- ドロップダウンの場合 -->
        <template v-else>
          <a @click="toggleDropdown(link)" class="nav-link d-flex align-items-center" href="#">
            <div class="icon-wrapper d-flex align-items-center custom-center">
              <font-awesome-icon :icon="link.icon" class="icon" />
            </div>
            <span v-if="isOpen" class="link-text ps-3">{{ link.name }}</span>
            <font-awesome-icon v-if="isOpen" :icon="link.isOpen ? 'chevron-up' : 'chevron-down'" class="ms-auto" />
          </a>
          <ul v-if="isOpen" :class="['nav flex-column ms-3 dropdown-expanded', { 'dropdown-collapsed': !link.isOpen }]" >
            <li v-for="child in link.children" :key="child.name" class="nav-item">
              <router-link :to="child.to" class="nav-link d-flex align-items-center">
                <div class="icon-wrapper d-flex align-items-center custom-center">
                  <font-awesome-icon :icon="child.icon" class="icon" />
                </div>
                <span v-if="isOpen" class="link-text ms-3">{{ child.name }}</span>
              </router-link>
            </li>
          </ul>
          <!-- サイドバーが閉じているときのホバー表示 -->
          <div v-if="!isOpen && link.hover" class="bridge-area" @mouseenter="keepDropdownOpen(link)" @mouseleave="handleMouseLeaveDropdown(link)"></div>
          <ul
            v-if="!isOpen && link.hover && link.children"
            :style="{ top: link.hoverTop + 'px' }"
            :class="['nav flex-column dropdown-hover-menu', { 'show': link.hover, 'hide': !link.hover }]"
            @mouseenter="keepDropdownOpen(link)"
            @mouseleave="handleMouseLeaveDropdown(link)"
          >
            <li
              v-for="child in link.children"
              :key="child.name"
              class="nav-item"
            >
              <router-link :to="child.to" class="nav-link nav-link-false d-flex align-items-center gap-2">
                <div class="icon-wrapper d-flex align-items-center custom-center">
                  <font-awesome-icon :icon="child.icon" class="icon" />
                </div>
                <div class="text-white">{{ child.name }}</div>
              </router-link>
            </li>
          </ul>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      links: [
      { name: 'About', to: '/', icon: ['fas', 'home'] },
        {
          name: 'ブック',
          icon: ['fas', 'fa-book'],
          isOpen: false,
          hover: false,
          hoverTop: 0,
          children: [
            { name: 'A', to: '/about', icon: ['fas', 'a'] },
            { name: 'B', to: '/about', icon: ['fas', 'b'] },
            { name: 'C', to: '/about', icon: ['fas', 'c'] },
          ]
        },
        {
          name: 'チャート',
          icon: ['fas', 'fa-chart-simple'],
          isOpen: false,
          hover: false,
          hoverTop: 0,
          children: [
            { name: 'A', to: '/about', icon: ['fas', 'a'] },
            { name: 'B', to: '/about', icon: ['fas', 'b'] },
            { name: 'C', to: '/about', icon: ['fas', 'c'] },
          ]
        },
        { name: 'About', to: '/', icon: ['fas', 'fa-chart-line'] },
        { name: 'About', to: '/', icon: ['fas', 'fa-circle-info'] },
      ],
      activeDropdown: null,
      hoverTimer: null,
      closeDelayTimer: null,
    };
  },
  methods: {
    toggleDropdown(link) {
      // サイドバーが閉じているときはドロップダウンを展開しない
      if (!this.isOpen) return;

      if (this.activeDropdown && this.activeDropdown !== link) {
        this.activeDropdown.isOpen = false;
        this.activeDropdown.hover = false;
        this.activeDropdown = null;
      }

      link.isOpen = !link.isOpen;
      this.activeDropdown = link.isOpen ? link : null;
    },
    handleMouseEnter(link, event) {
      clearTimeout(this.hoverTimer);
      clearTimeout(this.closeDelayTimer);
      if (!this.isOpen) {
        if (this.activeDropdown && this.activeDropdown !== link) {
          this.activeDropdown.hover = false;
        }
        this.activeDropdown = link;
        link.hoverTop = event.currentTarget.getBoundingClientRect().top + window.scrollY; // ドロップダウンの位置を動的に設定

        this.hoverTimer = setTimeout(() => {
          link.hover = true;
        }, 200); // メニューが切り替わるまでの待機時間を設定
      }
    },
    handleMouseLeave(link) {
      if (!this.isOpen) {
        clearTimeout(this.hoverTimer);
        this.closeDelayTimer = setTimeout(() => {
          link.hover = false;
          this.activeDropdown = null;
        }, 300); // メニューが閉じるまでの遅延を設定
      }
    },
    handleMouseLeaveEntireSidebar() {
      clearTimeout(this.hoverTimer);
      clearTimeout(this.closeDelayTimer);
      this.links.forEach(link => link.hover = false);
      this.activeDropdown = null;
    },
    keepDropdownOpen(link) {
      clearTimeout(this.hoverTimer);
      clearTimeout(this.closeDelayTimer);
      link.keepOpen = true;
    },
    handleMouseLeaveDropdown(link) {
      link.keepOpen = false;
      this.handleMouseLeave(link);
    }
  }
}
</script>

<style scoped>
.sidebar {
  background: linear-gradient(to bottom, var(--headercolor), var(--gradient-end-color)); /* 黒から灰色へのグラデーション */
  transition: width 0.3s ease-in-out, margin-left 0.3s ease-in-out;
  height: 100%;
  width: 200px;
  overflow: hidden;
  padding-top: 5px;
  position: relative; /* 疑似要素の位置を調整するためにrelativeを追加 */
  left: 0; /* 左側に配置 */
}

.sidebar.collapsed {
  width: 50px !important;
}

.nav-link {
  color: #f8f9fa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 10px;
  display: flex;
  align-items: center;
}

.nav-link:hover {
  background-color: #343a40;
}

.nav-link-false {
  padding: 5px !important;
}

.icon-wrapper {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  background-color: #495057;
  border-radius: 5px;
}

.custom-center {
  justify-content: center;
}

.icon {
  font-size: 0.8rem;
  color: #ffffff;
}

.link-text {
  color: #ffffff;
}

.sidebar.collapsed .link-text {
  opacity: 0;
  margin-left: 0;
}

.ms-auto {
  margin-left: auto;
  color: #ffffff;
}

.dropdown-expanded {
  display: block;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease-in-out;
}

.dropdown-expanded.dropdown-collapsed {
  max-height: 0;
}

.dropdown-expanded:not(.dropdown-collapsed) {
  max-height: 500px; /* ドロップダウンメニューが完全に展開された時の最大高さを指定 */
}

.dropdown-hover-menu {
  position: fixed;
  left: 53px;
  width: 150px;
  background-color: var(--headercolor);
  border-radius: 0.25rem;
  padding: 5px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  z-index: 1000;
  opacity: 0;
  transform: translate(-20px, -10px);
  transition: opacity 0.3s ease, transform 0.3s ease, max-height 0.3s ease; /* トランジションを強調 */
  max-height: 0;
  overflow: hidden;
}

.dropdown-hover-menu.show {
  opacity: 1;
  transform: translate(0, 0);
  max-height: 500px;
}

.dropdown-hover-menu.hide {
  opacity: 0;
  transform: translate(-20px, -10px);
  max-height: 0;
}

.bridge-area {
  position: fixed;
  left: 50px;
  width: 3px;
  height: 100%;
  top: 0;
  background-color: transparent;
  z-index: 999;
  pointer-events: auto;
  transition: background-color 0.1s ease; /* トランジション追加 */
}

.hover-area {
  position: relative;
}

.sidebar:not(.collapsed) .dropdown-hover-menu {
  position: absolute;
  left: 100%;
  top: 0;
  margin-left: 0;
  width: auto;
  opacity: 1;
  transform: translate(0, 0);
  transition: none; /* アニメーションを無効にする */
}

.sidebar:not(.collapsed) .bridge-area {
  display: none;
}

/* モバイルの場合のスタイル */
@media (max-width: 767px) {
  .sidebar {
    position: absolute;
    top: 50px;
    left: 0;
    z-index: 1000; /* サイドバーが他のコンテンツの上に重なるようにする */
    width: 200px;
    height: 100%;
  }

  .sidebar.collapsed {
    margin-left: -200px; /* 画面外に移動 */
  }
}
</style>
