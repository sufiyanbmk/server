import express, { Application,NextFunction } from "express"
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import configKeys from "../../config";
import helmet from "helmet";

const expressConfig = (app: Application) => {

    // Development logging
    // if (configKeys.nodeEnv == 'development') {
        app.use(morgan('dev'));
    // }

    // app.use(cors({ origin: "http://localhost:3000" }));
    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(helmet({xssFilter:true}));
}

export default expressConfig