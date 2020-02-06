import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';
import { gyazo } from './gyazo';
import { trim } from './trim';
import { sendMessage } from '../Popup/chrome';

const push = (msg) => {
  const { dataUrl, title, url, publish } = msg;
  chrome.storage.sync.get(['blacklist'], async (result) => {
    const blacklist = (result.list || '').split('\n');
    const match = !!blacklist.filter((d) => url.match(d))[0];
    const gyazoUrl = match
      ? await gyazo({ image_url: dataUrl })
      : await gyazo({ image_url: dataUrl, title, url, publish });

    const el = { ...msg, dataUrl: gyazoUrl.imageUrl, gyazo: gyazoUrl.gyazo };
    chrome.storage.local.get(['list'], (result) => {
      const list = result.list || [];
      list.unshift(el);
      chrome.storage.local.set({ list: list.slice(0, 20) });
      chrome.runtime.sendMessage({ type: 'listUpdated' });
    });
  });
};

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'res') {
    push(msg);
  }
  if (msg.type === 'rect') {
    const { x, y, width, height } = msg;
    chrome.tabs.captureVisibleTab(null, { format: 'png' }, async (dataUrl) => {
      trim(dataUrl, x, y, width, height, (dataUrl) => {
        push({ ...msg, dataUrl });
      });
    });
  }
  return true;
});

chrome.contextMenus.create({
  title: 'Capture and upload to Gyazo',
  contexts: ['all'],
  type: 'normal',
  onclick: (info) => {
    chrome.storage.local.get(['subs'], ({ subs }) => {
      const type = subs ? 'SUBS' : 'CAPTURE';
      sendMessage({ type });
    });
  },
});
