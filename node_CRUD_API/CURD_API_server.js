const http = require('http');
const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');


//storing user data file i.e users.json
const user_data = path.join(__dirname, 'users.json');

//storing last used id for increment last used id by 1 so it will unique
const last_id = path.join(__dirname, 'last_id.txt');

//read data from json 
const readUserData = ()=>{
    if(!fs.existsSync(user_data)){
        return []; // it return empty array if there are no user data
    }
    const readData =  fs.readFileSync(readUserData);
    return JSON.parse(readData)//if there are user data exist then it read user data and return in json format

    //write data to json file
    const writeUserData =(data)=>{
        fs.writeFileSync(user_data, json.stringfy(data, null, 2));
    };
   
    //send json responce
    const sendJsonResponce = (res, StatusCode, data)=>{
        res.writeHead(StatusCode, {'COntenct-type': 'application/json'});
        res.end(json.stringfy(data));
    }
    

}


// Start the server
server.listen(5001, () => {
    console.log('Server running at http://localhost:5001');
});
