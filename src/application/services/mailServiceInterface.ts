import { MailServiceReturn } from "../../frameworks/services/mailService"; 
import { Mail } from "../../types/mailOption";

export const mailServiceInterface = (service: MailServiceReturn) => {
  const sendMail = (mailOption: Mail) => {
    service.sendMail(mailOption);
  };

  return { sendMail };
};

export type MailServiceInterface = typeof mailServiceInterface;