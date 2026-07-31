import router from "./src/routes/index.route.js";
import Server from "./src/server/config.js";


const server = new Server();
server.app.use('/Recetas', router);
server.listen();