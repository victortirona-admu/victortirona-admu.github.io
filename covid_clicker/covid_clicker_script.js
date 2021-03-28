let infectedNum = 0;
let numRate = 0;
let arrayPurchaseTypes = []; //automatic array of all the Purchasable items

class purchaseType{
    constructor(name,numOwned,rate,cost,HTML_id){
        this.name = name;
        this.numOwned = numOwned;
        this.rate = rate;
        this.cost = cost;
        this.HTML_id = HTML_id;
        arrayPurchaseTypes.push(this); //pushes newly constructed objects to the total array
    }
    computeRateOfProd(){ //this returns how many infected are generated per second
        return (this.numOwned * this.rate);
    }
}

/*--------------------------------------------------------------------------------------------------------------------------------------

Creating Object Instances

--------------------------------------------------------------------------------------------------------------------------------------*/

let antiMasker = new purchaseType("Anti Masker",0,1,10,"antiMasker");
let badEstablishment = new purchaseType("Bad Establishment",0,10,100,"badEstablishment");
let badLGU = new purchaseType("Bad Local Government Unit",0,1000,10000,"badLGU");

/*--------------------------------------------------------------------------------------------------------------------------------------

Initial Functions

--------------------------------------------------------------------------------------------------------------------------------------*/

function updateInfected(){
    document.getElementById("num_infected").innerHTML = infectedNum;
}

//Goes through all instances of purchases and checks the number of owned units per object
function updateOwnedPurchases(){
    arrayPurchaseTypes.forEach(function(purchase){
        document.getElementById("num_"+purchase.HTML_id+"_owned").innerHTML = purchase.numOwned;
    })
}

//Front end: Updates the total infected/second seen by the user
function updateRate(){
    numRate = 0; //We zero the numRate out because we will re-compute it from scratch based on all objects
    arrayPurchaseTypes.forEach(function(purchase){
        numRate += purchase.computeRateOfProd();
    })
    document.getElementById("num_rate").innerHTML = numRate;
}

function checkCost(){
    arrayPurchaseTypes.forEach(function(purchase){
        document.getElementById("cost_"+purchase.HTML_id).innerHTML = purchase.cost;
    })
}

//Loads all initial variables once body is loaded
function loadInitialVar(){
    updateInfected();
    updateOwnedPurchases();
    updateRate();
    checkCost();
}

/*--------------------------------------------------------------------------------------------------------------------------------------

Special Functions

--------------------------------------------------------------------------------------------------------------------------------------*/

function printRates(){
    // for testing console.log(arrayPurchases[0].name);
    arrayPurchases.forEach(function(purchase){
        console.log(purchase.computeRateOfProd());
    })
}

/*--------------------------------------------------------------------------------------------------------------------------------------

Event Listens

--------------------------------------------------------------------------------------------------------------------------------------*/

//EVENT LISTEN - Main Clicker Button
var mainButton = document.getElementById("button_clicker")
mainButton.addEventListener("click",function(){
    infectedNum++;
    updateInfected();
});

//EVENT LISTEN - Purchases
let purchaseButtons = [];
arrayPurchaseTypes.forEach(function(purchase,index){
    purchaseButtons[index] = document.getElementById("button_purchase_"+purchase.HTML_id)
})

//EVENT LISTEN - PURCHASES - if clicked, deduct the cost of the object
purchaseButtons.forEach(function(button,index){
    button.addEventListener("click",function(){
        if (infectedNum >= arrayPurchaseTypes[index].cost){
            infectedNum -= arrayPurchaseTypes[index].cost;
            updateInfected();
            arrayPurchaseTypes[index].cost = Math.ceil(arrayPurchaseTypes[index].cost *1.25);
            arrayPurchaseTypes[index].numOwned += 1;
            updateOwnedPurchases();
            updateRate();
            checkCost();
        }
    })
})

setInterval(function(){ 
    updateInfected();
    infectedNum += numRate;
}, 1000);