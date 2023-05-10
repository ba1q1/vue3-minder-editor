const LINE_ENDING = '\r';
const LINE_ENDING_SPLITER = /\r\n|\r|\n/;
const TAB_CHAR = '\t';

function exportTextTree(minder: any) {
  const minds = minder.exportJson();
  try {
    const link = document.createElement('a');
    const blob = new Blob([`\ufeff${encode(minds.root, 0)}`], {
      type: 'text/plain',
    });
    link.href = window.URL.createObjectURL(blob);
    link.download = `${minds.root.data.text}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    alert(err);
  }
}

function repeat(s: string, n: number) {
  let result = '';
  while (n--) result += s;
  return result;
}

function encode(json: any, level: number) {
  let local = '';
  level = level || 0;
  local += repeat(TAB_CHAR, level);
  local += json.data.text + LINE_ENDING;
  if (json.children) {
    json.children.forEach(function (child: any) {
      local += encode(child, level + 1);
    });
  }
  return local;
}

function isEmpty(line: string) {
  return !/\S/.test(line);
}

function getLevel(line: string) {
  let level = 0;
  while (line.charAt(level) === TAB_CHAR) level++;
  return level;
}

function getNode(line: string) {
  return {
    data: {
      text: line.replace(new RegExp(`^${TAB_CHAR}*`), ''),
    },
  };
}

/**
 * 文本解码
 *
 * @param {string} local 文本内容
 * @param {=boolean} root 自动根节点
 * @return {Object} 返回解析后节点
 */
function decode(local: string, root: boolean) {
  let json;
  let offset;
  const parentMap = [];
  const lines = local.split(LINE_ENDING_SPLITER);
  let line;
  let level;
  let node;

  function addChild(parent: any, child: any) {
    const children = parent.children || (parent.children = []);
    children.push(child);
  }
  if (root) {
    parentMap[0] = json = getNode('root');
    offset = 1;
  } else {
    offset = 0;
  }

  for (const element of lines) {
    line = element;
    if (isEmpty(line)) continue;

    level = getLevel(line) + offset;
    node = getNode(line);

    if (level === 0) {
      if (json) {
        throw new Error('Invalid local format');
      }
      json = node;
    } else {
      if (!parentMap[level - 1]) {
        throw new Error('Invalid local format');
      }
      addChild(parentMap[level - 1], node);
    }
    parentMap[level] = node;
  }
  return json;
}

export default { exportTextTree };
