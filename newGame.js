document.addEventListener("DOMContentLoaded", main)
const baseURL = "https://raw.githubusercontent.com/stanleyluong/SETv2/703ddf82efb258606878e50ff286f96253399c94/svg/"
let wrongSets = 0, missedSets = 0, hints = 0, elapsedTime = 0

function main(){
    // cards.splice(0,40)
    
    // console.log(cards)
    initialRandomCards(cards,[],[])
    pageButtons()
    console.log('By Stanley Luong')
}

function k_combinations(set, k) {
    var i, j, combs, head, tailcombs;
    if (k > set.length || k <= 0) {
        return [];
    }
    if (k == set.length) {
        return [set];
    }
    if (k == 1) {
        combs = [];
        for (i = 0; i < set.length; i++) {
            combs.push([set[i]]);
        }
        return combs;
    }
    combs = [];
    for (i = 0; i < set.length - k + 1; i++) {
        head = set.slice(i, i + 1);
        tailcombs = k_combinations(set.slice(i + 1), k - 1);
        for (j = 0; j < tailcombs.length; j++) {
            combs.push(head.concat(tailcombs[j]));
        }
    }
    return combs;
}

const valid = set => {
    let a = set[0]
    let b = set[1]
    let c = set[2]
    let validity = null
    let numberValid = null
    let shapeValid = null
    let shadingValid = null
    let colorValid = null
    if(!((a.number==b.number)&&(b.number==c.number)||(a.number!=b.number)&&(a.number != c.number) && (b.number != c.number))){
        numberValid = false;
    } else {
        numberValid = true
    }     
    if(!((a.shape == b.shape) && (b.shape == c.shape) ||(a.shape != b.shape) && (a.shape != c.shape) && (b.shape != c.shape))){
        shapeValid = false;
    } else {
        shapeValid = true
    }
    if(!((a.shading == b.shading) && (b.shading == c.shading)||(a.shading != b.shading) && (a.shading != c.shading) && (b.shading != c.shading))){
        shadingValid = false;
    } else {
        shadingValid = true
    }
    if(!((a.color == b.color) && (b.color == c.color) ||(a.color != b.color) && (a.color != c.color) && (b.color!=c.color))){
        colorValid=false;
    } else {
        colorValid=true
    }
    if(numberValid&&shapeValid&&shadingValid&&colorValid){ 
        validity=true
    }
    return validity
}

