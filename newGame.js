document.addEventListener("DOMContentLoaded", main)
const baseURL = "https://raw.githubusercontent.com/stanleyluong/SETv2/703ddf82efb258606878e50ff286f96253399c94/svg/"

function main(){
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
    let cardTable = document.getElementById("container")
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
    counter.textContent=`Sets: ${setsFound} found`
    let combos = k_combinations(currentCards, 3)
    let possibleSetsButton = document.getElementById('possibleSetsButton')
    let possible = []
    combos.forEach(combo=>{
        if(valid(combo)===true){
            possible.push(combo)
        }
    })
    possibleSetsButton.textContent = `Possible Sets: ${possible.length}`
    possibleSetsButton.onclick = function() {toggleShowSets()}
    let showSets = false
    function toggleShowSets(){
        showSets = !showSets
        console.log(showSets)
        if(showSets){
            console.log(possible)
            possible.forEach(a=>{
                let set = document.createElement('div')
                set.className = "set"
                for(i=0;i<a.length;i++){
                    let image = document.createElement('img')
                    image.src = baseURL+a[i].img
                    image.className = "found-img"
                    set.appendChild(image)
                }
                console.log(possibleSets)
                possibleSets.className = "sets"
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
            // image.setAttribute("class","selected")
            setTimeout(function(){
                if (!selected.includes(card)){
                    selected.push(card)
                    selectedImages.push(image)
                    threeClicks(selected, cards, currentCards, usedCards, selectedImages)
                } else {
                    image.style.border = "thick solid #b17720"
                    selected = selected.filter(c => c !== card)
                }
            },300)
           
        }
        container.appendChild(image)
    })
    let moreCardsButton = document.getElementById("moreCards")
    moreCardsButton.onclick = () => {
        if (cards.length > 0){
            for (i=0; i<3; i++){
            let randomNumber = Math.floor(Math.random() * (cards.length))
            let card = cards.splice(randomNumber,1)
            currentCards.push(card[0])
            }
        } else {
            alert("There are no more cards in the deck!")
        }
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
            alert('Congratulations! There are no possible valid sets remaining.')
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
            initialRandomCards(cards, currentCards, usedCards)
        },300)
        
    }
}  
function pageButtons(){
    let newGameButton = document.getElementById("newGameButton")
    newGameButton.addEventListener("click", e => {
        location.reload()
    })

}