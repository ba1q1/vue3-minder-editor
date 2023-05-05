function exportSVG(minder) {

  var paper = minder.getPaper();
  var paperTransform = paper.shapeNode.getAttribute('transform');
  var svgXml;
  var $svg;

  var renderContainer = minder.getRenderContainer();
  var renderBox = renderContainer.getRenderBox();
  var transform = renderContainer.getTransform();
  var width = renderBox.width;
  var height = renderBox.height;
  var padding = 20;

  paper.shapeNode.setAttribute('transform', 'translate(0.5, 0.5)');
  svgXml = paper.container.innerHTML;
  console.log(svgXml);
  paper.shapeNode.setAttribute('transform', paperTransform);

  let document = window.document;
  let el = document.createElement("div");
  el.innerHTML = svgXml;
  $svg = el.getElementsByTagName('svg');

  let index = $svg.length - 1;

  $svg[index].setAttribute('width', width + padding * 2 | 0);
  $svg[index].setAttribute('height', height + padding * 2 | 0);
  $svg[index].setAttribute('style', 'font-family: Arial, "Microsoft Yahei",  "Heiti SC"; background: ' + minder.getStyle('background'));

  $svg[index].setAttribute('viewBox', [renderBox.x - padding | 0,
  renderBox.y - padding | 0,
  width + padding * 2 | 0,
  height + padding * 2 | 0
  ].join(' '));

  let div = document.createElement("div");
  div.appendChild($svg[index]);
  svgXml = div.innerHTML;
  svgXml = svgXml.replace(/&nbsp;/g, '&#xa0;');

  var blob = new Blob([svgXml], {
    type: 'image/svg+xml'
  });

  var DOMURL = window.URL || window.webkitURL || window;
  var svgUrl = DOMURL.createObjectURL(blob);

  var mind = editor.minder.exportJson();
  downloadSVG(svgUrl, mind.root.data.text);
}

function downloadSVG(fileURI, fileName) {
  try {
    const link = document.createElement('a');
    link.href = fileURI;
    link.download = `${fileName}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    alert(err);
  }
}

export {
  exportSVG
}
