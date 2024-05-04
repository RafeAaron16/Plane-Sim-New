let x = document.cookie;

x = "Rafe Aaron"

console.log(x);

function getRemainingMoney(username){
        fetch('http://localhost:4000/server.php', {method: 'POST', headers:{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'Content-Type'}, body:JSON.stringify({'intention': 'get amount remaining', 'username': x})}).
        then((response) => {
            
            return response.text()}).
        then((value) => {
            document.getElementById('cashRemaining').innerHTML = value;
        })
}

var amountToAdd = 0;
var automatic = 0;
insession = 0;
var betplaced = 0;
var bet = 0;
var cashedOut = 0;

document.getElementById('betbtn').addEventListener('click', ()=>{

    if(insession == 0 && betplaced == 0){
        placeBet(x);
    }

    if(insession == 0 && betplaced == 1){
        alert("Bet Already placed");
    }

    if(insession == 1 && betplaced == 0){
        alert("Wait for the next round");
    }

    if(amountToAdd > 0 && insession == 1 && betplaced == 1 && cashedOut == 0){
        addToRemainingMoney(x);
    }

    if(amountToAdd > 0 && insession == 1 && cashedOut == 1){
        alert("Bet Already Cashed Out");
    }

    
})



document.getElementById('toggle').addEventListener('click', ()=>{

    
    if(automatic == 1){
        document.getElementById('switch').style.backgroundColor = 'grey'
        document.getElementById('toggle').style.right = '50%'
        automatic = 0;
    }else{
        document.getElementById('switch').style.backgroundColor = '#623AA2'
        document.getElementById('toggle').style.right = '0%'
        automatic = 1;
    }
})

function placeBet(username){
    if(document.getElementById('bet').value <= 0){
        alert("Please increase bet amount");
    }else if(document.getElementById('bet').value > Number(document.getElementById('cashRemaining').innerHTML)){

        alert("Insufficient Funds. Balance: " + (document.getElementById('bet').value - Number(document.getElementById('cashRemaining').innerHTML)));
    }
    else{
    fetch('http://localhost:4000/server.php', {method: 'POST', headers:{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'Content-Type'}, body:JSON.stringify({'betAmount': document.getElementById('bet').value,'intention': 'place bet', 'username': x})}).
    then((response) => {
        
        return response.text()}).
    then((value) => {

        if(value == "Success"){
            document.getElementById('cashRemaining').innerHTML = getRemainingMoney(x);
            reduceRemainingMoney(x);
            betplaced = 1;

            bet = document.getElementById('bet').value;

            alert("Bet placed: " + bet);
        }

        if(value == "Failure"){
            alert("Failed to update amount");
        }
    }).catch((error) =>{
        alert("There was an error trying to place the bet")
    })
}
}

function reduceRemainingMoney(username){

    if(document.getElementById('bet').value <= 0){
        alert("Please increase bet amount");
    }else{
    fetch('http://localhost:4000/server.php', {method: 'POST', headers:{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'Content-Type'}, body:JSON.stringify({'betAmount': document.getElementById('bet').value,'intention': 'reduce amount remaining', 'username': x})}).
    then((response) => {
        
        return response.text()}).
    then((value) => {

        if(value == "Success"){
            document.getElementById('cashRemaining').innerHTML = getRemainingMoney(x);
        }

        if(value == "Failure"){
            alert("Failed to update amount");
        }
    }).catch((error) =>{
        alert("There was an error trying to place the bet")
    })
}
}

function addToRemainingMoney(username){

    fetch('http://localhost:4000/server.php', {method: 'POST', headers:{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'Content-Type'}, body:JSON.stringify({'AmountToAdd': (Number(document.getElementById('cashRemaining').innerHTML) + Number(amountToAdd)).toString(),'intention': 'add to amount remaining', 'username': x})}).
    then((response) => {
        
        return response.text()}).
    then((value) => {

        if(value == "Success"){
            alert("Bet Cashed Out")
            document.getElementById('cashRemaining').innerHTML = getRemainingMoney(x);
        }

        if(value == "Failure"){
            alert("Failed to update amount");
        }
    }).catch((error) =>{
        alert("There was an error cashing out place the bet")
    })
}


getRemainingMoney(x);

