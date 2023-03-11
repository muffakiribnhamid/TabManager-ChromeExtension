window.addEventListener('DOMContentLoaded', function() {
    const tabs = document.getElementById('ext_tabs');
    let allTabs = []
    console.log(allTabs);
    chrome.runtime.sendMessage({type: "getTabs"}, function(response) {

    allTabs = response;


    response.forEach((tab,index) => {
        
        
        const tabElement = document.createElement('li');
        const p = document.createElement('p');

        

        
        p.innerHTML =  tab.title;
        const close = document.createElement('button');
        close.classList.add('close');

        if (tab.active) {
            tabElement.classList.add('active');
        }
        close.addEventListener('click', function() {
            chrome.tabs.remove(tab.id);
            tabElement.remove();
        });

        
        p.addEventListener('click', function() {
            chrome.tabs.update(tab.id, {active: true});
        });

        close.value = "Close"
        close.innerText = "Close"
        tabElement.appendChild(p);
        tabElement.appendChild(close);
        tabs.appendChild(tabElement);
        

   }); 


});
});
