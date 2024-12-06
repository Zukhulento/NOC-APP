import { json } from "stream/consumers";

export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  public level: LogSeverityLevel; //Enum
  public message: string;
  public createdAt: Date;

  constructor(message: string, level: LogSeverityLevel) {
    this.message = message;
    this.level = level;
    this.createdAt = new Date();
  }
  // Factory constructor
  static fromJson = (jsonData: string): LogEntity => {
    const { message, level, createdAt } = JSON.parse(jsonData);
    const log = new LogEntity(message, level);
    log.createdAt = new Date(createdAt);
    return log
  };
}

// El objetivo de esta entidad es centralizar el tipo de datos
// independientemente de la conexión que se haga a data sources
