<template>
  <div :disabled="commandDisabled">

    <el-button type="info" class="delete-btn" icon="el-icon-delete" @click="execCommand(null)" circle></el-button>

    <el-button type="info" class="priority-btn"
               v-for="(item, index) in (priorityCount + 1)"
               :key="item"
               v-if="index != 0"
               :class="'priority-btn_' + index"
               @click="execCommand(index)" size="mini">{{priorityPrefix}}{{ priorityStartWithZero ? index - 1 : index }}</el-button>
  </div>
</template>

<script>
import {priorityProps} from "../../../props";
import {isDisableNode, setPriorityView} from "../../../script/tool/utils";
import Locale from '/src/mixins/locale';

export default {
  name: 'sequenceBox',
  mixins: [Locale],
  props: {
    ...priorityProps
  },
  data() {
    return {
      minder: undefined
    }
  },
  computed: {
    commandDisabled() {
      let minder = this.minder;
      if (!minder) return true;
      this.$nextTick(() => {
        this.setPriorityView();
      });
      minder.on && minder.on('interactchange', function () {
        this.commandValue = minder.queryCommandValue('priority');
      })
      if (isDisableNode(minder)) {
        return true;
      }
      if (this.priorityDisableCheck) {
        return this.priorityDisableCheck();
      }
      return minder.queryCommandState && minder.queryCommandState('priority') === -1;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.minder = window.minder;
      let minder = this.minder;
      let freshFuc = this.setPriorityView;
       minder.on && minder.on('contentchange', function () {
        // 异步执行，否则执行完，还会被重置
        setTimeout(function(){
          freshFuc(this.priorityStartWithZero, this.priorityPrefix);
        },0)
      });
    })
  },
  methods: {
    execCommand(index) {
      if (index) {
        this.commandDisabled || this.minder.execCommand('priority', index);
        this.setPriorityView();
      } else {
        this.commandDisabled || this.minder.execCommand('priority');
      }
    },
    setPriorityView() {
      setPriorityView(this.priorityStartWithZero, this.priorityPrefix);
    }
  },
}
</script>
<style scoped>

  .delete-btn {
    height: 23px;
    width: 23px;
    margin: 0px 4px;
    padding: 2px !important;
  }

  .el-button >>> .el-icon-delete {
    font-size: 4px;
  }

  .el-button+.el-button {
    margin-left: 0px;
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
    background-color: #FF1200;
    border-bottom: 3px solid #840023;
  }

  .priority-btn_1:hover {
    background-color: #FF1200;
    border-bottom: 3px solid #840023;
    color: white;
  }

  .priority-btn_2 {
    background-color: #0074FF;
    border-bottom: 3px solid #01467F;
  }
  .priority-btn_2:hover {
    background-color: #0074FF;
    border-bottom: 3px solid #01467F;
    color: white;
  }

  .priority-btn_3 {
    background-color: #00AF00;
    border-bottom: 3px solid #006300;
  }
  .priority-btn_3:hover {
    background-color: #00AF00;
    border-bottom: 3px solid #006300;
    color: white;
  }

  .priority-btn_4 {
    background-color: #FF962E;
    border-bottom: 3px solid #B25000;
  }
  .priority-btn_4:hover {
    background-color: #FF962E;
    border-bottom: 3px solid #B25000;
    color: white;
  }

  .priority-btn_5 {
    background-color: #A464FF;
    border-bottom: 3px solid #4720C4;
  }
  .priority-btn_5:hover {
    background-color: #A464FF;
    border-bottom: 3px solid #4720C4;
    color: white;
  }

  .priority-btn_6 {
    background-color: #A3A3A3;
    border-bottom: 3px solid #515151;
  }
  .priority-btn_6:hover {
    background-color: #A3A3A3;
    border-bottom: 3px solid #515151;
    color: white;
  }
</style>
