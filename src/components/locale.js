export const JA = ({ children }) =>
  chrome.i18n.getUILanguage() === 'ja' && children;
export const EN = ({ children }) =>
  chrome.i18n.getUILanguage() !== 'ja' && children;
