//import path module using require
const path = require('path')

//sign a path to a variable 
const  myPath = '/E/javascript learning/node-js/path_module.js'
const pathInfo= {
    fimeName :path.basename(myPath), //show filename or last part of that path
    folderName : path.dirname(myPath), //show parent directory/folder of file
    fileExtension: path.extname(myPath), //show the file extension if exist
    absoluteOrNot: path.isAbsolute(myPath), //show true/ false for absulate path
    detailInfo: path.parse(myPath), //show info in detail like root, directory, base, extension, name of file
}
//in short this module say about file(i.e path_module.js) that we pass in mypath userdefined variable 

console.log(pathInfo);
// output :
// {
//     fimeName: 'path_module.js',
//     folderName: '/E/javascript learning/node-js',
//     fileExtension: '.js',
//     absoluteOrNot: true,
//     detailInfo: {
//       root: '/',
//       dir: '/E/javascript learning/node-js',
//       base: 'path_module.js',
//       ext: '.js',
//       name: 'path_module'
//     }
//   }