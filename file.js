const toggleBtn = document.querySelector(".toggle-btn");
const nav = document.querySelector("nav");
const shortIt = document.querySelector(".short-it");
const linkToShort = document.querySelector(".link");
const alert = document.querySelector(".alert");
const linksContainer = document.querySelector(".shorten-links-container");

toggleBtn.addEventListener("click", ()=>{
   nav.classList.toggle("show");
});

shortIt.addEventListener("click", ()=>{
    
    /*Check If The Input Field Is Not Empty*/
    if(linkToShort.value.length === 0){
        alert.classList.add("show");
        linkToShort.classList.add("warning");
    }
    else {
        alert.classList.remove("show");
        linkToShort.classList.remove("warning");
        fetchData();
    }
    
});

linkToShort.addEventListener("focus", ()=>{
   linkToShort.classList.remove("warning") 
});

function fetchData() {
    let fullLink = linkToShort.value; 
    fetch(`https://api.shrtco.de/v2/shorten?url=${fullLink}`)
    .then(
        (response) => {
            return response.json();
        }
    )
    .then(
        (data) => {
            displayData(data);
        }
    )
}

function displayData(data) {
    /*The result container*/
    let result = document.createElement("div");
    result.classList.add("result");
    
    /*Display the Original Link*/
    let originalLink = document.createElement("p");
    originalLink.classList.add("original-link");
    originalLink.textContent = data.result.original_link;
    
    /*Display the Shorten Link*/
    let shortenLink = document.createElement("a");
    shortenLink.classList.add("shorten-link");
    shortenLink.textContent = data.result.full_short_link;
    shortenLink.setAttribute("href", `${data.result.full_short_link}`);
    
    /*The Copy Button*/
    let copyBtn = document.createElement("button");
    copyBtn.classList.add("copy");
    copyBtn.textContent = "Copy";
    copyBtn.addEventListener("click", ()=>{
        navigator.clipboard.writeText(`${data.result.full_short_link}`)
        .then( /*If clipboard successfully set*/
            ()=>{
                copyBtn.classList.add("copied");
                copyBtn.textContent = "Copied!";
            }
        )
    });
    
    /*Append Element To The Result Container*/
    result.appendChild(originalLink);
    result.appendChild(shortenLink);
    result.appendChild(copyBtn);
    
    /*Append The Result To The Page*/
    linksContainer.appendChild(result)
}
