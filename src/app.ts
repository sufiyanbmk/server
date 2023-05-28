import express,{Application, NextFunction} from 'express';
import connectDB from './frameworks/database/mongoDb/connection';
import http from 'http'
import serverConfig from './frameworks/webserver/server';
import expressConfig from './frameworks/webserver/express';
import errorHandlingMidlleware from './frameworks/webserver/middlewares/errorHandlingMiddleware';
import AppError from './utils/appError';
import routes from './frameworks/webserver/routes/';
import { Server } from 'socket.io';
import configKeys from './config'
import { authService } from './frameworks/services/authService';
import socketConfig from './frameworks/websocket/socket';

const app:Application = express();
const server = http.createServer(app)

//socket

const io = new Server(server,{
    cors:{
        origin:configKeys.ORGIN_PORT,
        methods:["GET","POST"]
    }
});

socketConfig(io,authService())

//connecting mongoDb
connectDB();

expressConfig(app)
   
// routes for each endpoint
routes(app)


app.use(errorHandlingMidlleware);

 // catch 404 and forward to error handler
 app.all('*', (req,res,next:NextFunction) => {
    next(new AppError('Not found', 404));
});


serverConfig(server).startServer()
