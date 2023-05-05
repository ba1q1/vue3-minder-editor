import mindEditor from './components/minderEditor'
import * as locale from "./locale";
import PackageJSON from "../package.json"
require('@7polo/kity/dist/kity.js');
require('hotbox-minder/hotbox.js');
require('@7polo/kityminder-core');
require('./script/expose-editor.js');


const install = function (Vue, options = {}) {
  locale.use(options.locale);
  locale.i18n(options.i18n);
  Vue.component(mindEditor.name, mindEditor);
}

const plugin = {
  name: "vueMinderEditorPlus",
  version: PackageJSON.version,
  locale: locale.use,
  i18n: locale.i18n,
  install,
}

export default plugin;
