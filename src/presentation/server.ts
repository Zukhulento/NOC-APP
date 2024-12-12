import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

// Instancias
const fsRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mongoRepository = new LogRepositoryImpl(new MongoLogDatasource());
const postgresRepository = new LogRepositoryImpl(new PostgresLogDatasource());

export class Server {
  public static start() {
    console.log("Server started...");
    // Mandar email
    // const emailService = new EmailService()
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "lmatus3@unica.edu.ni",
    //   "zukhulento01@gmail.com",
    // ])
    // emailService.sendEmail({
    //   to: "lmatus3@unica.edu.ni",
    //   subject: "Logs de sistema",
    //   htmlBody: `
    //   <h3>Logs de sistema - NOC</h3>
    //   <p>Cupidatat mollit eu consectetur consectetur occaecat reprehenderit nostrud exercitation occaecat fugiat proident incididunt. Excepteur aliquip in minim Lorem. Veniam fugiat non qui exercitation. Quis ex tempor proident reprehenderit deserunt fugiat excepteur. Eiusmod aute pariatur exercitation id adipisicing. Sunt ea labore elit labore.</p>
    //   <p>Ver logs adjuntos</p>
    //   `,
    // });
    // emailService.sendEmailWithFileSystemLogs([
    //   "lmatus3@unica.edu.ni",
    //   "zukhulento01@gmail.com",
    // ]);
    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://google.com";
      // const url = "http://localhost:3000";
      new CheckServiceMultiple(
        [fsRepository, postgresRepository, mongoRepository],
        () => console.log(`${url} is ok`),
        undefined
      ).execute(url);
    });
  }
}
