// Create the white bar element
var whiteBar = document.createElement("div");
whiteBar.style.backgroundColor = "#C9EEFF";
whiteBar.style.width = "60px";
whiteBar.style.height = "100%";
whiteBar.style.position = "fixed";
whiteBar.style.top = "0";
whiteBar.style.left = "0";
document.body.appendChild(whiteBar);


// Get the title of the current tab
var logo = document.createElement("img");
let src = logo.src = "https://i.ibb.co/LSrTSqG/LOGO.png";
console.log(src);
logo.style.width = "50px";
logo.style.height = "50px";
logo.style.position = "relative";
logo.style.marginLeft = "5px";
logo.style.marginTop = "10px";
logo.style.top = "10";
logo.style.left = "10";

// Append the logo and white bar elements to the body
document.body.appendChild(whiteBar);
whiteBar.appendChild(logo);


var hideButton = document.createElement("button");
hideButton.textContent = "Hide";
hideButton.style.position = "absolute";
hideButton.style.bottom = "0";
hideButton.style.right = "0";
hideButton.style.margin = "10px";
hideButton.style.borderRadius = "5px";
hideButton.style.border = "none";
hideButton.style.cursor = "pointer";

// Add click event listener to hide button
hideButton.addEventListener("click", function() {
  whiteBar.style.display = "none";
});

// Append the hide button to the white bar element
whiteBar.appendChild(hideButton);
