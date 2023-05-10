import mindEditor from './components/minderEditor.vue';
import '@7polo/kity/dist/kity.js';
import 'hotbox-minder/hotbox.js';
import '@7polo/kityminder-core';
import './script/expose-editor';

declare global {
  interface Window {
    editor: Record<string, any>;
    minder: Record<string, any>;
    minderEditor: Record<string, any>;
    km: Record<string, any>;
  }
}

export default {
  install: (app: any) => {
    app.component(mindEditor.name, mindEditor);
  },
};
