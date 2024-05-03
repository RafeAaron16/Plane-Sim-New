function getRemainingMoney(username){
        fetch('http://localhost:4000/server.php', {method: 'POST', headers:{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'Content-Type'}, body:JSON.stringify({'intention': 'get amount remaining', 'username': username})}).
        then((response) => { 
            
            console.log(response)
            
            return response.text()}).
        then((value) => {
            document.getElementById('cashRemaining').innerHTML = value;
            console.log(value)
        })
}
var automatic = 0;

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

    console.log(automatic);
})

document.getElementById('betbtn').addEventListener('click', ()=>{
    placeBet("Rafe Aaron")
})

function placeBet(username){
    if(document.getElementById('bet').value <= 0){
        alert("Please increase bet amount");
    }else if(document.getElementById('bet').value > Number(document.getElementById('cashRemaining').innerHTML)){

        console.log(Number(document.getElementById('cashRemaining').innerHTML))
        alert("Insufficient Funds. Balance: " + (document.getElementById('bet').value - Number(document.getElementById('cashRemaining').innerHTML)));
    }
    else{
    fetch('http://localhost:4000/server.php', {method: 'POST', headers:{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'Content-Type'}, body:JSON.stringify({'betAmount': document.getElementById('bet').value,'intention': 'place bet', 'username': username})}).
    then((response) => {
        
        return response.text()}).
    then((value) => {

        if(value == "Success"){
            document.getElementById('cashRemaining').innerHTML = getRemainingMoney("Rafe Aaron");
            reduceRemainingMoney('Rafe Aaron');
        }

        if(value == "Failure"){
            alert("Failed to update amount");
        }
        console.log(value)
    }).catch((error) =>{
        alert("There was an error trying to place the bet")
    })
}
}

function reduceRemainingMoney(username){

    if(document.getElementById('bet').value <= 0){
        alert("Please increase bet amount");
    }else{
    fetch('http://localhost:4000/server.php', {method: 'POST', headers:{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'Content-Type'}, body:JSON.stringify({'betAmount': document.getElementById('bet').value,'intention': 'reduce amount remaining', 'username': username})}).
    then((response) => {
        
        return response.text()}).
    then((value) => {

        if(value == "Success"){
            document.getElementById('cashRemaining').innerHTML = getRemainingMoney("Rafe Aaron");
        }

        if(value == "Failure"){
            alert("Failed to update amount");
        }
        console.log(value)
    }).catch((error) =>{
        alert("There was an error trying to place the bet")
    })
}
}

getRemainingMoney("Rafe Aaron");

function getMyBets(username){
    fetch('http://localhost:4000/server.php', {method: 'POST', headers:{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'Content-Type'}, body:JSON.stringify({'intention': 'retrieve current bets'})}).
    then((response) => { 
        
        return response.json()}).
    then((value) => {

        number = 0


        number_of_elements = document.getElementById('listing').childElementCount;

        for(let i = number_of_elements; i > 0; i--){
            document.getElementById('listing').removeChild(document.getElementById('listing').firstChild)
        }

        

        for(let i = 0; i < value.length; i++){

            if(value[i].Name == username){
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
    })
}

function getAllBets(){
    fetch('http://localhost:4000/server.php', {method: 'POST', headers:{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'Content-Type'}, body:JSON.stringify({'intention': 'retrieve current bets'})}).
    then((response) => { 
        
        console.log(response)
        
        return response.json()}).
    then((value) => {

        number_of_elements = document.getElementById('listing').childElementCount;

        for(let i = number_of_elements; i > 0; i--){
            document.getElementById('listing').removeChild(document.getElementById('listing').firstChild)
        }

        document.getElementById('betNumber').innerHTML = "All Bets("+ value.length+")";

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
    getMyBets("Rafe Aaron");
})

getMyBets("Rafe Aaron");
getAllBets();

startingTime = 0;
endingTime = 0;
newstartingTime = 0;
seconds = 0;

async function getState(){
    await fetch("http://localhost:4001/getStartingTime", {method: 'GET', headers:{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'Content-Type'}}).
    then((response) => response.text()).then((value) => {
        console.log(value);

        startingTime = value;
    });

    await fetch("http://localhost:4001/getEndingTime", {method: 'GET', headers:{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'Content-Type'}}).
    then((response) => response.text()).then((value) => {
        console.log(value);

        endingTime = value;
    });

    await fetch("http://localhost:4001/getseconds", {method: 'GET', headers:{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'Content-Type'}}).
    then((response) => response.text()).then((value) => {
        console.log(value);

        seconds = value;
    });

    coordinatesBottom = ["1%", "80%", "50%", '70%',  "70%", '100%']
    coordinatesLeft = ["44%", "44%", "75%", "70%", "30%", "44%"]

    currenttime = new Date().getTime();

    console.log(newstartingTime);

    document.getElementById("Major_Text").innerHTML = "Syncing with server";

    setTimeout(() =>{

        document.getElementById("Major_Text").innerHTML = "Please wait for the next round in 15 minutes";

            setInterval(() => {
                setTimeout(() => {
                    document.getElementById("aeroplanepng").style.transition = 'all 2s';
                    document.getElementById("Major_Text").innerHTML = "Get ready For Flight";
                    document.getElementById("loader").style.width = "0%";
                    document.getElementById("loadingBar").style.width = "100%";
                    document.getElementById("piloting").style.width = "200px";
                    document.getElementById("piloting").style.height = "200px";

                    if(automatic == 1){
                        placeBet("Rafe Aaron");
                    }

                }, 0);

                setTimeout(() => {
                    
                    document.getElementById("Major_Text").innerHTML = "";
                    document.getElementById("piloting").style.width = "0px";
                    document.getElementById("piloting").style.height = "0px";
                    document.getElementById("loadingBar").style.width = "0px";

                    for(let i = 0; i < coordinatesBottom.length; i++){
                        setTimeout(() => {
                        document.getElementById("aeroplanepng").style.left = coordinatesLeft[i];
                        document.getElementById("aeroplanepng").style.bottom = coordinatesBottom[i];
                        }, (5000/coordinatesBottom.length) * i);

                    }

                    getAllBets();
                    getMyBets("Rafe Aaron")

                }, 5000);

                setTimeout(() => {
                    document.getElementById("loadingBar").style.width = "100%";
                    document.getElementById("Major_Text").innerHTML = "The Plane Flew Away";
                    document.getElementById("piloting").style.width = "200px";
                    document.getElementById("piloting").style.height = "200px";
                    document.getElementById("loader").style.width = "100%";

                    document.getElementById("aeroplanepng").style.transition = 'all 0s';
                    document.getElementById("aeroplanepng").style.left = coordinatesLeft[0];
                    document.getElementById("aeroplanepng").style.bottom = coordinatesBottom[0];

                }, 10000);
            }, 15000);
        }, startingTimer());


}

function startingTimer(){
    newstartingTime = Number(endingTime) - currenttime;
    console.log(newstartingTime);
    return newstartingTime;
}

getState()