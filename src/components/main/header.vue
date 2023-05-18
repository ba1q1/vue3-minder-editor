<template>
  <header>
    <a-tabs v-model="activeName" class="mind_tab-content">
      <a-tab-pane key="editMenu" :title="t('minder.main.header.minder')">
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
      </a-tab-pane>
      <a-tab-pane key="viewMenu" :title="t('minder.main.header.style')">
        <div class="mind-tab-panel">
          <view-menu :minder="minder" :default-mold="props.defaultMold" @mold-change="handleMoldChange" />
        </div>
      </a-tab-pane>
    </a-tabs>
  </header>
</template>

<script lang="ts" name="headerVue" setup>
import { ref } from 'vue';
import editMenu from '../menu/edit/editMenu.vue';
import viewMenu from '../menu/view/viewMenu.vue';
import { useI18n } from '@/hooks/useI18n';
import { editMenuProps, moleProps, priorityProps, tagProps, delProps } from '@/props';

const { t } = useI18n();

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
</style>
<style lang="scss" scoped>
header {
  font-size: 12px;
  & > ul {
    display: flex;
    align-items: center;
    height: 30px;
    margin: 0;
    padding: 0;
    background-color: #e1e1e1;
    li {
      line-height: 30px;
      display: inline-flex;
      width: 80px;
      height: 100%;
      list-style: none;
      a {
        font-size: 14px;
        width: inherit;
        text-align: center;
        text-decoration: none;
        color: #337ab7;
      }
      a:hover,
      a:focus {
        color: #23527c;
      }
    }
    li.selected {
      background: #fff;
      a {
        color: #000;
      }
    }
  }
}
.arco-tabs-content {
  padding-top: 10px;
}
</style>
