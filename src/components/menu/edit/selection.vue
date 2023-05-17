<template>
  <div class="selection-group">
    <el-button class="tab-icons selection" @click="selectAll" />
    <el-row class="block-col-1">
      <el-col :span="24">
        <el-dropdown trigger="click" :hide-on-click="true" class="dropdown-toggle menu-btn" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ t('minder.menu.selection.all') }}
            <el-icon><i-ep-caret-bottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu class="selection-dropdown-list">
              <el-dropdown-item class="selection-1 dropdown-item" command="1">
                {{ t('minder.menu.selection.invert') }}
              </el-dropdown-item>
              <el-dropdown-item class="selection-2 dropdown-item" command="2">
                {{ t('minder.menu.selection.sibling') }}
              </el-dropdown-item>
              <el-dropdown-item class="selection-3 dropdown-item" command="3">
                {{ t('minder.menu.selection.same') }}
              </el-dropdown-item>
              <el-dropdown-item class="selection-4 dropdown-item" command="4">
                {{ t('minder.menu.selection.path') }}
              </el-dropdown-item>
              <el-dropdown-item class="selection-5 dropdown-item" command="5">
                {{ t('minder.menu.selection.subtree') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" name="selection" setup>
import { useI18n } from '@/hooks/useI18n';

const { t } = useI18n();

function selectAll() {
  const selection: any[] = [];
  window.minder.getRoot().traverse(function (node: any) {
    selection.push(node);
  });
  window.minder.select(selection, true);
  window.minder.fire('receiverfocus');
}

function selectRevert() {
  const selected = window.minder.getSelectedNodes();
  const selection: any[] = [];
  window.minder.getRoot().traverse(function (node: any) {
    if (selected.indexOf(node) === -1) {
      selection.push(node);
    }
  });
  window.minder.select(selection, true);
  window.minder.fire('receiverfocus');
}

function selectSiblings() {
  const selected = window.minder.getSelectedNodes();
  const selection: any[] = [];
  selected.forEach((node: any) => {
    if (!node.parent) return;
    node.parent.children.forEach((sibling: string) => {
      if (selection.indexOf(sibling) === -1) selection.push(sibling);
    });
  });
  window.minder.select(selection, true);
  window.minder.fire('receiverfocus');
}

function selectLevel() {
  const selectedLevel = window.minder.getSelectedNodes().map((node: any) => node.getLevel());
  const selection: any[] = [];
  window.minder.getRoot().traverse((node: any) => {
    if (selectedLevel.indexOf(node.getLevel()) !== -1) {
      selection.push(node);
    }
  });
  window.minder.select(selection, true);
  window.minder.fire('receiverfocus');
}

function selectPath() {
  const selected = window.minder.getSelectedNodes();
  const selection: any[] = [];
  selected.forEach((node: any) => {
    let tempNode = node;
    while (tempNode && selection.indexOf(tempNode) === -1) {
      selection.push(tempNode);
      tempNode = node.parent;
    }
  });
  window.minder.select(selection, true);
  window.minder.fire('receiverfocus');
}

function selectTree() {
  const selected = window.minder.getSelectedNodes();
  const selection: any[] = [];
  selected.forEach((parent: any) => {
    parent.traverse((node: any) => {
      if (selection.indexOf(node) === -1) selection.push(node);
    });
  });
  window.minder.select(selection, true);
  window.minder.fire('receiverfocus');
}

function handleCommand(command: string) {
  // eslint-disable-next-line no-bitwise
  switch (~~command) {
    case 1:
      selectRevert();
      break;
    case 2:
      selectSiblings();
      break;
    case 3:
      selectLevel();
      break;
    case 4:
      selectPath();
      break;
    case 5:
      selectTree();
      break;
    default:
  }
}
</script>
