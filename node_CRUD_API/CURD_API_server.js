const http = require("http");
const fs = require("fs");
const path = require("path");

// File paths
const dataFilePath = path.join(__dirname, "users.json"); // File for user data

// Function to read data from the JSON file
function readData() {
    if (!fs.existsSync(dataFilePath)) {
        return [];
    }
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
}

// Function to write data to the JSON file
function writeData(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
    console.log(`Request received: ${req.method} ${req.url}`);

    // POST method to add a new name
    if (req.method === "POST" && req.url === "/users") {
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });
        req.on("end", () => {
            try {
                const { name } = JSON.parse(body);
                if (!name) {
                    throw new Error("Name is required");
                }
                const data = readData();
                const id = data.length > 0 ? data[data.length - 1].id + 1 : 1; // Generate unique ID
                const newEntry = { id, name };
                data.push(newEntry);
                writeData(data);
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify(newEntry));

            } catch (error) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Invalid JSON input or missing name" }));
            }
        });

    // PATCH method to edit a name by ID
    } else if (req.method === "PATCH" && req.url.startsWith("/users/")) {
        const id = parseInt(req.url.split("/").pop());
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                const { name } = JSON.parse(body);
                const data = readData();
                const entryIndex = data.findIndex(entry => entry.id === id);

                if (entryIndex !== -1) {
                    data[entryIndex].name = name; // Update the name
                    writeData(data);
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(data[entryIndex]));
                } else {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "Entry not found" }));
                }
            } catch (error) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Invalid JSON input or missing name" }));
            }
        });

    // DELETE method to remove a name by ID
    } else if (req.method === "DELETE" && req.url.startsWith("/users/")) {
        const id = parseInt(req.url.split("/").pop());
        const data = readData();
        const filteredData = data.filter(entry => entry.id !== id); // Remove entry by ID

        if (data.length !== filteredData.length) {
            writeData(filteredData);
            res.writeHead(204); // No content
            res.end();
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Entry not found" }));
        }

    // GET method to retrieve all names (correct route to "/users")
    } else if (req.method === "GET" && req.url === "/users") {
        const data = readData();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
    }
       //else if (req.method === "GET" && /^\/users\/\d+$/.test(req.url))
       else if(req.method === "GET" && req.url.startsWith('/users/')) {
        const id = parseInt(req.url.split("/").pop());
        const data = readData();
        const user = data.find(entry => entry.id === id);

        if (user) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "User not found" }));
        } 
    // Handle invalid routes
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
