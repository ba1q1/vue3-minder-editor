<template>
  <div class="font-group">
    <el-select
      v-model="fontFamilyDefaultValue"
      :placeholder="t('minder.menu.font.font')"
      class="font-family-select"
      :disabled="disabledFont"
      @change="execCommandFontFamily"
    >
      <el-option
        v-for="item in fontFamilys"
        :key="item.id"
        :label="item.name"
        :value="item.value"
        :style="{ 'font-family': item.value }"
      />
    </el-select>
    <el-select
      v-model="fontSizeDefaultValue"
      :placeholder="t('minder.menu.font.size')"
      class="font-size-select"
      :disabled="disabledFontSize"
      @change="execCommandFontSize"
    >
      <el-option
        v-for="item in fontSizes"
        :key="item.id"
        :label="item.label"
        :value="item.value"
        :style="{
          'font-size': item.value + 'px',
          height: 2 * item.value + 'px',
          'line-height': 2 * item.value + 'px',
          padding: 0,
        }"
      />
    </el-select>
    <span class="font-btn">
      <span
        class="font-bold menu-btn tab-icons"
        :class="{ selected: boldSelected }"
        :disabled="disabledBold"
        @click="execCommandFontStyle('bold')"
      />
      <span
        class="font-italic menu-btn tab-icons"
        :class="{ selected: italicSelected }"
        :disabled="disabledItalic"
        @click="execCommandFontStyle('italic')"
      />
    </span>
  </div>
</template>

<script lang="ts" name="StyleOpreation" setup>
import { ref, computed } from 'vue';
import { useLocale } from '@/hooks';

const { t } = useLocale();

const fontFamilys = [
  {
    id: 1,
    value: '宋体,SimSun',
    name: '宋体',
  },
  {
    id: 2,
    value: '微软雅黑,Microsoft YaHei',
    name: '微软雅黑',
  },
  {
    id: 3,
    value: '楷体,楷体_GB2312,SimKai',
    name: '楷体',
  },
  {
    id: 4,
    value: '黑体, SimHei',
    name: '黑体',
  },
  {
    id: 5,
    value: '隶书, SimLi',
    name: '隶书',
  },
  {
    id: 6,
    value: 'andale mono',
    name: 'Andale Mono',
  },
  {
    id: 7,
    value: 'arial,helvetica,sans-serif',
    name: 'Arial',
  },
  {
    id: 8,
    value: 'arial black,avant garde',
    name: 'arialBlack',
  },
  {
    id: 9,
    value: 'comic sans ms',
    name: 'comic Sans Ms',
  },
  {
    id: 10,
    value: 'impact,chicago',
    name: 'Impact',
  },
  {
    id: 11,
    value: 'times new roman',
    name: 'times New Roman',
  },
  {
    id: 12,
    value: 'sans-serif',
    name: 'Sans-Serif',
  },
];
const fontSizes = [
  {
    id: 1,
    value: 10,
    label: 10,
  },
  {
    id: 2,
    value: 12,
    label: 12,
  },
  {
    id: 3,
    value: 16,
    label: 16,
  },
  {
    id: 4,
    value: 18,
    label: 18,
  },
  {
    id: 5,
    value: 24,
    label: 24,
  },
  {
    id: 6,
    value: 32,
    label: 32,
  },
  {
    id: 7,
    value: 48,
    label: 48,
  },
];

const fontFamilyDefaultValue = ref(t('minder.menu.font.font'));
const fontSizeDefaultValue = ref(t('minder.menu.font.size'));

// const currentTheme = computed(() => window.minder.getThemeItems());
const disabledFont = computed(() => {
  try {
    if (!window.minder) return false;
  } catch (e) {
    // 如果window的还没挂载minder，先捕捉undefined异常
    return false;
  }

  const currentFontFamily = window.minder.queryCommandValue('fontfamily');
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  fontFamilyDefaultValue.value = currentFontFamily || t('minder.menu.font.font');
  return window.minder.queryCommandState('fontfamily') === -1;
});
const disabledFontSize = computed(() => {
  try {
    if (!window.minder) return false;
  } catch (e) {
    // 如果window的还没挂载minder，先捕捉undefined异常
    return false;
  }
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  fontSizeDefaultValue.value = window.minder.queryCommandValue('fontsize') || t('minder.menu.font.size');
  return window.minder.queryCommandState('fontsize') === -1;
});
const disabledBold = computed(() => {
  try {
    if (!window.minder) return false;
  } catch (e) {
    // 如果window的还没挂载minder，先捕捉undefined异常
    return false;
  }
  return window.minder.queryCommandState('bold') === -1;
});
const disabledItalic = computed(() => {
  try {
    if (!window.minder) return false;
  } catch (e) {
    // 如果window的还没挂载minder，先捕捉undefined异常
    return false;
  }
  return window.minder.queryCommandState('italic') === -1;
});
const boldSelected = computed(() => {
  try {
    if (!window.minder) return false;
  } catch (e) {
    // 如果window的还没挂载minder，先捕捉undefined异常
    return false;
  }
  return window.minder.queryCommandState('bold') === -1;
});
const italicSelected = computed(() => {
  try {
    if (!window.minder) return false;
  } catch (e) {
    // 如果window的还没挂载minder，先捕捉undefined异常
    return false;
  }
  return window.minder.queryCommandState('italic') === -1;
});

function execCommandFontFamily(value: string) {
  if (value === t('minder.menu.font.font')) {
    return;
  }
  window.minder.execCommand('fontfamily', value);
}

function execCommandFontSize(value: number) {
  if (typeof value !== 'number') {
    return;
  }
  window.minder.execCommand('fontsize', value);
}

function execCommandFontStyle(style: string) {
  switch (style) {
    case 'bold':
      if (window.minder.queryCommandState('bold') !== -1) {
        window.minder.execCommand('bold');
      }
      break;
    case 'italic':
      if (window.minder.queryCommandState('italic') !== -1) {
        window.minder.execCommand('italic');
      }
      break;
    default:
  }
}
</script>

<style lang="scss">
.font-group {
  margin-left: 10px;
}

.font-btn {
  margin-top: 2px;
}
</style>
