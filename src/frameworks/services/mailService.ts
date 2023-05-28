const nodemailer = require("nodemailer");
import { google } from "googleapis";
import configKeys from "../../config";
import { Mail } from "../../types/mailOption";

export const mailService = () => {
  const sendMail = async (mailOption: Mail) => {
    const oAuth2Client = new google.auth.OAuth2(
      configKeys.OAuth2_CLIENT_ID,
      configKeys.OAuth2_CLIENT_SECRECT,
      configKeys.OAuth2_RIDERECT_URI
    );
    oAuth2Client.setCredentials({
      refresh_token: configKeys.OAuth2_REFRESH_TOKEN,
    });
    const accessToken = await oAuth2Client.getAccessToken();
    console.log(accessToken)
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "sufiyanbmk01@gmail.com",
        clientId: configKeys.OAuth2_CLIENT_ID,
        clientSecret: configKeys.OAuth2_CLIENT_SECRECT,
        refreshToken: configKeys.OAuth2_REFRESH_TOKEN,
        accessToken: accessToken,
      },

    });
    await transport.sendMail(mailOption);
    return;
  };
  return {
    sendMail,
  };
};

export type MailService = typeof mailService;

export type MailServiceReturn = ReturnType<MailService>;