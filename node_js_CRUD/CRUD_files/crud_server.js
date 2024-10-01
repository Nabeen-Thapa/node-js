const http = require('http');
const fs = require('fs');

// Function to parse form data
function parseFormData(request, callback) {
    let body = '';
    request.on('data', chunk => {
        body += chunk.toString(); // Convert buffer to string
    });

    request.on('end', () => {
        const formData = new URLSearchParams(body); // Parse form data
        const result = {};
        for (const [key, value] of formData.entries()) {
            result[key] = value;
        }
        callback(result);
    });
}

// Read HTML files synchronously
const titleBar = fs.readFileSync('Title_bar.html');
const addUserForm = fs.readFileSync('add_user_form.html', 'utf8');
const userTableTemplate = fs.readFileSync('user_table.html', 'utf8');
const editUserFormTemplate = fs.readFileSync('user_edit_form.html', 'utf8');


// Store user data in memory
let users = [];

// Create HTTP server
const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Display user table
        res.writeHead(200, {'content-type': 'text/html'});
    res.write(titleBar); // Write the title bar first
        const userRows = users.map((user, index) => `
            <tr>
                <td>${user.uid}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.address}</td>
                <td>
                    <form action="/edit/${index}" method="GET" style="display: inline;">
                        <button type="submit" class="btn btn-warning">Edit</button>
                    </form>
                </td>
                <td>
                    <form action="/delete" method="POST" style="display: inline;">
                        <input type="hidden" name="index" value="${index}">
                        <button type="submit" class="btn btn-danger">Delete</button>
                    </form>
                </td>
            </tr>
        `).join('');

        const userTable = userTableTemplate.replace('{{userRows}}', userRows);

        // res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(userTable);
        res.end();
    } else if (req.method === 'GET' && req.url === '/add_user_form.html') {
        // Serve add user form
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(addUserForm);
    } else if (req.method === 'GET' && req.url.startsWith('/edit/')) {
        const index = parseInt(req.url.split('/')[2], 10);

        // Ensure valid user index
        if (isNaN(index) || index < 0 || index >= users.length) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>User not found</h1>');
        } else {
            // Populate edit form with user data
            const user = users[index];
            const editUserForm = editUserFormTemplate
                .replace('{{index}}', index)
                .replace('{{uid}}', user.uid)
                .replace('{{name}}', user.name)
                .replace('{{email}}', user.email)
                .replace('{{address}}', user.address);

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(editUserForm);
        }
    } else if (req.method === 'POST' && req.url === '/submit') {
        // Handle new user submission
        parseFormData(req, (formData) => {
            users.push(formData);
            res.writeHead(302, { Location: '/' });
            res.end();
        });
    } else if (req.method === 'POST' && req.url === '/update') {
        // Handle user update
        parseFormData(req, (formData) => {
            const index = parseInt(formData.index, 10);
            if (!isNaN(index) && index >= 0 && index < users.length) {
                users[index] = {
                    uid: formData.uid,
                    name: formData.name,
                    email: formData.email,
                    address: formData.address,
                };
            }
            res.writeHead(302, { Location: '/' });
            res.end();
        });
    } else if (req.method === 'POST' && req.url === '/delete') {
        // Handle user deletion
        parseFormData(req, (formData) => {
            const index = parseInt(formData.index, 10);
            if (!isNaN(index) && index >= 0 && index < users.length) {
                users.splice(index, 1);
            }
            res.writeHead(302, { Location: '/' });
            res.end();
        });
    } else {
        // 404: Page not found
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404: Page not found</h1>');
    }
});

// Start the server
server.listen(5001, () => {
    console.log('Server running at http://localhost:5001');
});
