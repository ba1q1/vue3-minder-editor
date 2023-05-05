<template>
  <div class="style-group">
    <div class="clear-style-btn menu-btn" @click="clearstyle" :disabled="disabled">
      <span class="tab-icons"></span>
      <span class="label">
          {{ t('minder.menu.style.clear') }}
        </span>
    </div>
    <div class="copy-paste-panel" @click="copystyle">
      <div class="copy-style menu-btn" :disabled="disabled">
        <span class="tab-icons"></span>
        <span class="label">
              {{ t('minder.menu.style.copy') }}
            </span>
      </div>
      <div class="paste-style menu-btn" @click="pastestyle" :disabled="disabled">
        <span class="tab-icons"></span>
        <span class="label">
              {{ t('minder.menu.style.paste') }}
            </span>
      </div>
    </div>
  </div>
</template>

<script>
import Locale from '/src/mixins/locale';

export default {
  name: "styleOpreation",
  mixins: [Locale],
  data() {
    return {
      minder: undefined
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.minder = minder;
    })
  },
  computed: {
    disabled() {
      try {
        if (!this.minder) {
          return false;
        }
      } catch (e) {
        // 如果window的还没挂载minder，先捕捉undefined异常
        return false
      }

      let nodes = minder.getSelectedNodes();
      if (nodes != null && nodes.length > 0) {
        return false;
      }
      return true;
    },
  },
  methods: {
    clearstyle() {
      minder.queryCommandState("clearstyle") === -1 ||
      minder.execCommand("clearstyle");
    },
    copystyle() {
      minder.queryCommandState("copystyle") === -1 ||
      minder.execCommand("copystyle");
    },
    pastestyle() {
      minder.queryCommandState("pastestyle") === -1 ||
      minder.execCommand("pastestyle");
    },
  },
};
</script>
