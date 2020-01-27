const getId = () => {
  let strong = 1000;
  return (
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  );
};

const getTitle = () =>
  location.href.startsWith('https://www.youtube.com')
    ? document.title.replace(/\(\d+?\) /, '')
    : document.title;

const getUrl = () => {
  if (location.href.startsWith('https://www.youtube.com/')) {
    const videoId = document
      .querySelector('ytd-watch-flexy')
      .getAttribute('video-id');
    return (url = `https://www.youtube.com/watch?v=${videoId}&t=${time}s`);
  } else {
    return location.href;
  }
};

const subs = ({ iframe }) => {
  const iframeList = iframe ? iframe.split('\n') : [];
  const match = !!iframeList.filter((d) => location.href.match(d))[0];
  console.log(match);
  const video =
    document.querySelector('video') ||
    (match &&
      Array.from(document.querySelectorAll('iframe')).sort(
        (a, b) =>
          b.getBoundingClientRect().width - a.getBoundingClientRect().width
      )[0]);
  if (!video) return null;

  const { x, y, width, height } = video.getBoundingClientRect();
  const time = parseInt(video.currentTime || 0);
  const id = getId();
  const title = getTitle();
  const url = location.href;

  chrome.runtime.sendMessage({
    type: 'rect',
    x,
    y,
    width,
    height,
    time,
    id,
    title,
    url,
  });
};

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'TWEET') {
    window.open(
      `https://twitter.com/intent/tweet?text=${msg.url}`,
      't',
      'width=600,height=300'
    );
  }
  if (msg.type === 'CAPTURE') {
    const video = document.querySelector('video');
    if (!video) return null;
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', video.videoWidth);
    canvas.setAttribute('height', video.videoHeight);
    canvas
      .getContext('2d')
      .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    const dataUrl = canvas.toDataURL('image/jpeg');
    const time = parseInt(video.currentTime);
    const id = getId();
    const title = getTitle();
    const url = getUrl();

    chrome.runtime.sendMessage({
      dataUrl,
      time,
      url,
      title,
      id,
      type: 'res',
    });
  }
  if (msg.type === 'SUBS') {
    subs(msg);
  }
  if (msg.type === 'JUMP') {
    window.open(msg.href);
  }
  if (msg.type === 'REMOTETWEET') {
    const { imageId, body } = msg;
    const payload = JSON.stringify({ body, type: 'image' });
    const csrf = document
      .querySelector("meta[name='csrf-token']")
      .getAttribute('content');
    const headers = {
      'content-type': 'application/json',
      accept: 'application/json',
      'x-csrf-token': csrf,
    };
    fetch(`/api/internal/images/${imageId}/tweets`, {
      method: 'POST',
      body: payload,
      headers,
    }).then((res) => {
      if (!res.ok) {
        window.open(
          `https://twitter.com/intent/tweet?text=${msg.body}`,
          't',
          'width=600,height=300'
        );
      }
    });
  }
  return true;
});
