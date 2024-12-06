import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}
// Tipando los callbacks (inyección de dependencias)
type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  // Inyección de dependencias
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      const log = new LogEntity(`Service ${url} ok`, LogSeverityLevel.low);
      this.logRepository.saveLog(log);
      this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = ` ${url} not ok. ${error}`;
      const log = new LogEntity(errorMessage, LogSeverityLevel.high);
      this.logRepository.saveLog(log);
      this.errorCallback(errorMessage);
      return false;
    }
  }
}
