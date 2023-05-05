
define(function (require, exports, module) {
  var png = require("../protocol/png");
  var svg = require("../protocol/svg");
  var json = require("../protocol/json");
  var plain = require("../protocol/plain");
  var md = require("../protocol/markdown");
  var mm = require("../protocol/freemind");
  var {t} = require("../../locale");

  function ExportRuntime() {
    var minder = this.minder;
    var hotbox = this.hotbox;
    var exps = [
      {label: '.json', key: 'j', cmd: exportJson},
      {label: '.png', key: 'p', cmd: exportImage},
      {label: '.svg', key: 's', cmd: exportSVG},
      {label: '.txt', key: 't', cmd: exportTextTree},
      {label: '.md', key: 'm', cmd: exportMarkdown},
      {label: '.mm', key: 'f', cmd: exportFreeMind}
    ];


    var main = hotbox.state('main');
    main.button({
      position: 'top',
      label: t('minder.commons.export'),
      key: 'E',
      enable: canExp,
      next: 'exp'
    });

    var exp = hotbox.state('exp');
    exps.forEach(item => {
      exp.button({
        position: 'ring',
        label: item.label,
        key: null,
        action: item.cmd
      });
    });

    exp.button({
      position: 'center',
      label: t('minder.commons.cancel'),
      key: 'esc',
      next: 'back'
    });

    function canExp() {
      return true;
    }

    function exportJson(){
      json.exportJson(minder);
    }

    function exportImage (){
      png.exportPNGImage(minder);
    }

    function exportSVG (){
      svg.exportSVG(minder);
    }

    function exportTextTree (){
      plain.exportTextTree(minder);
    }

    function exportMarkdown (){
      md.exportMarkdown(minder);
    }

    function exportFreeMind (){
      mm.exportFreeMind(minder);
    }
  }

  return module.exports = ExportRuntime;
});
