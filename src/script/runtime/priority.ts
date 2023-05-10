import { isDisableNode } from '../tool/utils';
import { useLocale } from '@/hooks';

const { t } = useLocale();

export default function PriorityRuntime(this: any): void {
  const { minder, hotbox } = this;

  const main = hotbox.state('main');

  main.button({
    position: 'top',
    label: t('minder.main.priority'),
    key: 'P',
    next: 'priority',
    enable() {
      if (isDisableNode(minder)) {
        return false;
      }
      return minder.queryCommandState('priority') != -1;
    },
  });

  const priority = hotbox.state('priority');

  priority.button({
    position: 'center',
    label: t('minder.commons.remove'),
    key: 'Del',
    action() {
      minder.execCommand('Priority', 0);
    },
  });

  priority.button({
    position: 'top',
    label: t('minder.commons.return'),
    key: 'esc',
    next: 'back',
  });
}
