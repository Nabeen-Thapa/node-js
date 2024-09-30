//req.url - used ti accress the page
//        -Suppose if I type in: http://localhost:5000/about in my web          browser's search bar, this means I am performing a GET Request on the server and I am trying to access the /about page. So In this case the value of req.url will be /about.    

const http = require('http');
const server = http.createServer((req, res)=>{
    if(req.url==='/'){ //for : http://localhost:4000/
        res.end("this is home page");
    }
    else if(req.url ==='/about'){//http://localhost:4000/about
        res.end("this is about page");
    }
    else if(req.url ==='/contact'){ //http://localhost:4000/contact
        res.end("9876543210 for contact");
    }
    else{ //other then above links like : http://localhost:4000/dsfsdfg
        res.end("error 404 : page not found");
    }
});
server.listen(4000, ()=>{
    console.log("server at port 4000");
})