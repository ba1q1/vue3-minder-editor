<template lang="html">
  <div class="menu-container">
    <expand/>
    <selection/>
    <insert-box/>
    <move-box :move-enable="moveEnable"/>
    <edit-del/>
    <sequence-box
      v-if="sequenceEnable"
      :prefix="priorityPrefix"
      :priority-count="priorityCount"
      :priority-disable-check="priorityDisableCheck"
      :priority-start-with-zero="priorityStartWithZero"
    />
    <progress-box v-if="progressEnable"/>
    <tag-box
      v-if="tagEnable"
      :tags="tags"
      :tag-disable-check="tagDisableCheck"
      :tag-edit-check="tagEditCheck"
      :distinct-tags="distinctTags"
    />
  </div>
</template>

<script>
import insertBox from './insertBox'
import moveBox from './moveBox'
import editDel from './editDel'
import sequenceBox from './sequenceBox'
import progressBox from './progressBox'
import expand from './expand'
import selection from './selection'
import TagBox from "./tagBox";
import {editMenuProps, priorityProps, tagProps} from "../../../props";
import Locale from '/src/mixins/locale';

export default {
  name: 'editMenu',
  mixins: [Locale],
  components: {
    TagBox,
    insertBox,
    moveBox,
    editDel,
    sequenceBox,
    progressBox,
    expand,
    selection
  },
  props: {
    ...editMenuProps,
    ...priorityProps,
    ...tagProps
  },
}
</script>