function initialRandomCards(cards, currentCards, usedCards){
    let possibleSets = document.getElementById("possibleSets")
    while (possibleSets.hasChildNodes()){
        possibleSets.removeChild(possibleSets.lastChild)
    }
    let container = document.getElementById("container")
    while (container.hasChildNodes()){
        container.removeChild(document.getElementById("container").lastChild)
    }
    let selected = []
    if (cards.length > 0){
        while (currentCards.length < 12){
            let randomNumber = Math.floor(Math.random() * (cards.length))
            let card = cards.splice(randomNumber,1)
            currentCards.push(card[0])
        } 
    }
    let cardsRemaining = document.getElementById('cardsRemaining')
    cardsRemaining.textContent = `Deck: ${cards.length} cards`
    let cardsOnTable = document.getElementById('currentCards')
    cardsOnTable.textContent = `Table: ${currentCards.length} cards`
    let counter = document.getElementById('setsFound')
    counter.textContent=`Sets Found: ${setsFound}`
    let combos = k_combinations(currentCards, 3)
    let possibleSetsButton = document.getElementById('possibleSetsButton')
    let possible = []
    combos.forEach(combo=>{
        if(valid(combo)===true){
            possible.push(combo)
        }
    })
    possibleSetsButton.textContent = `Possible Sets: ${possible.length}`
    let usedShowSets = false
    let hintsUsed = document.getElementById('hints')
    possibleSetsButton.onclick = function() {
        if(usedShowSets===false){
            hints++
            hintsUsed.textContent = `Hints Used: ${hints}`
            usedShowSets = true
        }
        toggleShowSets()
    }
    let showSets = false
    function toggleShowSets(){
        showSets = !showSets
        if(showSets){
            possible.forEach(a=>{
                let set = document.createElement('div')
                set.className = "set"
                for(i=0;i<a.length;i++){
                    let image = document.createElement('img')
                    image.src = baseURL+a[i].img
                    image.className = "found-img"
                    set.appendChild(image)
                }
                possibleSets.appendChild(set)
            })
        }
        if(!showSets){
            while (document.getElementById("possibleSets").hasChildNodes()){
                document.getElementById("possibleSets").removeChild(document.getElementById("possibleSets").lastChild)
            }
            possibleSetsButton.textContent = `Possible Sets: ${possible.length}`
        }
    }
    let selectedImages = []
    currentCards.forEach(card => {
        let image = document.createElement("img")
        image.src = baseURL+card.img
        image.id = card.img
        image.setAttribute("class", "img")
        image.style.border = "thick solid lightblue"
        image.onclick = e => {
            image.style.border = "thick solid yellow"
            setTimeout(function(){
                if (!selected.includes(card)){
                    selected.push(card)
                    selectedImages.push(image)
                    threeClicks(selected, cards, currentCards, usedCards, selectedImages)
                } else {
                    image.style.border = "thick solid lightblue"
                    selected = selected.filter(c => c !== card)
                    selectedImages = selectedImages.filter(c => c !== image)
                }
            },300)
           
        }
        container.appendChild(image)
    })
    let images = document.getElementsByClassName("img")
    switch(currentCards.length){
        case 1:for(i=0;i<images.length;i++){images[i].style.width = "66%"}break
        case 2:for(i=0;i<images.length;i++){images[i].style.width = "48%"}break
        case 3:
        case 4:for(i=0;i<images.length;i++){images[i].style.width = "33%"}break
        case 5:
        case 6:for(i=0;i<images.length;i++){images[i].style.width = "32%"}break
        case 7:
        case 8:for(i=0;i<images.length;i++){images[i].style.width = "23%"}break
        case 9:
        case 10:
        case 11:
        case 12:for(i=0;i<images.length;i++){images[i].style.width = "21%"}break
        case 13:
        case 14:
        case 15:for(i=0;i<images.length;i++){images[i].style.width = "18.9%"}break
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:for(i=0;i<images.length;i++){images[i].style.width = "15.7%"}break
        case 21:
        case 22:
        case 23:
        case 24:for(i=0;i<images.length;i++){images[i].style.width = "15.6%"}break
        case 25:
        case 26:
        case 27:
        case 28:for(i=0;i<images.length;i++){images[i].style.width = "13.1%"}break
        case 29:
        case 30:
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:for(i=0;i<images.length;i++){images[i].style.width = "12.4%"}break
        case 36:
        case 37:
        case 38:
        case 39:
        case 40:for(i=0;i<images.length;i++){images[i].style.width = "11.3%"}break
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:for(i=0;i<images.length;i++){images[i].style.width = "10%"}break
        case 46:
        case 47:
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:for(i=0;i<images.length;i++){images[i].style.width = "9.3%"}break
        case 55:
        case 56:
        case 57:
        case 58:
        case 59:
        case 60:for(i=0;i<images.length;i++){images[i].style.width = "8.9%"}break
        case 61:
        case 62:
        case 63:
        case 64:
        case 65:
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:for(i=0;i<images.length;i++){images[i].style.width = "8.3%"}break
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:for(i=0;i<images.length;i++){images[i].style.width = "7.8%"}break
        case 78:
        case 79:
        case 80:
        case 81:for(i=0;i<images.length;i++){images[i].style.width = "7.2%"}break
    }
    let drawOneButton = document.getElementById('drawOne')
    let drawThreeButton = document.getElementById("drawThree")
    drawThreeButton.onclick = () => {
        if (cards.length > 0){
            for (i=0; i<3; i++){
                let randomNumber = Math.floor(Math.random() * (cards.length))
                let card = cards.splice(randomNumber,1)
                currentCards.push(card[0])
            }
        } else {
            alert("There are no more cards in the deck!")
        }
        let missedSetsCounter = document.getElementById("missedSetsCounter")
        missedSets += possible.length
        missedSetsCounter.textContent = `Missed Sets:`+missedSets
        initialRandomCards(cards, currentCards, usedCards)
    }
    drawOneButton.onclick = () => {
        if (cards.length > 0){
                let randomNumber = Math.floor(Math.random() * (cards.length))
                let card = cards.splice(randomNumber,1)
                currentCards.push(card[0])
        } else {
            alert("There are no more cards in the deck!")
        }
        let missedSetsCounter = document.getElementById("missedSetsCounter")
        missedSets += possible.length
        missedSetsCounter.textContent = `Missed Sets:`+missedSets
        initialRandomCards(cards, currentCards, usedCards)
    }

}
function threeClicks(selected, cards, currentCards, usedCards, selectedImages){
    if (selected.length == 3) {
        submitAttempt(valid(selected), selected, cards, currentCards, usedCards, selectedImages) 
    }
}
let setsFound = 0
function submitAttempt(validity, selected, cards, currentCards, usedCards, selectedImages){
    let foundSets = document.getElementById('foundSets')
    if (validity === true){
        // console.log(selectedImages)
        // setTimeout(function(){
            selectedImages.forEach(image=>{
                console.log(image)
                image.style.border = "thick solid greenyellow"
            })
            console.log('timeout')
        // },100)
        setTimeout(function(){
            let set = document.createElement('div')
            set.className = "set"
            for(i=0;i<selected.length;i++){
            let image = document.createElement('img')
            image.src = baseURL+selected[i].img
            image.className = "found-img"
            set.appendChild(image)
        }
        foundSets.appendChild(set)
        usedCards.push(selected)
        selected.forEach(card=>{
            currentCards = currentCards.filter(ccard=>{
                return ccard!==card
            })
        })
        let combos = k_combinations(currentCards, 3)
        if(cards.length===0 && combos.some(valid)===false){
            alert(`Congratulations! Elapsed time:${Math.floor(elapsedTime/60)}:${(elapsedTime%60)-1}. Missed Sets: ${missedSets}, Wrong Sets: ${wrongSets}, Hints: ${hints}`)
        } else {
            initialRandomCards(cards, currentCards, usedCards)
        }
        setsFound++
        let counter = document.getElementById('setsFound')
        counter.textContent=`Sets Found: ${setsFound}`
        },300)
        
    } else {
        console.log(selected)
        selectedImages.forEach(image=>{
            console.log(image)
            image.style.border = "thick solid red"
        })
        setTimeout(function(){
            selected = []
            let wrongSetsCounter = document.getElementById("wrongSetsCounter")
            wrongSets++
            wrongSetsCounter.textContent = `Wrong Sets: ${wrongSets}`
            initialRandomCards(cards, currentCards, usedCards)
        },300)
        
    }
}

function pageButtons(){
    
    let newGameButton = document.getElementById("newGameButton")
    newGameButton.addEventListener("click", e => {
        location.reload()
    })
    // let clock = document.getElementById("clock")
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;
    setInterval(setTime,1000)
    function setTime() {
        ++totalSeconds;
        elapsedTime = totalSeconds
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
      }
      
      function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
          return "0" + valString;
        } else {
          return valString;
        }
      }

}