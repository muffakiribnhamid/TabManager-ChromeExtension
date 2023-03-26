chrome.runtime.sendMessage({ action: 'getTabsInfo' }, function (response) {
  // Define the frequently used sites
  var frequentlyUsedSites = [
    {
      name: 'Google',
      logo: 'https://www.google.com/favicon.ico',
      url: 'https://www.google.com',
    },
    {
      name: 'Facebook',
      logo: 'https://www.facebook.com/favicon.ico',
      url: 'https://www.facebook.com',
    },
    {
      name: 'Twitter',
      logo: 'https://twitter.com/favicon.ico',
      url: 'https://twitter.com',
    },
  ];
  console.log('received from background');
  frequentlyUsedSites.push(...response.tabs);
  console.log(frequentlyUsedSites);

  // Create the white bar element
  var whiteBar = document.createElement('div');
  whiteBar.style.backgroundColor = '#C9EEFF';
  whiteBar.style.width = '60px';
  whiteBar.style.height = '100%';
  whiteBar.style.position = 'fixed';
  whiteBar.style.top = '0';
  whiteBar.style.left = '0';
  document.body.appendChild(whiteBar);

  var logo = document.createElement('img');
  let src = (logo.src = 'https://i.ibb.co/LSrTSqG/LOGO.png');
  console.log(src);
  logo.style.width = '50px';
  logo.style.height = '50px';
  logo.style.position = 'relative';
  logo.style.marginLeft = '5px';
  logo.style.marginTop = '10px';
  logo.style.top = '10';
  logo.style.left = '10';

  // Append the logo and white bar elements to the body
  document.body.appendChild(whiteBar);
  whiteBar.appendChild(logo);

  var hr = document.createElement('hr');
  whiteBar.appendChild(hr);

  // Add frequently used site logos and links
  var favSites = document.createElement('div');
  favSites.style.display = 'flex';
  favSites.style.flexDirection = 'column';
  favSites.style.alignItems = 'center';
  favSites.style.justifyContent = 'start';
  favSites.style.marginTop = '30px';
  favSites.style.width = '100%';
  favSites.style.height = 'calc(100% - 70px)';
  whiteBar.appendChild(favSites);

  console.log(frequentlyUsedSites.length);

  // Create the frequently used site anchors
  for (var i = 0; i < frequentlyUsedSites.length; i++) {
    var site = frequentlyUsedSites[i];

    var siteAnchor = document.createElement('a');
    siteAnchor.href = site.url;
    siteAnchor.dataset.url = site.url;
    siteAnchor.target = '_blank';
    siteAnchor.style.display = 'flex';
    siteAnchor.style.flexDirection = 'column';
    siteAnchor.style.alignItems = 'center';
    siteAnchor.style.marginBottom = '10px';
    siteAnchor.style.textDecoration = 'none';

    var siteLogo = document.createElement('img');
    siteLogo.src = site.logo;
    siteLogo.style.width = '30px';
    siteLogo.style.height = '30px';

    var siteName = document.createElement('p');
    siteName.textContent = site.name;
    siteName.style.fontSize = '10px';
    siteName.style.marginTop = '5px';
    siteName.style.textAlign = 'center';

    siteAnchor.appendChild(siteLogo);
    siteAnchor.appendChild(siteName);
    favSites.appendChild(siteAnchor);

    // Add event listener to redirect to site when clicked
    siteAnchor.addEventListener('click', function (event) {
      event.preventDefault();
      var siteUrl = this.dataset.url;
      window.open(siteUrl, '_blank');
    });

    var hr = document.createElement('hr');
    whiteBar.appendChild(hr);
  }

  var addButton = document.createElement('button');
  addButton.textContent = 'Add';
  addButton.style.position = 'absolute';
  addButton.style.bottom = '0';
  addButton.style.left = '0';
  addButton.style.margin = '10px';
  addButton.style.borderRadius = '5px';
  addButton.style.border = 'none';
  addButton.style.cursor = 'pointer';

  whiteBar.appendChild(addButton);

  var hideButton = document.createElement('button');
  hideButton.textContent = 'Hide';
  hideButton.style.position = 'absolute';
  hideButton.style.bottom = '0';
  hideButton.style.right = '0';
  hideButton.style.margin = '10px';
  hideButton.style.borderRadius = '5px';
  hideButton.style.border = 'none';
  hideButton.style.cursor = 'pointer';

  // Add click event listener to hide button
  hideButton.addEventListener('click', function () {
    whiteBar.style.display = 'none';

    // Check if the show button already exists
    var showButton = document.getElementById('showButton');
    if (!showButton) {
      // Create the show button
      showButton = document.createElement('button');
      showButton.id = 'showButton';
      showButton.textContent = 'Show';
      showButton.style.position = 'fixed';
      showButton.style.bottom = '0';
      showButton.style.left = '10px'; // Updated position
      showButton.style.margin = '10px';
      showButton.style.borderRadius = '5px';
      showButton.style.border = 'none';
      showButton.style.cursor = 'pointer';

      // Add click event listener to show button
      showButton.addEventListener('click', function () {
        whiteBar.style.display = 'block';
        document.body.removeChild(showButton);
      });

      // Append the show button to the document body
      document.body.appendChild(showButton);
    }
  });

  // Append the hide button to the white bar element
  whiteBar.appendChild(hideButton);
});
