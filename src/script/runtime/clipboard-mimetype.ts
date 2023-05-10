interface MimeTypes {
  [key: string]: string;
}

interface Signatures {
  [key: string]: string;
}

declare global {
  interface Window {
    kity: any;
  }
}

const MimeType = function () {
  const SPLITOR = '\uFEFF';
  const MIMETYPE: MimeTypes = {
    'application/km': '\uFFFF',
  };
  const SIGN: Signatures = {
    '\uFEFF': 'SPLITOR',
    '\uFFFF': 'application/km',
  };

  function process(mimetype: string | false, text: string): string {
    if (!isPureText(text)) {
      const _mimetype = whichMimeType(text);
      if (!_mimetype) {
        throw new Error('unknown mimetype!');
      }
      text = getPureText(text);
    }
    if (mimetype === false) {
      return text;
    }
    return mimetype + SPLITOR + text;
  }

  function registMimeTypeProtocol(type: string, sign: string): void {
    if (sign && SIGN[sign]) {
      throw new Error('sign has registered!');
    }
    if (type && !!MIMETYPE[type]) {
      throw new Error('mimetype has registered!');
    }
    SIGN[sign] = type;
    MIMETYPE[type] = sign;
  }

  function getMimeTypeProtocol(type: string, text?: string): string | Function {
    const mimetype = MIMETYPE[type] || false;

    if (text === undefined) {
      return process.bind(null, mimetype);
    }

    return process(mimetype, text);
  }

  function getSpitor(): string {
    return SPLITOR;
  }

  function getMimeType(sign?: string): MimeTypes | string | null {
    if (sign !== undefined) {
      return SIGN[sign] || null;
    }
    return MIMETYPE;
  }

  function isPureText(text: string): boolean {
    return !~text.indexOf(getSpitor());
  }

  function getPureText(text: string): string {
    if (isPureText(text)) {
      return text;
    }
    return text.split(getSpitor())[1];
  }

  function whichMimeType(text: string): MimeTypes | string | null {
    if (isPureText(text)) {
      return null;
    }
    return getMimeType(text.split(getSpitor())[0]);
  }

  return {
    registMimeTypeProtocol,
    getMimeTypeProtocol,
    getSpitor,
    getMimeType,
  };
};

const MimeTypeRuntime = function (this: any) {
  if (this.minder.supportClipboardEvent && !window.kity.Browser.gecko) {
    this.MimeType = MimeType();
  }
};

export default MimeTypeRuntime;
