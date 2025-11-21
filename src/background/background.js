// Background Service Worker

let creating; // A global promise to avoid concurrency issues

async function setupOffscreenDocument(path) {
  // Check all windows controlled by the service worker to see if one
  // of them is the offscreen document with the given path
  const offscreenUrl = chrome.runtime.getURL(path);
  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT'],
    documentUrls: [offscreenUrl]
  });

  if (existingContexts.length > 0) {
    return;
  }

  // create offscreen document
  if (creating) {
    await creating;
  } else {
    creating = chrome.offscreen.createDocument({
      url: path,
      reasons: ['USER_MEDIA'],
      justification: 'Recording from tab'
    });
    await creating;
    creating = null;
  }
}

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.target === 'offscreen') {
    await setupOffscreenDocument('src/offscreen/offscreen.html');
    // Forward message to offscreen document
    chrome.runtime.sendMessage(message);
  }
});
