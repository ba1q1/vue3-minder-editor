<template>
  <div class="mold-group" :disabled="disabled">
    <el-row class="block-col-1">
      <el-col :span="24">
        <el-dropdown
          trigger="click"
          :hide-on-click="true"
          class="dropdown-toggle mold-icons menu-btn"
          :class="'mold-' + (moldIndex + 1)"
          @command="handleCommand"
        >
          <span class="el-dropdown-link">
            <el-icon><i-ep-caret-bottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu class="mold-dropdown-list">
              <el-dropdown-item
                v-for="(item, index) in 6"
                :key="item"
                class="dropdown-item mold-icons"
                :class="'mold-' + item"
                :command="index"
              />
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
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
.mold-dropdown-list .mold-icons,
.mold-icons {
  background-image: url('../../../assets/minder/mold.png');
  background-repeat: no-repeat;
}
</style>
