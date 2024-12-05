import { Server } from "./presentation/server"

// Función que se llama a si misma
(async()=>{
    main()
})()


function main(){
    Server.start()
}