import container from './runtime/container';
import fsm from './runtime/fsm';
import minder from './runtime/minder';
import receiver from './runtime/receiver';
import hotbox from './runtime/hotbox';
import input from './runtime/input';
import clipboardMimetype from './runtime/clipboard-mimetype';
import clipboard from './runtime/clipboard';
import drag from './runtime/drag';
import node from './runtime/node';
import history from './runtime/history';
import jumping from './runtime/jumping';
import priority from './runtime/priority';
import progress from './runtime/progress';
import exportsRuntime from './runtime/exports';
import tag from './runtime/tag';

type EditMenuProps = {
  sequenceEnable: boolean;
  tagEnable: boolean;
  progressEnable: boolean;
  moveEnable: boolean;
};

type Runtime = {
  name: string;
  call: (thisArg: KMEditor, editor: KMEditor) => void;
};

const runtimes: Runtime[] = [];

function assemble(runtime: Runtime) {
  runtimes.push(runtime);
}

class KMEditor {
  public selector: HTMLDivElement | null | string;

  public editMenuProps: EditMenuProps;

  constructor(selector: HTMLDivElement | null | string, editMenuPropsC: EditMenuProps) {
    this.selector = selector;
    this.editMenuProps = editMenuPropsC;
    this.init();
  }

  public init() {
    for (let i = 0; i < runtimes.length; i++) {
      if (typeof runtimes[i].call === 'function' && isEnable(this.editMenuProps, runtimes[i])) {
        runtimes[i].call(this, this);
      }
    }
  }
}

function isEnable(editMenuProps: EditMenuProps, runtime: Runtime) {
  switch (runtime.name) {
    case 'PriorityRuntime':
      return editMenuProps.sequenceEnable === true;
    case 'TagRuntime':
      return editMenuProps.tagEnable === true;
    case 'ProgressRuntime':
      return editMenuProps.progressEnable === true;
    default:
      return true;
  }
}

assemble(container);
assemble(fsm);
assemble(minder);
assemble(receiver);
assemble(hotbox);
assemble(input);
assemble(clipboardMimetype);
assemble(clipboard);
assemble(drag);
assemble(node);
assemble(history);
assemble(jumping);
assemble(priority);
assemble(progress);
assemble(exportsRuntime);
assemble(tag);

export default KMEditor;