function getMyBets(username){
    fetch('http://localhost:4000/server.php', {method: 'POST', headers:{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'Content-Type'}, body:JSON.stringify({'intention': 'retrieve my current bets'})}).
    then((response) => { 
        
        return response.json()}).
    then((value) => {

        document.getElementById('mybetnumber').style.opacity = '1'
        document.getElementById('betNumber').style.opacity = '0.7'

        number = 0


        number_of_elements = document.getElementById('listing').childElementCount;

        for(let i = number_of_elements; i > 0; i--){
            document.getElementById('listing').removeChild(document.getElementById('listing').firstChild)
        }

        if(value[0] != "message"){        

        for(let i = 0; i < value.length; i++){

            if(value[i].Name == x){
                number++;

            betDiv = document.createElement('div')
            betDiv.className = 'bets';

            userDiv = document.createElement('div')
            userDiv.className = 'user';

            paragraphDiv = document.createElement('p')
            myArray = value[i].Name.split(" ");
            paragraphDiv.innerHTML = myArray[0][0] + myArray[1][0];

            userDiv.appendChild(paragraphDiv);

            infoDiv = document.createElement('div')
            infoDiv.className = 'info';

            info1 = document.createElement('p')
            info1.innerHTML = value[i].Name;
            info2 = document.createElement('p')
            info2.innerHTML = "Bet (UGX): " + value[i].BetAmount;

            infoDiv.appendChild(info1);
            infoDiv.appendChild(info2);

            betDiv.appendChild(userDiv);
            betDiv.appendChild(infoDiv);

            listItem = document.createElement('li');
            listItem.appendChild(betDiv);
            

            document.getElementById('listing').appendChild(listItem);

            document.getElementById('mybetnumber').innerHTML = "My Bets("+ number+")";
            }
        }
        
    }
    else{
        document.getElementById('mybetnumber').innerHTML = "All Bets(0)";
    }
})
}

function getAllBets(){
    fetch('http://localhost:4000/server.php', {method: 'POST', headers:{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'Content-Type'}, body:JSON.stringify({'intention': 'retrieve current bets'})}).
    then((response) => { 

        return response.json()}).
    then((value) => {

        document.getElementById('mybetnumber').style.opacity = '0.7'
        document.getElementById('betNumber').style.opacity = '1'

        number_of_elements = document.getElementById('listing').childElementCount;

        for(let i = number_of_elements; i > 0; i--){
            document.getElementById('listing').removeChild(document.getElementById('listing').firstChild)
        }

        if(value[0] != "message"){

        document.getElementById('betNumber').innerHTML = "All Bets("+ value.length +")";



        for(let i = 0; i < value.length; i++){

            betDiv = document.createElement('div')
            betDiv.className = 'bets';

            userDiv = document.createElement('div')
            userDiv.className = 'user';

            paragraphDiv = document.createElement('p')
            myArray = value[i].Name.split(" ");
            paragraphDiv.innerHTML = myArray[0][0] + myArray[1][0];

            userDiv.appendChild(paragraphDiv);

            infoDiv = document.createElement('div')
            infoDiv.className = 'info';

            info1 = document.createElement('p')
            info1.innerHTML = value[i].Name;
            info2 = document.createElement('p')
            info2.innerHTML = "Bet (UGX): " + value[i].BetAmount;

            infoDiv.appendChild(info1);
            infoDiv.appendChild(info2);

            betDiv.appendChild(userDiv);
            betDiv.appendChild(infoDiv);

            listItem = document.createElement('li');
            listItem.appendChild(betDiv);

            document.getElementById('listing').appendChild(listItem);
        }
    }else{
        document.getElementById('betNumber').innerHTML = "All Bets(0)";
    }
    })
}

document.getElementById('mybetnumber').style.opacity = '0.7'

document.getElementById('betNumber').addEventListener('click', ()=>{
    document.getElementById('mybetnumber').style.opacity = '0.7'
    document.getElementById('betNumber').style.opacity = '1'
    getAllBets();
})

document.getElementById('mybetnumber').addEventListener('click', ()=>{
    document.getElementById('mybetnumber').style.opacity = '1'
    document.getElementById('betNumber').style.opacity = '0.7'
    getMyBets(x);
})


startingTime = 0;
endingTime = 0;
newstartingTime = 0;
seconds = 0;

