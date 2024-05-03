const http = require('http');

const state = ["Ready For Flight", "None", "Flight has landed"];
number = 0;
startingtime = 0;
endingtime = 0;

http.createServer((req, res) => {

    console.log(req.url);

    res.writeHead(200, {'access-control-allow-origin': '*', 'Content-Type': 'application/json', 'access-control-allow-headers':'*'})

    if(req.url == "/getseconds"){
    res.write( ((5000 - number)/1000).toString());
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
        startingtime = new Date().getTime().toString();
        endingtime = Number(startingtime) + 15000;

        number = Math.ceil(Math.random() * 5000);

        console.log(((5000 - number)/1000) + "secs");

    }, 15000);

    }


setState();