interface Position {
  x: number;
  y: number;
}

function HotboxRuntime(this: any) {
  const fsm = this.fsm;
  const minder = this.minder;
  const receiver = this.receiver;
  const container = this.container;
  const HotBox = window.HotBox;
  const hotbox = new HotBox(container);

  hotbox.setParentFSM(fsm);

  fsm.when('normal -> hotbox', (exit: any, enter: any, reason: any) => {
    const node = minder.getSelectedNode();
    let position: Position | undefined;
    if (node) {
      const box = node.getRenderBox();
      position = {
        x: box.cx,
        y: box.cy,
      };
    }
    hotbox.active('main', position);
  });

  fsm.when('normal -> normal', (exit: any, enter: any, reason: any, e: any) => {
    if (reason == 'shortcut-handle') {
      const handleResult = hotbox.dispatch(e);
      if (handleResult) {
        e.preventDefault();
      } else {
        minder.dispatchKeyEvent(e);
      }
    }
  });

  fsm.when('modal -> normal', (exit: any, enter: any, reason: any, e: any) => {
    if (reason == 'import-text-finish') {
      receiver.element.focus();
    }
  });

  this.hotbox = hotbox;
  minder.hotbox = hotbox;
}

export default HotboxRuntime;
