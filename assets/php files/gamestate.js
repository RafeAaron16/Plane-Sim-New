const http = require('http');

const state = ["Ready For Flight", "None", "Flight has landed"];
number = 0;
startingtime = 0;
endingtime = 0;

http.createServer((req, res) => {

    console.log(req.url);

    res.writeHead(200, {'access-control-allow-origin': '*', 'Content-Type': 'application/json', 'access-control-allow-headers':'*'})

    if(req.url == "/getseconds"){
    res.write( ((28000 - number)).toString());
    res.end()
    }

    if(req.url == "/getStartingTime"){
        res.write(startingtime.toString());
        res.end()
    }

    if(req.url == "/getEndingTime"){
        res.write(endingtime.toString());
        res.end()
    }
    
}).listen(4001, (error)=>{
    console.log("I'm listening");
})



function setState(){

    setInterval(() => {

        number = Math.ceil(Math.random() * 28000);

        startingtime = new Date().getTime().toString();
        endingtime = Number(startingtime) + number + 10000;

        console.log(((28000 - number)/1000) + "secs");

    }, 4000);

    }


setState();