import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from "@prisma/client";

const prismaClient = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level];
    const newLog = await prismaClient.logModel.create({
      data: {
        ...log,
        level,
      },
    });
    console.log("Postgres log created", newLog.id);
  }
  async getLogs(serevityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[serevityLevel];
    const logs = await prismaClient.logModel.findMany({
      where: {
        level,
      },
    });
    return logs.map(LogEntity.fromObject);
  }
}
