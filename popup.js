chrome.tabs.query({ currentWindow: true }, function (tabs) {
  const textTabs = document.getElementById('text_tabs');
  console.log(textTabs);
  const fragment = document.createDocumentFragment();
  tabs.forEach((eachTab) => {
    const currentItem = createListItem(eachTab);
    fragment.append(currentItem);
  });
  textTabs.append(fragment);
});

function createListItem(tab) {
  const li = document.createElement('li');
  const link = document.createElement('a');
  const img = document.createElement('img');
  img.src = tab.favIconUrl;
  link.href = tab.url;
  link.target = '_blank';
  link.append(img);
  li.append(link);
  return li;
}