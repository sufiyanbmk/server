import dotenv from "dotenv";
dotenv.config();

const configKeys = {

  ORGIN_PORT : process.env.ORGIN_PORT as string,

  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME as string,

  AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION as string,

  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY as string,

  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY as string,

  mongoDbUrl: process.env.MONGODBURL as string,

  port: process.env.PORT || 5000,

  jwtSecret: process.env.JWT_SECRET as string,

  nodeEnv: process.env.NODE_ENV as string,

  googleAuthClient: process.env.GOOGLE_AUTH_CLIENT as string,

  OAuth2_CLIENT_ID: process.env.oAuth2_CLIENT_ID as string,

  OAuth2_CLIENT_SECRECT: process.env.oAuth2_CLIENT_SECRECT as string,

  OAuth2_RIDERECT_URI: process.env.oAuth2_RIDERECT_URI as string,

  OAuth2_REFRESH_TOKEN: process.env.oAuth2_REFRESH_TOKEN as string,

  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY as string,

  STRIPE_SECERET_KEY:process.env.STRIPE_SECERET_KEY as string,


};

export default configKeys;
