/**
 * Api 列表
 */

export let mainEditorProps = {
  importJson: {
    type: Object,
    default() {
      return {
        "root": {
          "data": {
            "text": "test111"
          },
          "children": [
            {
              "data": {
                  "text": "地图"
              }
            },
            {
              "data": {
                "text": "百科",
                "expandState":"collapse"
              }
            }
          ]
        },
        "template":"default"
      }
    }
  },
  height: {
    type: Number,
    default: 500,
  },
  disabled: Boolean
}

export let priorityProps = {
  priorityCount: {
    type: Number,
    default: 4,
    validator: function (value) {
      // 优先级最多支持 9 个级别
      return value <= 9;
    }
  },
  priorityStartWithZero: {
    // 优先级是否从0开始
    type: Boolean,
    default: true
  },
  priorityPrefix: {
    // 优先级显示的前缀
    type: String,
    default: 'P'
  },
  priorityDisableCheck: Function,
  operators: []
}

export let tagProps = {
  tags: {
    // 自定义标签
    type: Array,
    default() {
      return []
    }
  },
  distinctTags: {
    // 个别标签二选一
    type: Array,
    default() {
      return []
    }
  },
  tagDisableCheck: Function,
  tagEditCheck: Function
}

export let editMenuProps = {
  sequenceEnable: {
    type: Boolean,
    default: true
  },
  tagEnable: {
    type: Boolean,
    default: true
  },
  progressEnable: {
    type: Boolean,
    default: true
  },
  moveEnable: {
    type: Boolean,
    default: true
  },
}

export let moleProps = {
  // 默认样式
  defaultMold: {
    type: Number,
    default: 3
  }
}
