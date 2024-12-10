import nodemailer from "nodemailer";
import { envs } from "../../configs/plugins/envs.plugins";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}
interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor(){}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments } = options;
    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });
      // console.log(sentInformation);
      // Informando que se envió el correo
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: "Email sent",
        origin: "email.service.ts",
      });

      return true;
    } catch (error) {
      // Informando que no se envió el correo
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: "Email not sent",
        origin: "email.service.ts",
      });

      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = `
    <h3>Logs del sistema - NOC</h3>
    <p>Laboris labore amet Lorem elit. Officia eu nisi qui laborum pariatur duis minim eu exercitation incididunt proident. In eiusmod deserunt qui commodo ex anim exercitation. Irure laborum consectetur consectetur enim cillum enim cupidatat eu sunt occaecat culpa excepteur incididunt aliqua. Quis dolore minim laboris irure sint velit laboris in quis ullamco. Esse sunt veniam cupidatat velit ex ex ea pariatur incididunt minim. Proident ea ea est laboris magna irure laborum esse commodo voluptate pariatur Lorem dolore.</p>
    <p>Consultar logs adjuntos</p>
    `;
    const attachments: Attachment[] = [
      {
        filename: "logs-all.log",
        path: "./logs/logs-all.log",
      },
      {
        filename: "logs-high.log",
        path: "./logs/logs-high.log",
      },
      {
        filename: "logs-medium.log",
        path: "./logs/logs-medium.log",
      },
    ];

    return this.sendEmail({
      to,
      subject,
      htmlBody,
      attachments,
    });
  }
}
