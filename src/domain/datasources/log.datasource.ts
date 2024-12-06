// Las clases abstractas se utilizan para definir comportamientos
// No son instanciables

import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogDatasource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(serevityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}

// Esto también es conocido como "Contrato"
