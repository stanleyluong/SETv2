document.addEventListener("DOMContentLoaded", main)
const baseURL = "https://raw.githubusercontent.com/stanleyluong/SET/151b482e77d677f3b211f4e84ad0dc1cc74c688f/tes-backend/app/images/svg/icons/"


function main(){
    fetchCards()
    pageButtons()
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
    if (!((a.number == b.number) && (b.number == c.number) ||
            (a.number != b.number) && (a.number != c.number) && (b.number != c.number))) {
        numberValid = false;
    } else {
        numberValid = true
    }     
    if (!((a.shape == b.shape) && (b.shape == c.shape) ||
            (a.shape != b.shape) && (a.shape != c.shape) && (b.shape != c.shape))) {
        shapeValid = false;
    } else {
        shapeValid = true
    }
    if (!((a.shading == b.shading) && (b.shading == c.shading) ||
        (a.shading != b.shading) && (a.shading != c.shading) && (b.shading != c.shading))) {
        shadingValid = false;
    } else {
        shadingValid = true
    }
    if (!((a.color == b.color) && (b.color == c.color) ||
            (a.color != b.color) && (a.color != c.color) && (b.color != c.color))) {
        colorValid = false;
    } else {
        colorValid = true
    }
    if ((numberValid == true) && (shapeValid == true) && (shadingValid == true) && (colorValid == true)) { 
        validity = true
    }
    return validity
}

function fetchCards(){
    initialRandomCards(cards,[],[])
}

async function initialRandomCards(cards, currentCards, usedCards){
    while (document.getElementById("container").hasChildNodes()){
        document.getElementById("container").removeChild(document.getElementById("container").lastChild)
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
    let availableSet = document.getElementById('availableSet')
    let available = 0
    combos.forEach(combo=>{
        if(valid(combo)===true){
            available++
        }
    })
    availableSet.textContent= `Possible Sets: ${available}`
    currentCards.forEach(card => {
        let image = document.createElement("img")
        image.src = baseURL+card.img
        image.id = card.img
        image.setAttribute("class", "img")
        image.onclick = e => {
            image.style.backgroundColor="yellow"
            if (!selected.includes(card)){
                selected.push(card)
                threeClicks(selected, cards, currentCards, usedCards)
            } else {
                image.style.backgroundColor=null
                selected = selected.filter(c => c !== card)
            }
        }
        cardTable.appendChild(image)
    })
    let images = document.getElementsByClassName("img")
    let container = document.getElementById("container")
    switch(currentCards.length){
        case 3:
            for(i=0;i<images.length;i++){
                images[i].style.width = "25%"
                container.style.width = "37%"
            }   
            break
        case 6:
            for(i=0;i<images.length;i++){
                images[i].style.width = "25%"
                container.style.width = "37%"
            }   
            break
        case 9:
            for(i=0;i<images.length;i++){
                images[i].style.width = "25%"
                container.style.width = "37%"
            }   
            break
        case 12:
            for(i=0;i<images.length;i++){
                images[i].style.width = "25%"
                container.style.width = "37%"
            }   
            break
        case 15:
            for(i=0;i<images.length;i++){
                images[i].style.width = "20%"
                container.style.width = "46%"
            }  
            break
        case 18:
            for(i=0;i<images.length;i++){
                images[i].style.width = "16.6666667%"
                container.style.width = "55%"
            }
            break
        case 21:
            for(i=0;i<images.length;i++){
                images[i].style.width = "14.2857143%"
                container.style.width = "64%"
            }
            break
        case 24:
            for(i=0;i<images.length;i++){
                images[i].style.width = "12.5%"
                container.style.width = "73%"
            }
            break
        case 27:
            for(i=0;i<images.length;i++){
                images[i].style.width = "11.111111%"
                container.style.width = "83%"
                }
            break
        case 30:
            for(i=0;i<images.length;i++){
                images[i].style.width = "11.111111%"
                container.style.width = "61%"
            }   
            break
        case 33:
            for(i=0;i<images.length;i++){
                images[i].style.width = "11.111111%"
                container.style.width = "61%"
            }  
            break
        case 36:
            for(i=0;i<images.length;i++){
                images[i].style.width = "11.111111%"
                container.style.width = "61%"
            }
            break
        case 39:
            for(i=0;i<images.length;i++){
                images[i].style.width = "10%"
                container.style.width = "68%"
            }
            break
        case 42:
            for(i=0;i<images.length;i++){
                images[i].style.width = "9.09%"
                container.style.width = "75%"
            }
            break
        case 45:
            for(i=0;i<images.length;i++){
                images[i].style.width = "8.33333%"
                container.style.width = "82%"
            }
            break
        case 48:
            for(i=0;i<images.length;i++){
                images[i].style.width = "8.33333%"
                container.style.width = "82%"
            }   
            break
        case 51:
            for(i=0;i<images.length;i++){
                images[i].style.width = "7.69%"
                container.style.width = "89%"
            }  
            break
        case 54:
            for(i=0;i<images.length;i++){
                images[i].style.width = "7.14%"
                container.style.width = "96%"
            }
            break
        case 57:
            for(i=0;i<images.length;i++){
                images[i].style.width = "7.14%"
                container.style.width = "76%"
            }
            break
        case 60:
            for(i=0;i<images.length;i++){
                images[i].style.width = "7.14%"
                container.style.width = "76%"
            }
            break
        case 63:
            for(i=0;i<images.length;i++){
                images[i].style.width = "7.14%"
                container.style.width = "76%"
            }
            break
        case 66:
            for(i=0;i<images.length;i++){
                images[i].style.width = "7.14%"
                container.style.width = "76%"
            }
            break
        case 69:
            for(i=0;i<images.length;i++){
                images[i].style.width = "7.14%"
                container.style.width = "76%"
            }
            break
        case 72:
            for(i=0;i<images.length;i++){
                images[i].style.width = "6.6666667%"
                container.style.width = "82%"
            }
            break
        case 75:
            for(i=0;i<images.length;i++){
                images[i].style.width = "6.6666667%"
                container.style.width = "82%"
            }
            break
        case 78:
            for(i=0;i<images.length;i++){
                images[i].style.width = "6.25%"
                container.style.width = "87%"
            }
            break
        case 81:
            for(i=0;i<images.length;i++){
                images[i].style.width = "6.25%"
                container.style.width = "72%"
            }
            break
    }
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
function threeClicks(selected, cards, currentCards, usedCards){
    if (selected.length == 3) {
        submitAttempt(valid(selected), selected, cards, currentCards, usedCards) 
    }
}
let setsFound = 0
function submitAttempt(validity, selected, cards, currentCards, usedCards){
    let sets = document.getElementById('sets')
    if (validity === true){
        let set = document.createElement('div')
        set.className = "set"
        for(i=0;i<selected.length;i++){
            let image = document.createElement('img')
            image.src = baseURL+selected[i].img
            image.className = "found-img"
            set.appendChild(image)
        }
        sets.appendChild(set)
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
    } else {
        selected = []
        initialRandomCards(cards, currentCards, usedCards)
    }
}  
function pageButtons(){
    let newGameButton = document.getElementById("newGameButton")
    newGameButton.addEventListener("click", e => {
        location.reload()
    })

}