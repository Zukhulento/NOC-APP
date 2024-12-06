import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {
  // Primero hago una inyección de dependencias
  // Especifico que necesito mi datasource para poder hacer los métodos
  // ? en un dado caso de querer cambiar el datasource, solo es necesario cambiarlo en esta inyección de dependencias
  constructor(private readonly logDatasource: LogDatasource) {}
  // Se mandan a llamar los métodos de los datasources según función
  async saveLog(log: LogEntity): Promise<void> {
    return this.logDatasource.saveLog(log);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(severityLevel);
  }
}
