if (!('innerText' in document.createElement('a')) && 'getSelection' in window) {
  Object.defineProperty(HTMLElement.prototype, 'innerText', {
    get() {
      const selection = window.getSelection();
      const ranges = [];
      let str;
      let i;
      if (selection) {
        for (i = 0; i < selection.rangeCount; i++) {
          ranges[i] = selection.getRangeAt(i);
        }

        selection.removeAllRanges();
        selection.selectAllChildren(this);
        str = selection.toString();
        selection.removeAllRanges();

        for (i = 0; i < ranges.length; i++) {
          selection.addRange(ranges[i]);
        }

        return str;
      }
      return '';
    },

    set(text) {
      this.innerHTML = (text || '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
    },
  });
}