async function getState(){
    await fetch("http://localhost:4001/getStartingTime", {method: 'GET', headers:{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'Content-Type'}}).
    then((response) => response.text()).then((value) => {

        startingTime = value;
    });

    await fetch("http://localhost:4001/getEndingTime", {method: 'GET', headers:{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'Content-Type'}}).
    then((response) => response.text()).then((value) => {
        endingTime = value;
    });

    await fetch("http://localhost:4001/getseconds", {method: 'GET', headers:{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'Content-Type'}}).
    then((response) => response.text()).then((value) => {

        seconds = value;
    });

    coordinatesBottom = ["1%", "80%", "50%", '70%',  "70%"]
    coordinatesLeft = ["44%", "44%", "75%", "70%", "30%"]

    currenttime = new Date().getTime();

    document.getElementById("Major_Text").innerHTML = "Syncing with server";

    setTimeout(() =>{

        document.getElementById("Major_Text").innerHTML = "Please wait for the next round in 15 seconds";

            setInterval(() => {
                setTimeout(() => {
                    insession = 0;

                    document.getElementById("aeroplanepng").style.left = "44%";
                    document.getElementById("aeroplanepng").style.bottom = "1%";
                    document.getElementById("aeroplanepng").style.transition = 'all 2s';
                    document.getElementById("Major_Text").innerHTML = "Get ready For Flight";
                    document.getElementById("loader").style.width = "0%";
                    document.getElementById("loadingBar").style.width = "100%";
                    document.getElementById("piloting").style.width = "200px";
                    document.getElementById("piloting").style.height = "200px";

                    if(automatic == 1){
                        placeBet(x);
                    }

                }, 0);

                setTimeout(async () => {

                    insession = 1;

                    document.getElementById('betbtn').style.backgroundColor = "grey"

                    await fetch("http://localhost:4001/getseconds", {method: 'GET', headers:{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'Content-Type'}}).
                        then((response) => response.text()).then((value) => {

                            seconds = value;
                        });

                        currenttime = new Date().getTime();
                    
                    document.getElementById("Major_Text").innerHTML = "";
                    document.getElementById("piloting").style.width = "0px";
                    document.getElementById("piloting").style.height = "0px";
                    document.getElementById("loadingBar").style.width = "0px";

                    for(let i = 0; i < coordinatesBottom.length; i++){
                        setTimeout(() => {
                            document.getElementById("aeroplanepng").style.left = coordinatesLeft[i];
                            document.getElementById("aeroplanepng").style.bottom = coordinatesBottom[i];
                        }, (Number(seconds)/coordinatesBottom.length) * i);

                    }

                    getAllBets();
                    getMyBets(x);

                    if(betplaced == 1){
                        document.getElementById('betbtn').style.backgroundColor = "green"
                    }

                    for(let i = 0; i < Number(seconds); i++){

                        setTimeout(() => {

                            number1 = 1 + ((i- (i%10))/1000)
                            
                            document.getElementById("Major_Text").innerHTML = "x" + number1;

                            document.getElementById('betbtn').innerHTML = "Check Out " + bet * number1;
                            amountToAdd = bet * number1;

                            if(i == Number(seconds) - 1){
                                document.getElementById("aeroplanepng").style.left = "44%";
                                document.getElementById("aeroplanepng").style.bottom = "1000%";

                                insession = 1;
                                }
                        }, i)
                    }

                }, Number(seconds));

                setTimeout(() => {

                    insession = 0;
                    bet = 0;

                    document.getElementById('betbtn').style.backgroundColor = "#FF8181"
                                document.getElementById('betbtn').innerHTML = "Place Bet"

                    document.getElementById("loadingBar").style.width = "100%";
                    document.getElementById("Major_Text").innerHTML = "We Lost The Plane";
                    document.getElementById("piloting").style.width = "200px";
                    document.getElementById("piloting").style.height = "200px";
                    document.getElementById("loader").style.width = "100%";

                    document.getElementById("aeroplanepng").style.transition = 'all 0s';

                    document.getElementById("aeroplanepng").style.left = "44%";
                                document.getElementById("aeroplanepng").style.bottom = "1%";

                    fetch("http://localhost:4000/server.php", {method: 'POST', headers:{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'Content-Type'}, body: JSON.stringify({'intention': 'start again'})}).
                        then((response) => response.text()).then(async (value) => {
                            if(value == "Success"){
                            betplaced = 0;
                            
                            }else{
                                alert("Error refreshing bets");
                            }
                        });

                }, 10000);
            }, 15000);
        }, startingTimer());

}

function startingTimer(){
    newstartingTime = Number(endingTime) - currenttime;
    return newstartingTime;
}

getState()