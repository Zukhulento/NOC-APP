import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    console.log("Mongo log created", newLog.id);
  }
  async getLogs(serevityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({
      level: serevityLevel,
    });
    // Utilizando el factory constructor para pasar de objeto a entidad de mongo
    return logs.map(LogEntity.fromObject);
  }
}
