chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == 'getTabsInfo') {
    getTabsDetails(sendResponse);
    return true;
  }
});

function getTabsDetails(sendResponse) {
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    const tabsInfo = tabs.map((eachTab) => {
      const tabObj = {
        logo: eachTab.favIconUrl,
        url: eachTab.url,
        name: eachTab.url,
      };
      return tabObj;
    });
    sendResponse({ tabs: tabsInfo });
  });
}
