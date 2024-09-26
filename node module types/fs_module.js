// How to create a directory using fs.mkdir()

const fs = require('fs');//import fs module

//present working directory :   e\javascript learning\node-js\node module types
// making a new working directory: fs_folder
fs.mkdir('./fs_folder',(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("successfully created");
    }
});//this create a directory/folder in "node module types" folder



// How to create and write to a file asynchronously using fs.writeFile()

