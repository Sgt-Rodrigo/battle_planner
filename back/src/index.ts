import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { preLoadData } from "./helpers/preloadData";



//*? initialization with then()
// AppDataSource.initialize()
// .then(res => {
//     console.log(`Connection to database stablished`);
//     server.listen(PORT, ()=>{
//         console.log(`SERVER IS ON LINE and running > port# ${PORT}`)
//     })
    
// })

//*? initialization with async/await
const initializeApp = async ()=>{
    await AppDataSource.initialize();
    await preLoadData();
    server.listen(PORT, ()=>{
        console.log(`SERVER IS UP and RUNNING > port# ${PORT}`)
    })
}

initializeApp();

