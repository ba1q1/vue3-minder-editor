<template>
  <div class="edit-del-group">
    <div class="edit menu-btn" :disabled="textDisabled" @click="edit">
      <i class="tab-icons" />
      <span>
        {{ t('minder.commons.edit') }}
      </span>
    </div>
    <div class="del menu-btn" :disabled="removeNodeDisabled" @click="del">
      <i class="tab-icons" />
      <span>
        {{ t('minder.commons.delete') }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" name="edit_del" setup>
import { computed, onMounted, reactive, nextTick, ref } from 'vue';
import { isDeleteDisableNode, isDisableNode, markDeleteNode } from '@/script/tool/utils';
import { useLocale } from '@/hooks';

const { t } = useLocale();

let minder = reactive<any>({});
const textDisabled = ref(true);
const removeNodeDisabled = ref(true);

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
    if (!minder) return false;
  } catch (e) {
    // 如果window的还没挂载minder，先捕捉undefined异常
    return false;
  }
  const node = minder.getSelectedNode();
  removeNodeDisabled.value = !node || !!isDeleteDisableNode(minder) || node.parent === null;
  textDisabled.value = !node || !!isDisableNode(minder);
}

function editNode() {
  if (!minder.queryCommandValue) return;
  const editor = window.minderEditor;
  const receiverElement = editor.receiver.element;
  const { fsm } = editor;
  const { receiver } = editor;

  receiverElement.innerText = minder.queryCommandValue('text');
  fsm.jump('input', 'input-request');
  receiver.selectAll();
}

function edit() {
  if (textDisabled.value || !minder.queryCommandState) {
    return;
  }
  if (minder.queryCommandState('text') !== -1) {
    editNode();
  }
}
function del() {
  if (removeNodeDisabled.value || !minder.queryCommandState || !minder.execCommand) {
    return;
  }
  markDeleteNode(minder);
  if (minder.queryCommandState('RemoveNode') !== -1) minder.execCommand('RemoveNode');
}
</script>
