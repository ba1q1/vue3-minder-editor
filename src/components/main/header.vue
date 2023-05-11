<template>
  <header>
    <el-tabs v-model="activeName" class="mind_tab-content">
      <el-tab-pane :label="t('minder.main.header.minder')" name="editMenu">
        <div class="mind-tab-panel">
          <edit-menu
            :minder="minder"
            :move-enable="props.moveEnable"
            :sequence-enable="props.sequenceEnable"
            :tag-enable="props.tagEnable"
            :progress-enable="props.progressEnable"
            :priority-count="props.priorityCount"
            :priority-prefix="props.priorityPrefix"
            :tag-edit-check="props.tagEditCheck"
            :tag-disable-check="props.tagDisableCheck"
            :priority-disable-check="props.priorityDisableCheck"
            :priority-start-with-zero="props.priorityStartWithZero"
            :tags="props.tags"
            :distinct-tags="props.distinctTags"
            :del-confirm="props.delConfirm"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane :label="t('minder.main.header.style')" name="viewMenu">
        <div class="mind-tab-panel">
          <view-menu :minder="minder" :default-mold="props.defaultMold" @mold-change="handleMoldChange" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </header>
</template>

<script lang="ts" name="headerVue" setup>
import { ref } from 'vue';
import editMenu from '../menu/edit/editMenu.vue';
import viewMenu from '../menu/view/viewMenu.vue';
import { useLocale } from '@/hooks';
import { editMenuProps, moleProps, priorityProps, tagProps, delProps } from '@/props';

const { t } = useLocale();

const props = defineProps({ ...editMenuProps, ...moleProps, ...priorityProps, ...tagProps, ...delProps, minder: null });

const emit = defineEmits<{
  (e: 'moldChange', data: number): void;
}>();
const activeName = ref('editMenu');

function handleMoldChange(data: number) {
  emit('moldChange', data);
}
</script>
<style lang="scss">
@import 'src/style/header.scss';
.mind_tab-content {
  .tab-icons {
    background-image: url('../../assets/minder/icons.png');
    background-repeat: no-repeat;
  }
}

.el-tabs {
  .el-tabs__header {
    margin-bottom: 10px;
  }
}
</style>
