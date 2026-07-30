import router from "./src/routes/index.route.js";
import Server from "./src/server/config.js";

//instanciar la clase Server

const server = new Server();
server.app.use('/api', router);
server.Listen();
