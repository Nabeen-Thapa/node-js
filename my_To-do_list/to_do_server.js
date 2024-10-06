const http = require('http');
const fs = require('fs');
const path = require('path');


//access files page
const addTask = fs.readFileSync('add_task.html', 'utf-8'); 
const viewToDoList = fs.readFileSync('view_to-do_list.html','utf-8');
const title =fs.readFileSync('to-do_title.html');
//accress and decode form data
function parseFormData(data) {
    const pairs = data.split('&');
    const result = {};
    pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        result[decodeURIComponent(key)] = decodeURIComponent(value.replace(/\+/g, ' '));
    });
    return result;
}
//accress data form .json file to display in the table
function displayTask(tasks){
    let rows = '';
    tasks.forEach(task =>{
        rows +=`<tr>
            <td>${task.task_id}</td>
            <td>${task.task_name}</td>
            <td>${task.task_desc}</td>
            <td>${task.start_data}</td>
            <td><button class="btn btn-warning">edit</button></td>
            <td><button class="btn btn-danger">delete</button></td>
        </tr>`;
    });
    return rows;
}

//create server
const ToDoServer = http.createServer((req, res)=>{
    if(req.url ==='/'){
        //read task data store page
        fs.readFile('to-do-data.json', 'utf-8', (err, data)=>{
            if (err) {
                console.error('Error reading task data:', err); // Log the error
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading task data.');
                return;
            }


        
                let tasks =[];
                if(data.length >0){
                    tasks = JSON.parse(data);
                

                //read the page view page
                fs.readFile('view_to-do_list.html', 'utf-8',(err,viewToDoList)=>{
                    if(!err){
                        const tableRows = displayTask(tasks);
                        const updatePage = viewToDoList.replace('accessing task form sosn file', tableRows);
                        res.writeHead(200, {'content-Type': 'text/html'});
                res.write(title);
                res.write(updatePage);
                res.end();
                    } else {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error loading the view page.');
                    }
                });
                
            }else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading task data.');
            }
        })  
    }else if(req.url ==='/add_task.html'){
        res.writeHead(200, {'content-Type': 'text/html'});
        res.write(title);
        res.write(addTask);
        res.end();  
    }
    else if(req.method === 'POST' && req.url=== '/submit'){
        let body = '';
        req.on('data', chunk=>{
            body +=chunk.toString();//change buffer to string
        });
        req.on('end',()=>{
            const formdata = parseFormData(body);
            //read data
            fs.readFile('to-do-data.json',(err, data)=>{
                let jsondata = [];
                if(!err){
                    jsondata = JSON.parse(data);
                }
                jsondata.push(formdata);
                //write data
                fs.writeFile('to-do-data.json', JSON.stringify(jsondata, null, 2), (err)=>{
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error saving data.');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('Data saved successfully!');
                })
            })
        })
    }else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

//event lisner
const toDoPort = 2000;
ToDoServer.listen(toDoPort, ()=>{
    console.log(`your server start at port http://localhost:${toDoPort}`);
});