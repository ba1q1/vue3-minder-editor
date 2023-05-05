export function isDisableNode(minder) {
  let node = undefined;
  if (minder && minder.getSelectedNode) {
    node = minder.getSelectedNode();
  }
  if (node && node.data.disable === true) {
    return true;
  }
  return false;
}

export function isDeleteDisableNode(minder) {
  let node = undefined;
  if (minder && minder.getSelectedNode) {
    node = minder.getSelectedNode();
  }
  if (node && node.data.disable === true && !node.data.allowDelete) {
    return true;
  }
  return false;
}

export function isTagEnable(minder) {
  let node = undefined;
  if (minder && minder.getSelectedNode) {
    node = minder.getSelectedNode();
  }
  if (node && node.data.tagEnable === true) {
    return true;
  }
  return false;
}

export function markChangeNode(node) {
  if (node && node.data) {
    // 修改的该节点标记为 contextChanged
    node.data.contextChanged = true;
    while (node) {
      // 该路径上的节点都标记为 changed
      node.data.changed = true;
      node = node.parent;
    }
  }
}

// 在父节点记录删除的节点
export function markDeleteNode(minder) {
  if (minder) {
    let nodes = minder.getSelectedNodes();
    nodes.forEach(node => {
      if (node && node.parent) {
        let pData = node.parent.data;
        if (!pData.deleteChild) {
          pData.deleteChild = [];
        }
        _markDeleteNode(node, pData.deleteChild);
      }
    });
  }
}

function _markDeleteNode(node, deleteChild) {
  deleteChild.push(node.data);
  if (node.children) {
    node.children.forEach(child => {
      _markDeleteNode(child, deleteChild);
    });
  }
}

export function isPriority(e) {
  if (e.getAttribute('text-rendering') === 'geometricPrecision'
    && e.getAttribute('text-anchor') === 'middle'
  ) {
    return true;
  }
  return false;
}

export function setPriorityView(priorityStartWithZero, priorityPrefix) {
  //手动将优先级前面加上P显示
  let items = document.getElementsByTagName('text');
  if (items) {
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (isPriority(item)) {
        let content = item.innerHTML;
        if (content.indexOf(priorityPrefix) < 0) {
          if (priorityStartWithZero) {
            content = parseInt(content) - 1 + '';
          }
          item.innerHTML = priorityPrefix + content;
        }
      }
    }
  }
}

/**
 * 将节点及其子节点id置为null，changed 标记为true
 * @param node
 */
export function resetNodes(nodes) {
  if (nodes) {
    nodes.forEach(item => {
      if (item.data) {
        item.data.id = null;
        item.data.contextChanged = true;
        item.data.changed = true;
        resetNodes(item.children);
      }
    });
  }
}
