define(function (require, exports, module) {
  function NodeRuntime() {
    var runtime = this;
    var minder = this.minder;
    var hotbox = this.hotbox;
    var fsm = this.fsm;
    var {t} = require("../../locale");

    var main = hotbox.state('main');
    var {isDisableNode, markDeleteNode, isDeleteDisableNode} = require('../tool/utils');

    const buttons = [
      t('minder.menu.move.forward') + ':Alt+Up:ArrangeUp',
      t('minder.menu.insert._down') + ':Tab|Insert:AppendChildNode',
      t('minder.menu.insert._same') + ':Enter:AppendSiblingNode',
      t('minder.menu.move.backward') + ':Alt+Down:ArrangeDown',
      t('minder.commons.delete') + ':Delete|Backspace:RemoveNode',
      t('minder.menu.insert._up') + ':Shift+Tab|Shift+Insert:AppendParentNode'
    ];

    var AppendLock = 0;

    buttons.forEach(function (button) {
      var parts = button.split(':');
      var label = parts.shift();
      var key = parts.shift();
      var command = parts.shift();
      main.button({
        position: 'ring',
        label: label,
        key: key,
        action: function () {
          if (command.indexOf('Append') === 0) {
            AppendLock++;
            minder.execCommand(command, t('minder.main.subject.branch'));

            function afterAppend() {
              if (!--AppendLock) {
                runtime.editText();
              }
              minder.off('layoutallfinish', afterAppend);
            }
            minder.on('layoutallfinish', afterAppend);
          } else {
            if (command.indexOf('RemoveNode') > -1) {
              markDeleteNode(minder);
            }
            minder.execCommand(command);
            //fsm.jump('normal', 'command-executed');
          }
        },
        enable: function () {
          if (command.indexOf("RemoveNode") > -1) {
            if (isDeleteDisableNode(minder) &&
              (command.indexOf("AppendChildNode") < 0 && command.indexOf("AppendSiblingNode") < 0) ) {
              return false;
            }
          } else if(command.indexOf("ArrangeUp") > 0 || command.indexOf("ArrangeDown") > 0) {
            if (!minder.moveEnable) {
              return false;
            }
          } else if (command.indexOf("AppendChildNode") < 0 && command.indexOf("AppendSiblingNode") < 0) {
            if (isDisableNode(minder)) return false;
          }
          let node = minder.getSelectedNode();
          if (node && node.parent === null && command.indexOf("AppendSiblingNode") > -1) {
            return false;
          }
          return minder.queryCommandState(command) != -1;
        }
      });
    });

    main.button({
      position: 'ring',
      key: '/',
      action: function () {
        if (!minder.queryCommandState('expand')) {
          minder.execCommand('expand');
        } else if (!minder.queryCommandState('collapse')) {
          minder.execCommand('collapse');
        }
      },
      enable: function () {
        return minder.queryCommandState('expand') != -1 || minder.queryCommandState('collapse') != -1;
      },
      beforeShow: function () {
        if (!minder.queryCommandState('expand')) {
          this.$button.children[0].innerHTML = t('minder.menu.expand.expand');
        } else {
          this.$button.children[0].innerHTML = t('minder.menu.expand.folding');
        }
      }
    })
  }

  return module.exports = NodeRuntime;
});
