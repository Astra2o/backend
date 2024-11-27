import app from "./src/app.js"
import { conf } from "./src/config/config.js";




const startServer=() =>{
    const port = conf.port || 3000;
    app.listen(port,()=>{
        console.log(`app is listen to port : ${port}`);
        
    })
}
startServer()