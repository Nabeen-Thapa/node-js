const http = require('http');
const fs = require('fs');
const path = require('path');

// File paths for storing data and last ID
const dataFilePath = path.join(__dirname, 'users.json'); //path from current directory to users.js
const lastIdFilePath = path.join(__dirname, 'last_id.txt');//path from current directory to last_id.txt

// Read user data from users.json
const readUserData = () => {
    if (!fs.existsSync(dataFilePath)) {
        return []; // Return empty array if no data exists
    }
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data); //if exist return user data
};

// Write user data to to users.json
const writeUserData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Read the last used ID 
const readLastId = () => {
    if (!fs.existsSync(lastIdFilePath)) {
        return 0; // If no last id exists, start from 0
    }
    return parseInt(fs.readFileSync(lastIdFilePath, 'utf8'), 10);
};

// Write the last used ID to file
const writeLastId = (id) => {
    fs.writeFileSync(lastIdFilePath, id.toString());
};

// Send JSON response
const sendJsonResponse = (res, statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
};

// Create server
const server = http.createServer((req, res) => {
    let users = readUserData();
    let lastId = readLastId(); // Read the last ID from file

    // accress users
    if (req.method === 'GET' && req.url === '/users') {
        sendJsonResponse(res, 200, users);

    // Handle POST /users (create new user)
    } else if (req.method === 'POST' && req.url === '/users') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { name } = JSON.parse(body);
            if (!name) {
                sendJsonResponse(res, 400, { error: 'Name is required' });
                return;
            }

            // Increment ID for the new user
            lastId += 1; 
            const newUser = { id: lastId, name };
            users.push(newUser);
            writeUserData(users); // Save new user to JSON file
            writeLastId(lastId); // Update the last used ID

            sendJsonResponse(res, 201, newUser); // Respond with the newly created user
        });

    // Handle PUT /users/:id (edit user by ID)
    } else if (req.method === 'PUT' && req.url.startsWith('/users/')) {
        const id = parseInt(req.url.split('/')[2], 10);
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { name } = JSON.parse(body);
            if (!name) {
                sendJsonResponse(res, 400, { error: 'Name is required' });
                return;
            }

            const userIndex = users.findIndex(u => u.id === id);
            if (userIndex === -1) {
                sendJsonResponse(res, 404, { error: 'User not found' });
                return;
            }

            // Update user name
            users[userIndex].name = name;
            writeUserData(users); // Save updated user list to file
            sendJsonResponse(res, 200, users[userIndex]); // Respond with the updated user
        });

    // Handle DELETE /users/:id (delete user by ID)
    } else if (req.method === 'DELETE' && req.url.startsWith('/users/')) {
        const id = parseInt(req.url.split('/')[2], 10);

        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex === -1) {
            sendJsonResponse(res, 404, { error: 'User not found' });
            return;
        }

        // Remove user from the list
        users.splice(userIndex, 1);
        writeUserData(users); // Save updated user list to file
        sendJsonResponse(res, 200, { message: 'User deleted successfully' });

    } else {
        // Handle 404 for unknown routes
        sendJsonResponse(res, 404, { error: 'Route not found' });
    }
});

// Start the server
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
