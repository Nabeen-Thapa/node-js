// about module.exports
// - a special type of object in NodeJ,
// - allow to export function, variable, or value form module,
// - so that other module can access and use

//e.g 
// export a single function from module uding module.exports
function myfunction(){
    console.log("this is calling function using module.exports");
}
module.exports = myfunction; //it is exported in call_module.js file


//export multiple function
function multi_func1(){
    console.log("this is function 1");
}
function multi_func2(){
    console.log("this is function 2");
}

//module.exports = multi_func1;     // export first function
//module.exports = multi_func2;     // export second function
// in here we first export multi_func1() and then multi_func2(), in this case multi_func2() overwrite the multi_func1(), so only multi_func2() will exported and multi_func1 will not exported

// This problem can be solved if we assign module.exports to an object which contains all the functions we want to export, like this:
module.exports = {
    //foo : 'ber',
    func1 :multi_func1,
    func2 :multi_func2
};