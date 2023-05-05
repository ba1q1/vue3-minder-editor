var DOMURL = window.URL || window.webkitURL || window;

function downloadImage(fileURI, fileName) {
  try {
    const link = document.createElement('a');
    link.href = fileURI;
    link.download = `${fileName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    alert(err);
  }
}

function loadImage(url, callback) {
  return new Promise(function (resolve, reject) {
    var image = document.createElement('img');
    image.onload = function () {
      resolve(this);
    };
    image.onerror = function (err) {
      reject(err);
    };
    image.crossOrigin = '';
    image.src = url;
  });
}

function getSVGInfo(minder) {
  var paper = minder.getPaper(),
    paperTransform,
    domContainer = paper.container,
    svgXml,
    $svg,

    renderContainer = minder.getRenderContainer(),
    renderBox = renderContainer.getRenderBox(),
    width = renderBox.width + 1,
    height = renderBox.height + 1,

    blob, svgUrl, img;

  // 保存原始变换，并且移动到合适的位置
  paperTransform = paper.shapeNode.getAttribute('transform');
  paper.shapeNode.setAttribute('transform', 'translate(0.5, 0.5)');
  renderContainer.translate(-renderBox.x, -renderBox.y);

  // 获取当前的 XML 代码
  svgXml = paper.container.innerHTML;

  // 回复原始变换及位置
  renderContainer.translate(renderBox.x, renderBox.y);
  paper.shapeNode.setAttribute('transform', paperTransform);

  // 过滤内容
  let el = document.createElement("div");
  el.innerHTML = svgXml;
  $svg = el.getElementsByTagName('svg');

  let index = $svg.length - 1;

  $svg[index].setAttribute('width', renderBox.width + 1);
  $svg[index].setAttribute('height', renderBox.height + 1);
  $svg[index].setAttribute('style', 'font-family: Arial, "Microsoft Yahei","Heiti SC";');

  let div = document.createElement("div");
  div.appendChild($svg[index]);
  svgXml = div.innerHTML;

  // Dummy IE
  svgXml = svgXml.replace(' xmlns="http://www.w3.org/2000/svg" xmlns:NS1="" NS1:ns1:xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:NS2="" NS2:xmlns:ns1=""', '');

  // svg 含有 &nbsp; 符号导出报错 Entity 'nbsp' not defined
  svgXml = svgXml.replace(/&nbsp;/g, '&#xa0;');

  blob = new Blob([svgXml], {
    type: 'image/svg+xml'
  });

  svgUrl = DOMURL.createObjectURL(blob);

  return {
    width: width,
    height: height,
    dataUrl: svgUrl,
    xml: svgXml
  };
}

function exportPNGImage(minder) {

  /* 绘制 PNG 的画布及上下文 */
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  /* 尝试获取背景图片 URL 或背景颜色 */
  var bgDeclare = minder.getStyle('background').toString();
  var bgUrl = /url\((.+)\)/.exec(bgDeclare);
  var bgColor = kity.Color.parse(bgDeclare);

  /* 获取 SVG 文件内容 */
  var svgInfo = getSVGInfo(minder);
  var width = svgInfo.width;
  var height = svgInfo.height;
  var svgDataUrl = svgInfo.dataUrl;

  /* 画布的填充大小 */
  var padding = 20;

  canvas.width = width + padding * 2;
  canvas.height = height + padding * 2;

  function fillBackground(ctx, style) {
    ctx.save();
    ctx.fillStyle = style;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  function drawImage(ctx, image, x, y) {
    ctx.drawImage(image, x, y);
  }

  function generateDataUrl(canvas) {
    try {
      var url = canvas.toDataURL('png');
      return url;
    } catch (e) {
      throw new Error('当前浏览器版本不支持导出 PNG 功能，请尝试升级到最新版本！');
    }
  }

  function drawSVG(minder) {
    var mind = editor.minder.exportJson();
    if (typeof (window.canvg) != 'undefined') {
      return new Promise(function (resolve) {
        window.canvg(canvas, svgInfo.xml, {
          ignoreMouse: true,
          ignoreAnimation: true,
          ignoreDimensions: true,
          ignoreClear: true,
          offsetX: padding,
          offsetY: padding,
          renderCallback: function () {
            downloadImage(generateDataUrl(canvas), mind.root.data.text);
          }
        });
      });
    } else {
      return loadImage(svgDataUrl).then(function (svgImage) {
        drawImage(ctx, svgImage, padding, padding);
        DOMURL.revokeObjectURL(svgDataUrl);
        downloadImage(generateDataUrl(canvas), mind.root.data.text);
      });
    }
  }

  if (bgUrl) {
    loadImage(bgUrl[1]).then(function (image) {
      fillBackground(ctx, ctx.createPattern(image, 'repeat'));
      drawSVG(minder);
    });
  } else {
    fillBackground(ctx, bgColor.toString());
    drawSVG(minder);
  }
}

export {
  exportPNGImage
}
