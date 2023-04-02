let frequentlyUsedSites = [];
const commontSites = [
  {
    name: 'Google',
    logo: 'https://www.google.com/favicon.ico',
    url: 'https://www.google.com',
    tabID: 1,
  },
  {
    name: 'Facebook',
    logo: 'https://www.facebook.com/favicon.ico',
    url: 'https://www.facebook.com',
    tabID: 2,
  },
  {
    name: 'Twitter',
    logo: 'https://twitter.com/favicon.ico',
    url: 'https://twitter.com',
    tabID: 3,
  },
];
chrome.runtime.sendMessage({ action: 'getTabsInfo' }, function (response) {
  // Define the frequently used sites
  frequentlyUsedSites.push(...commontSites, ...response.tabs);

  // Create the white bar element
  const whiteBar = createWhiteBar();
  const logo = generateLogo();

  // Append the logo and white bar elements to the body
  whiteBar.appendChild(logo);
  document.body.appendChild(whiteBar);

  const hr = document.createElement('hr');
  whiteBar.appendChild(hr);

  // Add frequently used site logos and links
  const favSites = generateFavSites();
  whiteBar.appendChild(favSites);

  console.log(frequentlyUsedSites.length);

  // Create the frequently used site anchors
  for (let i = 0; i < frequentlyUsedSites.length; i++) {
    generateIndividualSites(frequentlyUsedSites[i], favSites, whiteBar);
  }

  const addButton = generateAddButton();
  whiteBar.appendChild(addButton);

  const hideButton = generateHideButton();

  // Add click event listener to hide button
  hideButton.addEventListener('click', () => handleHideButton(whiteBar));

  // Append the hide button to the white bar element
  whiteBar.appendChild(hideButton);
});

function createWhiteBar() {
  const whiteBar = document.createElement('div');
  whiteBar.id = 'white-bar';
  whiteBar.style.backgroundColor = '#C9EEFF';
  whiteBar.style.width = '60px';
  whiteBar.style.height = '100%';
  whiteBar.style.position = 'fixed';
  whiteBar.style.top = '0';
  whiteBar.style.left = '0';
  document.body.appendChild(whiteBar);
  return whiteBar;
}

function generateLogo() {
  const logo = document.createElement('img');
  logo.src = 'https://i.ibb.co/LSrTSqG/LOGO.png';
  logo.style.width = '50px';
  logo.style.height = '50px';
  logo.style.position = 'relative';
  logo.style.marginLeft = '5px';
  logo.style.marginTop = '10px';
  logo.style.top = '10';
  logo.style.left = '10';
  return logo;
}

function generateFavSites() {
  const favSites = document.createElement('div');
  favSites.id = 'fav-sites';
  favSites.style.display = 'flex';
  favSites.style.flexDirection = 'column';
  favSites.style.alignItems = 'center';
  favSites.style.justifyContent = 'start';
  favSites.style.marginTop = '30px';
  favSites.style.width = '100%';
  favSites.style.height = 'calc(100% - 70px)';
  return favSites;
}

function generateIndividualSites(site, favSites, whiteBar) {
  const siteAnchor = document.createElement('a');
  siteAnchor.href = site.url;
  siteAnchor.dataset.url = site.url;
  siteAnchor.dataset.tabId = site.tabID;
  siteAnchor.target = '_blank';
  siteAnchor.style.display = 'flex';
  siteAnchor.style.flexDirection = 'column';
  siteAnchor.style.alignItems = 'center';
  siteAnchor.style.marginBottom = '10px';
  siteAnchor.style.textDecoration = 'none';

  const siteLogo = document.createElement('img');
  siteLogo.src = site.logo;
  siteLogo.style.width = '30px';
  siteLogo.style.height = '30px';
  siteLogo.dataset.tabId = site.tabID;

  const siteName = document.createElement('p');
  siteName.textContent = site.name;
  siteName.style.fontSize = '10px';
  siteName.style.marginTop = '5px';
  siteName.style.textAlign = 'center';
  siteName.dataset.tabId = site.tabID;

  siteAnchor.appendChild(siteLogo);
  siteAnchor.appendChild(siteName);
  favSites.appendChild(siteAnchor);

  // Add event listener to redirect to site when clicked
  siteAnchor.addEventListener('mouseup', function (event) {
    event.preventDefault();
    const tabID = event.target.getAttribute('data-tab-id');
    chrome.runtime.sendMessage(
      { action: 'switch-tab', tabID: +tabID },
      (res) => {
        console.log(res);
      }
    );
  });

  const hr = document.createElement('hr');
  whiteBar.appendChild(hr);
}

function generateAddButton() {
  const addButton = document.createElement('button');
  addButton.textContent = 'Add';
  addButton.style.position = 'absolute';
  addButton.style.bottom = '0';
  addButton.style.left = '0';
  addButton.style.margin = '10px';
  addButton.style.borderRadius = '5px';
  addButton.style.border = 'none';
  addButton.style.cursor = 'pointer';
  return addButton;
}

function generateHideButton() {
  const hideButton = document.createElement('button');
  hideButton.textContent = 'Hide';
  hideButton.style.position = 'absolute';
  hideButton.style.bottom = '0';
  hideButton.style.right = '0';
  hideButton.style.margin = '10px';
  hideButton.style.borderRadius = '5px';
  hideButton.style.border = 'none';
  hideButton.style.cursor = 'pointer';
  return hideButton;
}

function generateShowButton() {
  const showButton = document.createElement('button');
  showButton.id = 'showButton';
  showButton.textContent = 'Show';
  showButton.style.position = 'fixed';
  showButton.style.bottom = '0';
  showButton.style.left = '10px'; // Updated position
  showButton.style.margin = '10px';
  showButton.style.borderRadius = '5px';
  showButton.style.border = 'none';
  showButton.style.cursor = 'pointer';
  return showButton;
}

function handleHideButton(whiteBar) {
  whiteBar.style.display = 'none';

  // Check if the show button already exists
  let showButton = document.getElementById('showButton');
  if (!showButton) {
    // Create the show button
    showButton = generateShowButton();

    // Add click event listener to show button
    showButton.addEventListener('click', function () {
      whiteBar.style.display = 'block';
      document.body.removeChild(showButton);
    });

    // Append the show button to the document body
    document.body.appendChild(showButton);
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.message) {
    case 'removedTab':
      handleTabRemove(request);
      break;
    case 'addedTab':
      handleCreateTab(request);
  }
});

function handleTabRemove(request) {
  const { tabID } = request;
  const filteredList = frequentlyUsedSites.filter((eachTab) => {
    return eachTab.tabID !== tabID;
  });
  frequentlyUsedSites = filteredList;
  regenerateList(filteredList);
}

function handleCreateTab(request) {
  const { data: addedTab } = request;
  frequentlyUsedSites.push(addedTab);
  regenerateList();
}

window.addEventListener('focusin', (event) => {
  event.preventDefault();
  console.log('from focin');
  frequentlyUsedSites = [];
  frequentlyUsedSites.push(...commontSites);
  chrome.runtime.sendMessage({ action: 'getTabsInfo' }, (res) => {
    frequentlyUsedSites.push(...res.tabs);
    regenerateList();
  });
});

function regenerateList() {
  const whiteBar = document.getElementById('white-bar');
  const favSites = document.getElementById('fav-sites');
  favSites.innerHTML = '';
  frequentlyUsedSites.forEach((eachTab) => {
    generateIndividualSites(eachTab, favSites, whiteBar);
  });
}
