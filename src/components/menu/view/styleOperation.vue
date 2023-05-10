<template>
  <div class="style-group">
    <div class="clear-style-btn menu-btn" :disabled="disabled" @click="clearstyle">
      <span class="tab-icons" />
      <span class="label">
        {{ t('minder.menu.style.clear') }}
      </span>
    </div>
    <div class="copy-paste-panel" @click="copystyle">
      <div class="copy-style menu-btn" :disabled="disabled">
        <span class="tab-icons" />
        <span class="label">
          {{ t('minder.menu.style.copy') }}
        </span>
      </div>
      <div class="paste-style menu-btn" :disabled="disabled" @click="pastestyle">
        <span class="tab-icons" />
        <span class="label">
          {{ t('minder.menu.style.paste') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" name="StyleOpreation" setup>
import { nextTick, onMounted, reactive, ref } from 'vue';
import { useLocale } from '@/hooks';

const { t } = useLocale();

let minder = reactive<any>({});
const disabled = ref(true);

onMounted(() => {
  nextTick(() => {
    minder = window.minder;
    minder.on('selectionchange', () => {
      checkDisabled();
    });
  });
});

function checkDisabled() {
  try {
    if (Object.keys(minder).length === 0) return false;
  } catch (e) {
    // 如果window的还没挂载minder，先捕捉undefined异常
    return false;
  }
  const nodes = minder.getSelectedNodes && minder.getSelectedNodes();
  disabled.value = nodes === null || nodes.length === 0;
}

function clearstyle() {
  if (minder.queryCommandState && minder.execCommand && minder.queryCommandState('clearstyle') !== -1) {
    minder.execCommand('clearstyle');
  }
}
function copystyle() {
  if (minder.queryCommandState && minder.execCommand && minder.queryCommandState('copystyle') !== -1) {
    minder.execCommand('copystyle');
  }
}
function pastestyle() {
  if (minder.queryCommandState && minder.execCommand && minder.queryCommandState('pastestyle') !== -1) {
    minder.execCommand('pastestyle');
  }
}
</script>
<style>
.mold-dropdown-list .mold-icons,
.mold-icons {
  background-image: url('../../../assets/minder/mold.png');
  background-repeat: no-repeat;
}
</style>
