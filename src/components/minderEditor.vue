<template>
  <div class="main-container">
    <header-menu
      :sequence-enable="props.sequenceEnable"
      :tag-enable="props.tagEnable"
      :progress-enable="props.progressEnable"
      :priority-count="props.priorityCount"
      :priority-prefix="props.priorityPrefix"
      :priority-start-with-zero="props.priorityStartWithZero"
      :tags="props.tags"
      :move-enable="props.moveEnable"
      :tag-edit-check="props.tagEditCheck"
      :tag-disable-check="props.tagDisableCheck"
      :priority-disable-check="props.priorityDisableCheck"
      :distinct-tags="props.distinctTags"
      :default-mold="props.defaultMold"
      :del-confirm="props.delConfirm"
      @mold-change="handleMoldChange"
    />
    <main-editor
      :disabled="props.disabled"
      :sequence-enable="props.sequenceEnable"
      :tag-enable="props.tagEnable"
      :move-enable="props.moveEnable"
      :progress-enable="props.progressEnable"
      :import-json="props.importJson"
      :height="props.height"
      :tags="props.tags"
      :distinct-tags="props.distinctTags"
      :tag-edit-check="props.tagEditCheck"
      :tag-disable-check="props.tagDisableCheck"
      :priority-count="props.priorityCount"
      :priority-prefix="props.priorityPrefix"
      :priority-start-with-zero="props.priorityStartWithZero"
      @after-mount="emit('afterMount')"
      @save="save"
    />
  </div>
</template>
<script lang="ts" name="minderEditor" setup>
import { onMounted, watchEffect, provide, computed, ref } from 'vue';
import headerMenu from './main/header.vue';
import mainEditor from './main/mainEditor.vue';
import { editMenuProps, mainEditorProps, moleProps, priorityProps, tagProps, delProps } from '../props';
import useLocale from '@/locale/useLocale';

import type { LocaleType } from '#/locale';

const emit = defineEmits<{
  (e: 'moldChange', data: number): void;
  (e: 'save', data: Record<string, any>): void;
  (e: 'afterMount'): void;
}>();

const props = defineProps({
  language: {
    type: String,
    default: 'zh-CN',
  },
  ...editMenuProps,
  ...mainEditorProps,
  ...moleProps,
  ...priorityProps,
  ...tagProps,
  ...delProps,
});

onMounted(async () => {
  window.minderProps = props;
});

const { changeLocale } = useLocale();

watchEffect(() => changeLocale(props.language as LocaleType));

provide(
  'language',
  computed(() => props.language)
);

function handleMoldChange(data: number) {
  emit('moldChange', data);
}
function save(data: Record<string, any>) {
  emit('save', data);
}
</script>
