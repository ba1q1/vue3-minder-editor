<template>
  <div class="main-container">
    <header-menu
      :sequence-enable="sequenceEnable"
      :tag-enable="tagEnable"
      :progress-enable="progressEnable"
      :priority-count="priorityCount"
      :priority-prefix="priorityPrefix"
      :priority-start-with-zero="priorityStartWithZero"
      :tags="tags"
      :move-enable="moveEnable"
      :tag-edit-check="tagEditCheck"
      :tag-disable-check="tagDisableCheck"
      :priority-disable-check="priorityDisableCheck"
      :distinct-tags="distinctTags"
      :default-mold="defaultMold"
      @moldChange="handleMoldChange"
    />
    <main-editor
      :disabled="disabled"
      :sequence-enable="sequenceEnable"
      :tag-enable="tagEnable"
      :move-enable="moveEnable"
      :progress-enable="progressEnable"
      :import-json="importJson"
      :height="height"
      :tags="tags"
      :priority-count="priorityCount"
      :priority-prefix="priorityPrefix"
      :priority-start-with-zero="priorityStartWithZero"
      @afterMount="$emit('afterMount')"
      @save="save"/>
  </div>
</template>

<script>
import headerMenu from './main/header'
import mainEditor from './main/mainEditor'
import {editMenuProps, mainEditorProps, moleProps, priorityProps, tagProps} from "../props";
import Locale from '/src/mixins/locale';

export default {
  name: 'minderEditor',
  mixins: [Locale],
  components: {
    headerMenu,
    mainEditor
  },
  data() {
    return {
      minder: {}
    }
  },
  methods: {
    handleMoldChange(data) {
      this.$emit('moldChange', data);
    },
    save(data) {
      this.$emit('save', data);
    },
  },
  props: {
    ...editMenuProps,
    ...priorityProps,
    ...tagProps,
    ...moleProps,
    ...mainEditorProps
  },
}

</script>

<style scoped>
</style>
