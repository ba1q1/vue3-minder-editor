define(function (require, exports, module) {

  function PriorityRuntime() {
    var minder = this.minder;
    var hotbox = this.hotbox;
    var {isDisableNode} = require('../tool/utils');
    var {t} = require("../../locale");

    var main = hotbox.state('main');

    main.button({
      position: 'top',
      label: t('minder.main.priority'),
      key: 'P',
      next: 'priority',
      enable: function () {
        if (isDisableNode(minder)) {
          return false;
        }
        return minder.queryCommandState('priority') != -1;
      }
    });

    let priority = hotbox.state('priority')

    priority.button({
      position: 'center',
      label: t('minder.commons.remove'),
      key: 'Del',
      action: function () {
        minder.execCommand('Priority', 0);
      }
    });

    priority.button({
      position: 'top',
      label: t('minder.commons.return'),
      key: 'esc',
      next: 'back'
    });

  }
  return module.exports = PriorityRuntime;
});
