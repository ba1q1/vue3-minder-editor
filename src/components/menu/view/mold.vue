<template>
  <div class="mold-group" :disabled="disabled">
    <a-dropdown class="toggle" @select="handleCommand">
      <div>
        <span class="dropdown-toggle mold-icons menu-btn" :class="'mold-' + (moldIndex + 1)" />
        <span class="dropdown-link">
          <icon-caret-down />
        </span>
      </div>
      <template #content>
        <a-doption class="dropdown-item mold-icons mold-1" :value="1" />
        <a-doption class="dropdown-item mold-icons mold-2" :value="2" />
        <a-doption class="dropdown-item mold-icons mold-3" :value="3" />
        <a-doption class="dropdown-item mold-icons mold-4" :value="4" />
        <a-doption class="dropdown-item mold-icons mold-5" :value="5" />
        <a-doption class="dropdown-item mold-icons mold-6" :value="6" />
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts" name="Mold" setup>
import { computed, nextTick, onMounted, ref } from 'vue';
import { moleProps } from '@/props';

const props = defineProps(moleProps);

const emit = defineEmits<{
  (e: 'moldChange', data: number): void;
}>();

const moldIndex = ref(0);

const disabled = computed(() => {
  try {
    if (!window.minder) return false;
  } catch (e) {
    // 如果window的还没挂载minder，先捕捉undefined异常
    return false;
  }
  return window.minder.queryCommandState('template') === -1;
});

const templateList = computed(() => window.kityminder.Minder.getTemplateList());

function handleCommand(command: number) {
  moldIndex.value = command;
  window.minder.execCommand('template', Object.keys(templateList.value)[command]);
  emit('moldChange', command);
}

onMounted(() => {
  nextTick(() => handleCommand(props.defaultMold));
});
</script>

<style lang="scss">
.toggle {
  .arco-dropdown-list {
    display: grid;
    padding: 5px;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
  }
}
</style>

<style lang="scss" scoped>
.dropdown-toggle .mold-icons,
.mold-icons {
  background-image: url('../../../assets/minder/mold.png');
  background-repeat: no-repeat;
}
.mold-group {
  position: relative;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  .dropdown-toggle {
    display: flex;
    width: 50px;
    height: 50px;
    margin-top: 5px;
  }
}
.dropdown-link {
  position: absolute;
  right: 3px;
  bottom: 2px;
  cursor: pointer;
}
@for $i from 1 through 6 {
  .mold-#{$i} {
    display: flex;
    width: 50px;
    height: 50px;
    margin-top: 5px;
    background-position: (1 - $i) * 50px 0;
  }
}
</style>
