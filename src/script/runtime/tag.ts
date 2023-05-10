import { isDisableNode, isTagEnable } from '../tool/utils';
import { useLocale } from '@/hooks';

const { t } = useLocale();

export default function TagRuntime(this: any) {
  const { minder, hotbox } = this;
  const main = hotbox.state('main');

  main.button({
    position: 'top',
    label: t('minder.main.tag'),
    key: 'H',
    next: 'tag',
    enable() {
      if (isDisableNode(minder) && !isTagEnable(minder)) {
        return false;
      }
      return minder.queryCommandState('tag') != -1;
    },
  });

  const tag = hotbox.state('tag');

  tag.button({
    position: 'center',
    label: t('minder.commons.remove'),
    key: 'Del',
    action() {
      minder.execCommand('Tag', 0);
    },
  });

  tag.button({
    position: 'top',
    label: t('minder.commons.return'),
    key: 'esc',
    next: 'back',
  });
}
