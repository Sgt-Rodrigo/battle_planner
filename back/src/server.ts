import express  from "express";
import router from "./routes";
import cors from 'cors';
 const server = express();

 //*? parses to js object
 server.use(express.json());
 server.use(cors())

 //*? sends request to main router
 server.use(router);

export default server;