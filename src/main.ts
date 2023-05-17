import mindEditor from './components/minderEditor.vue';
import { setupI18n } from '@/locale';
import store from '@/store';
import '@7polo/kity/dist/kity.js';
import 'hotbox-minder/hotbox.js';
import '@7polo/kityminder-core';
import './script/expose-editor';

export default {
  install: async (app: any) => {
    await setupI18n(app);
    app.component(mindEditor.name, mindEditor);
    app.use(store);
  },
};
