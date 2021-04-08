// require your server and launch it here
const dotenv = require("dotenv").config();
const server = require("./api/server");
const port = process.env.PORT || 9000

server.listen(port, () => {
    console.log(`\n*** Server Running on ${port} ***\n`);
});