// file system module synchronously

const fs = require('fs');
//create folder asynchoronously to store synchronously files
// fs.mkdir('./sync_fs_folder',(err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log("successfully created");
//     }
// });


// try{
    //write file
    // fs.writeFileSync("sync_fs_folder/sync_index.txt", "hey, writes a file using writeFileSync");

//     //read file
//     const read_data = fs.readFileSync("sync_fs_folder/sync_index.txt");
//     console.log(read_data);
//     //wothout using utf-8
//     // <Buffer 68 65 79 2c 20 77 72 69 74 65 73 20 61 20 66 69 6c 65 20 75 73 69 6e 67 20 77 72 69 74 65 46 69 6c 65 53 79 6e 63>


//     //using utf-8 
//     const read_data_utf = fs.readFileSync("sync_fs_folder/sync_index.txt",'utf-8');
//     console.log(read_data_utf);
//     // output : hey, writes a file using writeFileSync

// }catch(err){
//     console.log("error occour: " + err);
// }



//read the contents of a directory using fs.readdir()
//fs.readdir()- read the contents of a directory (the files and folders present in the directory). 
// fs.readdir('./sync_fs_folder',(err,files)=>{
//     if(err){
//         console.log(err);
//         return;
//     }else{
//         console.log("directory reade success");
//         console.log(files);
//     }
// });
//output: 
// directory reade success
// [ 'sync_index.txt' ]     
//sync_index.txt is the file the is in sync_fs_folder directory




// rename a file using fs.rename()
//syntax : fs.rename(oldPath, newPath, callback);

// oldPath (string) -current file path
// newPath (string) - new file path
// callback (function) - to be executed when the renaming is complete, takes an error object as its only parameter.


fs.rename('./sync_fs_folder/sync_index.txt', './sync_fs_folder/sync_firstPage.txt', (err)=>{
    if(err){
        console.log(err);
        return;
    }else{
        console.log("rename complete");
    }
}); //rename sync_index.text to  sync_firstPage.text
//output : rename complete




// delete a file using fs.unlink()
fs.unlink('./sync_fs_folder/sync_firstPage.txt',(err)=>
{
    if(err){
        console.log(err);
        return;
    }else{
        console.log("error in delete");
    }
});