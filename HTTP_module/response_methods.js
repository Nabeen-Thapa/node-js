//response methods of http
//three methods
//  1- res.writeHead()
//  2. res.write()
//  3. res.end()

const http= require('http');
const server = http.createServer((req,res)=>{
    if(req.url ==='/'){
        res.writeHead(200, {'content-type' : 'text/html'});
        res.write("home page");
        res.end();
    }else if(req.url ==='/about'){
        res.writeHead(200, {'content-type' : 'text/html'});
        res.write("about page");
        res.end();
    }
    else if(req.url ==='/contact'){
        res.writeHead(200, {'content-type' : 'text/html'});
        res.write("contact page");
        res.end();
    }
})
server.listen(5100,()=>{
    console.log("server startat 5100");
})