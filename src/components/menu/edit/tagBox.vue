<template>
  <div :disabled="commandDisabled">
    <el-tag
      v-for="item in props.tags"
      :key="item"
      size="small"
      :color="getResourceColor(item)"
      @click="editResource(item)"
      >{{ item }}</el-tag
    >
  </div>
</template>

<script lang="ts" name="TagBox" setup>
import { computed, nextTick, onMounted, reactive, ref } from 'vue';
import { isDisableNode, isTagEnable } from '@/script/tool/utils';
import { tagProps } from '@/props';

const props = defineProps(tagProps);

let minder = reactive<any>({});
const commandValue = ref('');
const commandDisabled = ref(true);

onMounted(() => {
  nextTick(() => {
    minder = window.minder;
    minder.on('selectionchange', () => {
      commandDisabled.value = isDisable();
    });
  });
});

const isDisable = (): boolean => {
  if (Object.keys(minder).length === 0 || !minder.on) return true;
  minder.on('interactchange', () => {
    commandValue.value = minder.queryCommandValue && minder.queryCommandValue('resource');
  });
  const node = minder.getSelectedNode && minder.getSelectedNode();
  if (node && node.data.allowDisabledTag) {
    return false;
  }
  if (isDisableNode(minder) && !isTagEnable(minder)) {
    return true;
  }
  if (props.tagDisableCheck) {
    return props.tagDisableCheck();
  }
  return !!minder.queryCommandState && minder.queryCommandState('resource') === -1;
};

function getResourceColor(resource: string) {
  if (minder.getResourceColor) {
    return minder.getResourceColor(resource).toHEX();
  }
}

function editResource(resourceName: string) {
  if (commandDisabled.value) {
    return;
  }
  if (props.tagEditCheck) {
    if (!props.tagEditCheck(resourceName)) {
      return;
    }
  }
  const origin = minder.queryCommandValue && minder.queryCommandValue('resource');
  if (!resourceName || !/\S/.test(resourceName)) return;
  const index = origin.indexOf(resourceName);
  // 先删除排他的标签
  if (props.distinctTags.indexOf(resourceName) > -1) {
    for (let i = 0; i < origin.length; i++) {
      if (props.distinctTags.indexOf(origin[i]) > -1) {
        origin.splice(i, 1);
        i--;
      }
    }
  }
  if (index !== -1) {
    origin.splice(index, 1);
  } else {
    origin.push(resourceName);
  }
  if (minder.execCommand) {
    minder.execCommand('resource', origin);
  }
}
</script>

<style lang="scss">
.el-tag {
  margin-right: 4px;
  border: 0px;
  color: black;
}

.el-tag:hover {
  cursor: pointer;
}

.el-tag:first-child {
  margin-left: 4px;
}
.add-btn {
  height: 24px;
  width: 36px;
  padding: 0px !important;
  border-style: dashed !important;
}
</style>
