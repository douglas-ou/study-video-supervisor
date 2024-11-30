function checkBilibiliVideo(tabId, url) {
  if (url && url.includes('bilibili.com/video')) {
    chrome.tabs.sendMessage(tabId, { action: "checkVideo" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message:", chrome.runtime.lastError);
      } else if (response) {
        console.log("Message sent successfully, response:", response);
      }
    });
  }
}

chrome.runtime.onInstalled.addListener(() => {
  console.log('B学习视频监督助手');
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes('bilibili.com/video')) {
    chrome.tabs.sendMessage(tabId, { action: "checkVideo" });
  }
});
