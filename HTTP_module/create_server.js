const http = require('http'); // Import http module

const server = http.createServer((req, res) => {
    res.end("Hello, world!, welcome to http server");
   // res.end("welcome to http server");
});

// Listen on port 5001
server.listen(5001, () => {
    console.log("Server listening at port 5001");
});
