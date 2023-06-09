import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'
import configKeys from '../../config';

export const authService=()=>{
    const encryptPassword=async(password:string)=>{
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        return password
    }

    const comparePassword=(password:string,hashedPassword:string)=>{
       return bcrypt.compare(password,hashedPassword)
    }

    const generateToken=(payload:string)=>{
        const token = jwt.sign({payload}, configKeys.jwtSecret, {
            expiresIn: "5d",
        });
        return token
    }

    const verifyToken=(token:any)=>{
        return jwt.verify(token, configKeys.jwtSecret)
    }

    const tokenDecode = (token:string) => {
        return jwt_decode(token)
    }

    return {
        encryptPassword,
        comparePassword,
        generateToken,
        verifyToken,
        tokenDecode
    }
}


export type AuthService = typeof authService 

export type AuthServiceReturn = ReturnType<AuthService>