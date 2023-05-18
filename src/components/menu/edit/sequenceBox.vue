<template>
  <div :disabled="commandDisabled">
    <a-button class="delete-btn" shape="circle" @click="execCommand()">
      <template #icon>
        <icon-delete />
      </template>
    </a-button>
    <template v-for="(item, pIndex) in priorityCount + 1">
      <a-button
        v-if="pIndex != 0"
        :key="item"
        class="priority-btn"
        :class="'priority-btn_' + pIndex"
        size="small"
        @click="execCommand(pIndex)"
      >
        {{ priorityPrefix }}{{ priorityStartWithZero ? pIndex - 1 : pIndex }}
      </a-button>
    </template>
  </div>
</template>

<script lang="ts" name="sequenceBox" setup>
import { onMounted, reactive, nextTick, ref } from 'vue';
import { isDisableNode, setPriorityView } from '@/script/tool/utils';
import { priorityProps } from '@/props';

const props = defineProps(priorityProps);

const commandValue = ref('');
const commandDisabled = ref(true);
let minder = reactive<any>({});

onMounted(() => {
  nextTick(() => {
    minder = window.minder;
    const freshFuc = setPriorityView;
    if (minder.on) {
      minder.on('contentchange', () => {
        // 异步执行，否则执行完，还会被重置
        setTimeout(() => {
          freshFuc(props.priorityStartWithZero, props.priorityPrefix);
        }, 0);
      });
      minder.on('selectionchange', () => {
        commandDisabled.value = isDisable();
      });
    }
  });
});

const isDisable = (): boolean => {
  if (Object.keys(minder).length === 0) return true;
  nextTick(() => {
    setPriorityView(props.priorityStartWithZero, props.priorityPrefix);
  });
  if (minder.on) {
    minder.on('interactchange', () => {
      commandValue.value = minder.queryCommandValue && minder.queryCommandValue('priority');
    });
  }
  const node = minder.getSelectedNode();
  if (isDisableNode(minder) || !node || node.parent === null) {
    return true;
  }
  if (props.priorityDisableCheck) {
    return props.priorityDisableCheck();
  }
  return !!minder.queryCommandState && minder.queryCommandState('priority') === -1;
};

function execCommand(index?: number) {
  if (index && minder.execCommand) {
    if (!commandDisabled.value) {
      minder.execCommand('priority', index);
    }
    setPriorityView(props.priorityStartWithZero, props.priorityPrefix);
  } else if (minder.execCommand && !commandDisabled.value) {
    minder.execCommand('priority');
  }
}
</script>

<style lang="scss" scoped>
.delete-btn {
  height: 23px;
  width: 23px;
  margin: 0px 4px;
  padding: 2px !important;
  i {
    width: 1em !important;
    height: 1em !important;
  }
}

.priority-btn {
  border-radius: 8px;
  padding: 0px;
  padding-right: 5px;
  font-style: italic;
  font-size: 12px;
  height: 22px;
  width: 22px;
  margin-right: 4px;
  color: white;
  border: 0px;
}

.priority-btn_1 {
  background-color: #ff1200;
  border-bottom: 3px solid #840023;
}

.priority-btn_1:hover {
  background-color: #ff1200;
  border-bottom: 3px solid #840023;
  color: white;
}

.priority-btn_2 {
  background-color: #0074ff;
  border-bottom: 3px solid #01467f;
}
.priority-btn_2:hover {
  background-color: #0074ff;
  border-bottom: 3px solid #01467f;
  color: white;
}

.priority-btn_3 {
  background-color: #00af00;
  border-bottom: 3px solid #006300;
}
.priority-btn_3:hover {
  background-color: #00af00;
  border-bottom: 3px solid #006300;
  color: white;
}

.priority-btn_4 {
  background-color: #ff962e;
  border-bottom: 3px solid #b25000;
}
.priority-btn_4:hover {
  background-color: #ff962e;
  border-bottom: 3px solid #b25000;
  color: white;
}

.priority-btn_5 {
  background-color: #a464ff;
  border-bottom: 3px solid #4720c4;
}
.priority-btn_5:hover {
  background-color: #a464ff;
  border-bottom: 3px solid #4720c4;
  color: white;
}

.priority-btn_6 {
  background-color: #a3a3a3;
  border-bottom: 3px solid #515151;
}
.priority-btn_6:hover {
  background-color: #a3a3a3;
  border-bottom: 3px solid #515151;
  color: white;
}
</style>
