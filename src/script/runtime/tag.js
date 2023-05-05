
define(function (require, exports, module) {

  function TagRuntime() {
    var minder = this.minder;
    var hotbox = this.hotbox;
    var {isDisableNode, isTagEnable} = require('../tool/utils');
    var {t} = require("../../locale");
    var main = hotbox.state('main');

    main.button({
      position: 'top',
      label: t('minder.main.tag'),
      key: 'H',
      next: 'tag',
      enable: function () {
        if (isDisableNode(minder) && !isTagEnable(minder)) {
          return false;
        }
        return minder.queryCommandState('tag') != -1;
      }
    });

    let tag = hotbox.state('tag');

    tag.button({
      position: 'center',
      label: t('minder.commons.remove'),
      key: 'Del',
      action: function () {
        minder.execCommand('Tag', 0);
      }
    });

    tag.button({
      position: 'top',
      label: t('minder.commons.return'),
      key: 'esc',
      next: 'back'
    });
  }

  return module.exports = TagRuntime;

});
