import { PrismaClient } from "@prisma/client";
import { envs } from "./configs/plugins/envs.plugins";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";

// Función que se llama a si misma
(async () => {
  main();
})();

// Se agrega el async para esperar la conexión a mongo
async function main() {
  // Conectarse a mongo
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });
  // const prisma = new PrismaClient()
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: "HIGH",
  //     message: 'Test message',
  //     origin: 'App.ts'
  //   }
  // })
  // console.log(newLog)
  Server.start()
}
