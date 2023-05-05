<template>
  <div class="arrange-group">
    <div class="arrange menu-btn" @click="resetlayout" :disabled="disabled">
      <span class="tab-icons"></span>
      <span class="label">
          {{ t('minder.menu.arrange.arrange_layout') }}
        </span>
    </div>
  </div>
</template>

<script>
import Locale from '/src/mixins/locale';

export default {
  name: 'arrange',
  mixins: [Locale],
  computed: {
    disabled() {
      try {
        if (!minder) return false;
      } catch (e) {
        // 如果window的还没挂载minder，先捕捉undefined异常
        return false
      }
      return minder && minder.queryCommandState && minder.queryCommandState('resetlayout') === -1;
    }
  },
  methods: {
    resetlayout() {
      minder.queryCommandState('resetlayout') === -1 || minder.execCommand('resetlayout')
    }
  }
}
</script>
