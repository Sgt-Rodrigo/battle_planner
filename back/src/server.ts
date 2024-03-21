import express  from "express";
import router from "./routes";

 const server = express();

 //*? parses to js object
 server.use(express.json());

 //*? sends request to main router
 server.use(router);

export default server;