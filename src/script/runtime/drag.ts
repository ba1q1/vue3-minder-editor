/**
 * @fileOverview
 *
 * 用于拖拽节点时屏蔽键盘事件
 *
 * @author: techird
 * @copyright: Baidu FEX, 2014
 */
interface DragRuntimeOptions {
  fsm: any;
  minder: any;
  hotbox: any;
  receiver: any;
}

function createDragRuntime(this: DragRuntimeOptions) {
  const { fsm, minder, hotbox } = this;

  // setup everything to go
  setupFsm();

  // listen the fsm changes, make action.
  function setupFsm() {
    // when jumped to drag mode, enter
    fsm.when('* -> drag', function () {
      // now is drag mode
    });

    fsm.when('drag -> *', function (exit: any, enter: any, reason: string) {
      if (reason == 'drag-finish') {
        // now exit drag mode
      }
    });
  }

  let downX: number;
  let downY: number;
  const MOUSE_HAS_DOWN = 0;
  const MOUSE_HAS_UP = 1;
  const BOUND_CHECK = 20;
  let flag = MOUSE_HAS_UP;
  let maxX: number;
  let maxY: number;
  let containerY: number;
  let freeHorizen = false;
  let freeVirtical = false;
  let frame: number | null = null;

  function move(direction: 'left' | 'top' | 'right' | 'bottom' | false, speed?: number) {
    if (!direction) {
      freeHorizen = freeVirtical = false;
      frame && cancelAnimationFrame(frame);
      frame = null;
      return;
    }
    if (!frame) {
      frame = requestAnimationFrame(
        (function (direction: 'left' | 'top' | 'right' | 'bottom', speed: number, minder: any) {
          return function (frame) {
            switch (direction) {
              case 'left':
                minder._viewDragger.move(
                  {
                    x: -speed,
                    y: 0,
                  },
                  0
                );
                break;
              case 'top':
                minder._viewDragger.move(
                  {
                    x: 0,
                    y: -speed,
                  },
                  0
                );
                break;
              case 'right':
                minder._viewDragger.move(
                  {
                    x: speed,
                    y: 0,
                  },
                  0
                );
                break;
              case 'bottom':
                minder._viewDragger.move(
                  {
                    x: 0,
                    y: speed,
                  },
                  0
                );
                break;
              default:
                return;
            }
            frame && requestAnimationFrame(frame as any);
          };
        })(direction, speed!, minder)
      );
    }
  }

  minder.on('mousedown', function (e: any) {
    flag = MOUSE_HAS_DOWN;
    const rect = minder.getPaper().container.getBoundingClientRect();
    downX = e.originEvent.clientX;
    downY = e.originEvent.clientY;
    containerY = rect.top;
    maxX = rect.width;
    maxY = rect.height;
  });

  minder.on('mousemove', function (e: any) {
    if (
      fsm.state() === 'drag' &&
      flag === MOUSE_HAS_DOWN &&
      minder.getSelectedNode() &&
      (Math.abs(downX - e.originEvent.clientX) > BOUND_CHECK || Math.abs(downY - e.originEvent.clientY) > BOUND_CHECK)
    ) {
      const osx = e.originEvent.clientX;
      const osy = e.originEvent.clientY - containerY;

      if (osx < BOUND_CHECK) {
        move('right', BOUND_CHECK - osx);
      } else if (osx > maxX - BOUND_CHECK) {
        move('left', BOUND_CHECK + osx - maxX);
      } else {
        freeHorizen = true;
      }

      if (osy < BOUND_CHECK) {
        move('bottom', osy);
      } else if (osy > maxY - BOUND_CHECK) {
        move('top', BOUND_CHECK + osy - maxY);
      } else {
        freeVirtical = true;
      }

      if (freeHorizen && freeVirtical) {
        move(false);
      }
    }

    if (
      fsm.state() !== 'drag' &&
      flag === MOUSE_HAS_DOWN &&
      minder.getSelectedNode() &&
      (Math.abs(downX - e.originEvent.clientX) > BOUND_CHECK || Math.abs(downY - e.originEvent.clientY) > BOUND_CHECK)
    ) {
      if (fsm.state() === 'hotbox') {
        hotbox.active(window.HotBox.STATE_IDLE);
      }

      fsm.jump('drag', 'user-drag');
    }
  });

  window.addEventListener(
    'mouseup',
    () => {
      flag = MOUSE_HAS_UP;
      if (fsm.state() === 'drag') {
        move(false);
        fsm.jump('normal', 'drag-finish');
      }
    },
    false
  );
}
export default createDragRuntime;
