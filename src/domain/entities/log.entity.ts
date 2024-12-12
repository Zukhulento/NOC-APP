export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}
export interface LogEntityInterface {
  level: LogSeverityLevel; //Enum
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogSeverityLevel; //Enum
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor({
    message,
    level,
    origin,
    createdAt = new Date(),
  }: LogEntityInterface) {
    this.message = message;
    this.level = level;
    this.createdAt = createdAt;
    this.origin = origin;
  }
  // Factory constructor
  static fromJson = (jsonData: string): LogEntity => {
    jsonData = jsonData == "" ? "{}" : jsonData;
    const { message, level, createdAt, origin } = JSON.parse(jsonData);
    const log = new LogEntity({
      message,
      level,
      createdAt,
      origin,
    });
    return log;
  };
  // Factory constructor para crear modelos de log de objetos a entidad de mongo
  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { message, level, createdAt, origin } = object;
    const log = new LogEntity({
      message,
      level,
      createdAt,
      origin,
    });
    return log;
  };
}

// El objetivo de esta entidad es centralizar el tipo de datos
// independientemente de la conexión que se haga a data sources
