define(function (require, exports, module) {

  function ProgressRuntime() {
    var minder = this.minder;
    var hotbox = this.hotbox;
    var {isDisableNode} = require('../tool/utils');
    var {t} = require("../../locale");

    var main = hotbox.state('main');

    main.button({
      position: 'top',
      label: t('minder.menu.progress.progress'),
      key: 'G',
      next: 'progress',
      enable: function () {
        if (isDisableNode(minder)) {
          return false;
        }
        return minder.queryCommandState('progress') != -1;
      }
    });

    var progress = hotbox.state('progress');
    '012345678'.replace(/./g, function (p) {
      progress.button({
        position: 'ring',
        label: 'G' + p,
        key: p,
        action: function () {
          minder.execCommand('Progress', parseInt(p) + 1);
        }
      });
    });

    progress.button({
      position: 'center',
      label: t('minder.commons.remove'),
      key: 'Del',
      action: function () {
        minder.execCommand('Progress', 0);
      }
    });

    progress.button({
      position: 'top',
      label: t('minder.commons.return'),
      key: 'esc',
      next: 'back'
    });
  }

  return module.exports = ProgressRuntime;

});
