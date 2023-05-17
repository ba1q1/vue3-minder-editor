<template>
  <minder-editor
    class="minder-container"
    :import-json="importJson"
    :progress-enable="false"
    :height="height"
    :tags="tags"
    :default-mold="defaultMode"
    :del-confirm="delConfirm"
    :language="language"
    @save="save"
  />
  <button @click="toggleL">切换语言</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const importJson = {
  root: {
    data: {
      // 文本内容
      text: 'vue3-minder-editor',
      // 标签
      resource: ['模块1'],
      // 是否禁止修改
      // disable: true,
      // 默认展开或折叠，默认是展开的，collapse 可设为折叠
      // expandState: 'collapse',
      // 在 disable 为 true 的情况下，允许添加标签
      // tagEnable: true,
      // 在 disable 为 true 的情况下，允许删除节点
      // allowDelete: true,
      // 在 disable 为 true 的情况下，允许添加标签，优先级比 tagEnable 高
      // allowDisabledTag: true,
    },
    // 子节点
    children: [
      {
        data: {
          text: 'child1',
          // disable: true,
          expandState: 'collapse',
          resource: ['模块2'],
        },
        children: [
          {
            data: {
              text: '地图axxaaaa',
              disable: true,
              allowDelete: true,
              // tagEnable: true,
              allowDisabledTag: true,
              resource: ['模块12'],
              priority: 3,
              loaded: true,
            },
          },
        ],
      },
      {
        data: {
          text: 'child2',
        },
      },
    ],
  },
  template: 'default',
};
const height = 500;
const defaultMode = 3;
const tags = ['模块1', '用例', '前置条件', '测试步骤', '预期结果', '备注'];

const language = ref(localStorage.getItem('minder-locale') || 'zh-CN');

function save(data: any) {
  console.log(data);
}

function delConfirm() {
  console.log('-=-=-=-=-=-=-==');
  window.minder.forceRemoveNode();
}

function toggleL() {
  if (language.value === 'zh-CN') {
    language.value = 'en-US';
  } else {
    language.value = 'zh-CN';
  }
  localStorage.setItem('minder-locale', language.value);
}
</script>
