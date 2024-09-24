
const sayhello=require('./node_module.js'); //import module named node_module.js
sayhello("Rohit");
sayhello("Ram");
sayhello("Shyam");

// output:
// hello Rohit
// hello Ram
// hello Shyam

//if argument no need to pass we can well like that or given from required file
// require('./node_module.js');




// call function
const myfunction = require('./module_exports.js'); //importing
myfunction(); //output : this is calling function uding module.exports


//call multiple function using module.exports
const multi_func = require('./module_exports.js');
//console.log(multi_func.foo);
multi_func.func1();
multi_func.func2();