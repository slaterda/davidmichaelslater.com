(() => {
  'use strict';
  document.querySelectorAll('button[data-video-src]').forEach(button => {
    button.addEventListener('click', () => {
      const url = new URL(button.dataset.videoSrc, location.href);
      if (url.hostname === 'www.youtube-nocookie.com') url.searchParams.set('autoplay', '1');
      const frame = document.createElement('iframe');
      frame.src = url.href;
      frame.title = button.dataset.videoTitle;
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      button.parentElement.replaceChildren(frame);
      frame.focus();
    });
  });
})();
