<template>
    <div :class="['sidebar', { 'collapsed': !isOpen }]" @mouseleave="handleMouseLeaveEntireSidebar">
        <div class="settings-section">
            <h3>言語設定</h3>
            <select v-model="language" class="form-select">
                <option value="en">English</option>
                <option value="ja">日本語</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
            </select>
        </div>

        <div class="settings-section">
            <h3>ワールド設定</h3>
            <select v-model="world" class="form-select">
                <option value="earth">Earth</option>
                <option value="mars">Mars</option>
                <option value="venus">Venus</option>
            </select>
        </div>

        <div class="settings-section">
            <h3>サーバー設定</h3>
            <input type="text" v-model="serverName" class="form-control" placeholder="サーバー名を入力" />
            <input type="text" v-model="serverAddress" class="form-control mt-2" placeholder="サーバーアドレスを入力" />
        </div>
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
            serverName: '',
            serverAddress: '',
            language: 'ja',
            world: 'earth'
        }
    },
}
</script>

<style scoped>
.sidebar {
    background: linear-gradient(to bottom, var(--headercolor), var(--gradient-end-color));
    transition: margin-right 0.3s ease-in-out, top 0.3s ease-in-out;
    height: 100%;
    width: 300px;
    overflow: hidden;
    padding-top: 5px;
    position: relative;
    margin-right: 0; /* 初期位置は画面内 */
}

.sidebar.collapsed {
    margin-right: -300px; /* 閉じるときは画面外に移動 */
}

.settings-section {
  margin: 20px;
}

h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: white;
}

.form-select,
.form-control {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.form-control.mt-2 {
  margin-top: 10px;
}

/* モバイルの場合のスタイル */
@media (max-width: 767px) {
    .sidebar {
        position: fixed;
        top: 50px;
        right: -300px; /* 初期状態で画面外に隠れている */
        z-index: 1000;
        transition: right 0.3s ease-in-out; /* 位置をアニメーション */
    }

    .sidebar.collapsed {
        right: -300px; /* 閉じた状態の位置 */
        margin-right: 0px;
    }

    .sidebar:not(.collapsed) {
        right: 0; /* 開いた状態の位置 */
    }
}

</style>
