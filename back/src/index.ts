import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";




AppDataSource.initialize()
.then(res => {
    console.log(`Connection to database stablished`);
    server.listen(PORT, ()=>{
        console.log(`SERVER IS ON LINE and running > port# ${PORT}`)
    })
    
})



