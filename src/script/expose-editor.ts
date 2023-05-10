import Editor from './editor';

declare global {
  interface Window {
    kityminder: Record<string, any>;
  }
}

export default window.kityminder.Editor = Editor;
