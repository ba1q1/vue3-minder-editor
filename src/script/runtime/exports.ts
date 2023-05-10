import png from '../protocol/png';
import svg from '../protocol/svg';
import json from '../protocol/json';
import plain from '../protocol/plain';
import md from '../protocol/markdown';
import mm from '../protocol/freemind';
import { useLocale } from '@/hooks';

const { t } = useLocale();

export default function ExportRuntime(this: any) {
  const { minder, hotbox } = this;
  const exps = [
    { label: '.json', key: 'j', cmd: exportJson },
    { label: '.png', key: 'p', cmd: exportImage },
    { label: '.svg', key: 's', cmd: exportSVG },
    { label: '.txt', key: 't', cmd: exportTextTree },
    { label: '.md', key: 'm', cmd: exportMarkdown },
    { label: '.mm', key: 'f', cmd: exportFreeMind },
  ];

  const main = hotbox.state('main');
  main.button({
    position: 'top',
    label: t('minder.commons.export'),
    key: 'E',
    enable: canExp,
    next: 'exp',
  });

  const exp = hotbox.state('exp');
  exps.forEach((item) => {
    exp.button({
      position: 'ring',
      label: item.label,
      key: null,
      action: item.cmd,
    });
  });

  exp.button({
    position: 'center',
    label: t('minder.commons.cancel'),
    key: 'esc',
    next: 'back',
  });

  function canExp() {
    return true;
  }

  function exportJson() {
    json.exportJson(minder);
  }

  function exportImage() {
    png.exportPNGImage(minder);
  }

  function exportSVG() {
    svg.exportSVG(minder);
  }

  function exportTextTree() {
    plain.exportTextTree(minder);
  }

  function exportMarkdown() {
    md.exportMarkdown(minder);
  }

  function exportFreeMind() {
    mm.exportFreeMind(minder);
  }
}
