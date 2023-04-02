chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.action) {
    case 'getTabsInfo':
      getTabsDetails(sendResponse);
      return true;
    case 'switch-tab':
      const tabID = request.tabID;
      chrome.tabs.update(tabID, { active: true });
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
        tabID: eachTab.id,
      };
      return tabObj;
    });
    sendResponse({ tabs: tabsInfo });
  });
}

chrome.tabs.onCreated.addListener(function (tab) {
  const tabInfo = {
    logo: tab.favIconUrl,
    url: tab.pendingUrl,
    name: tab.pendingUrl,
    tabID: tab.id,
  };
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      chrome.tabs.sendMessage(tabs[i].id, {
        message: 'addedTab',
        data: tabInfo,
      });
    }
  });
});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      chrome.tabs.sendMessage(tabs[i].id, {
        message: 'removedTab',
        tabID: tabId,
      });
    }
  });
});
