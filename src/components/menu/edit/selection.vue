<template>
<div class="selection-group">

  <el-button class="tab-icons selection" @click="selectAll"></el-button>
  <el-row class="block-col-1">
    <el-col :span="24">
      <el-dropdown trigger="click" :hide-on-click="true" class="dropdown-toggle menu-btn" @command="handleCommand">
        <span class="el-dropdown-link">
          {{t('minder.menu.selection.all')}}
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="selection-dropdown-list">
          <el-dropdown-item class="selection-1 dropdown-item" command="1">
            {{t('minder.menu.selection.invert')}}
          </el-dropdown-item>
          <el-dropdown-item class="selection-2 dropdown-item" command="2">
            {{t('minder.menu.selection.sibling')}}
          </el-dropdown-item>
          <el-dropdown-item class="selection-3 dropdown-item" command="3">
            {{t('minder.menu.selection.same')}}
          </el-dropdown-item>
          <el-dropdown-item class="selection-4 dropdown-item" command="4">
            {{t('minder.menu.selection.path')}}
          </el-dropdown-item>
          <el-dropdown-item class="selection-5 dropdown-item" command="5">
            {{t('minder.menu.selection.subtree')}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</div>
</template>

<script>
import Locale from '/src/mixins/locale';
export default {
  name: 'selection',
  mixins: [Locale],
  methods: {
    selectAll() {
      let selection = [];
      minder.getRoot().traverse(function (node) {
        selection.push(node);
      });
      minder.select(selection, true);
      minder.fire('receiverfocus');
    },

    selectRevert() {
      let selected = minder.getSelectedNodes();
      let selection = [];
      minder.getRoot().traverse(function (node) {
        if (selected.indexOf(node) == -1) {
          selection.push(node);
        }
      });
      minder.select(selection, true);
      minder.fire('receiverfocus');
    },

    selectSiblings() {
      var selected = minder.getSelectedNodes();
      var selection = [];
      selected.forEach(function (node) {
        if (!node.parent) return;
        node.parent.children.forEach(function (sibling) {
          if (selection.indexOf(sibling) == -1) selection.push(sibling);
        });
      });
      minder.select(selection, true);
      minder.fire('receiverfocus');
    },

    selectLevel: function () {
      var selectedLevel = minder.getSelectedNodes().map(function (node) {
        return node.getLevel();
      });
      var selection = [];
      minder.getRoot().traverse(function (node) {
        if (selectedLevel.indexOf(node.getLevel()) != -1) {
          selection.push(node);
        }
      });
      minder.select(selection, true);
      minder.fire('receiverfocus');
    },

    selectPath: function () {
      var selected = minder.getSelectedNodes();
      var selection = [];
      selected.forEach(function (node) {
        while (node && selection.indexOf(node) == -1) {
          selection.push(node);
          node = node.parent;
        }
      });
      minder.select(selection, true);
      minder.fire('receiverfocus');
    },

    selectTree: function () {
      var selected = minder.getSelectedNodes();
      var selection = [];
      selected.forEach(function (parent) {
        parent.traverse(function (node) {
          if (selection.indexOf(node) == -1) selection.push(node);
        });
      });
      minder.select(selection, true);
      minder.fire('receiverfocus');
    },

    handleCommand(command) {
      switch (~~command) {
        case 1:
          this.selectRevert()
          break;
        case 2:
          this.selectSiblings()
          break;
        case 3:
          this.selectLevel()
          break;
        case 4:
          this.selectPath()
          break;
        case 5:
          this.selectTree()
          break;
      }
    }
  }
}
</script>
