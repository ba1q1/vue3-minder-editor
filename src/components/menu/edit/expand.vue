<template>
  <div class="expand-group">
    <el-button class="tab-icons expand" @click="expandAll" />
    <el-row class="block-col-1">
      <el-col :span="24">
        <el-dropdown trigger="click" :hide-on-click="true" class="dropdown-toggle menu-btn" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ t('minder.menu.expand.expand') }}
            <el-icon><i-ep-caret-bottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu class="expand-dropdown-list">
              <el-dropdown-item class="expand-1 dropdown-item" command="1">{{
                t('minder.menu.expand.expand_one')
              }}</el-dropdown-item>
              <el-dropdown-item class="expand-2 dropdown-item" command="2">{{
                t('minder.menu.expand.expand_tow')
              }}</el-dropdown-item>
              <el-dropdown-item class="expand-3 dropdown-item" command="3">{{
                t('minder.menu.expand.expand_three')
              }}</el-dropdown-item>
              <el-dropdown-item class="expand-4 dropdown-item" command="4">{{
                t('minder.menu.expand.expand_four')
              }}</el-dropdown-item>
              <el-dropdown-item class="expand-5 dropdown-item" command="5">{{
                t('minder.menu.expand.expand_five')
              }}</el-dropdown-item>
              <el-dropdown-item class="expand-6 dropdown-item" command="6">{{
                t('minder.menu.expand.expand_six')
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" name="expand" setup>
import { useLocale } from '@/hooks';

const { t } = useLocale();

function handleCommand(command: string) {
  window.minder?.execCommand('ExpandToLevel', command);
}

function expandAll() {
  window.minder?.execCommand('ExpandToLevel', 9999);
}
</script>
