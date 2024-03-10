let githubsLinks = ["https://znanyjakobartus.github.io/Wahadlo/",
                    "https://maation.github.io/Boucing-Ball/",
                    "https://bulkas.github.io/pi-monte-carlo/",
					"https://bedi321.github.io/Dzie-nauki/"];
let linkTexts = ["Wahadło","Bouncing-Ball","π","rozkład"]
let linkElements = [];
let linkPositionParam = {};
let linkPositionParams = [];


let left = 0;
let linkDistance = 100;
let linkWidth = 150;
let linkHeight = 20;
let elasticity = 0.99;  

// zarządza powstaniem linków
function introduceLinks(){ 
    for (let i = 0; i < githubsLinks.length; i++) {
        // stwórz linki
        let a = createLinks(i);
        // dodajemy powstałe linki do tablicy
        addLinkElementToArray(a.id);  
    }
    addLinkPositionToArray();
}

// tworzy linki
function createLinks(i){
    let a = document.createElement('a');
    let innerText = document.createTextNode(linkTexts[i]);
    a.appendChild(innerText);
    a.id="gh" + i;
    a.href = githubsLinks[i];
    a.setAttribute("style", "width:" + linkWidth + "px; height:" + linkHeight + "px; position:absolute;left:" + left + "px;");
    left += linkDistance;
    document.body.appendChild(a);
    return a;
}

// dodaje linki jako elementy do tablicy
function addLinkElementToArray(id){
    linkElement = document.getElementById(id);
    linkElements.push(linkElement);
}


// tworzy obiekty z parametrami ruchu linków
function addLinkPositionToArray(){
    for (let i = 0; i < githubsLinks.length; i++) {
        let rand = Math.random()*0.5 + 0.3;
        linkPositionParam = {
            ds: 0,				
            y : 0,				
            gravity: rand 
        }
        linkPositionParams.push(linkPositionParam);
    }
}


// wylicza ds oraz y
function countLinkPosition(link){
    // przyrost drogi
    link.ds += link.gravity;
    link.y = link.y + link.ds;
    // jeśli link osiągnie podłoże
    // przyrost drogi zmienia kierunek
    if(link.y > 600 - linkHeight){
        link.y = 600 - linkHeight;
        link.ds = -link.ds * elasticity; 
    }
    return link;
}

// oblicza parametry ruchu linków
// oraz zmienia ich położenie
function handleLinksPositions(){
    for (let i = 0; i < githubsLinks.length; i++) {
        linkPositionParams[i] = countLinkPosition(linkPositionParams[i]);
        linkElements[i].style.top = linkPositionParams[i].y + "px";
    }
}


// linki
introduceLinks();

// animacja
let animation = function(){
    handleLinksPositions();
}
window.setInterval(animation,1);