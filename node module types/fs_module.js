// file system module asynchronously

// How to create a directory using fs.mkdir()

const fs = require('fs');//import fs module

//present working directory :   e\javascript learning\node-js\node module types
//making a new working directory: fs_folder
fs.mkdir('./fs_folder',(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("successfully created");
    }
});//this create a directory/folder in "node module types" folder




//create and write to a file asynchronously using fs.writeFile()
// const data ="this is new file.txt";
// fs.writeFile("fs_folder/write_File.txt",data, {flag: 'a'}, (err)=>{
//     if(err){
//         console.log(err);
//         return;
//     }else{
//         console.log("file creates successfully");
//     }
// });

//creting same file with dafferent data 
// const new_data = "this is new file with same fileName with different data";
// fs.writeFile("fs_folder/write_file.txt", new_data, {flag: 'a'},(err)=>{
//     if(err){
//         console.log(err);
//         return;
//     }else{
//         console.log("same file created successfully");
//     }
// }); //this does not create new file if same file id exist but overlap the file data, i.e remove old data and add new data in file 

// note :in above function, callback function is optional for handle the error and
//The {flag: 'a'} is also an option passed to fs.writeFile to specify how the file should be opened.
// The 'a' flag stands for "append" mode, meaning that if the file already exists, new_data will be added (appended) to the existing content at the end of the file, rather than overwriting the file's existing content.





//read a file asynchronously using fs.readFile()
fs.readFile('./fs_folder/write_file.txt', {encoding:'utf-8'}, (err, data)=>{
    if(err){
        console.log(err);
        return
    }else{
        console.log("read successfully.");
        console.log(data);
    }
});
//output : this is new file with same fileName with different datathis is new file.txt this is new file.
//note : {encoding:'utf-8'} used to specify the character encoding used to interpret the file data


// By default, if no encoding parameter is provided, the method returns a raw buffer.
//without {encoding:'utf-8'}
fs.readFile('./fs_folder/write_file.txt', (err, data)=>{
    if(err){
        console.log(err);
        return
    }else{
        console.log("read successfully.");
        console.log(data);
    }
});
//output:
//read successfully.
{/* <Buffer 74 68 69 73 20 69 73 20 6e 65 77 20 66 69 6c 65 20 77 69 74 68 20 73 61 6d 65 20 66 69 6c 65 4e 61 6d 65 20 77 69 74 68 20 64 69 66 66 65 72 65 6e 74 ... 42 more bytes> */}

