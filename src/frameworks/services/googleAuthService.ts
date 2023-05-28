import { google } from "googleapis";
import configKeys from '../../config';


export const googleAuthService = () => {

    const verify = async (token: string) => {
        const user={
            userName:"",
            email:"",
            isGoogleUser:true,
            isverified:true

        }
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: token });
      
        const userinfo = google.oauth2({
          auth: oauth2Client,
          version: 'v2'
        });
        const res = await userinfo.userinfo.get();
        const userDetails = res.data;
        if(userDetails?.given_name&&userDetails.family_name&&userDetails.email){
            user.userName = userDetails.given_name
            user.email = userDetails.email
        }
        return user
    }

    return {
        verify
    }   
}

export type GoogleAuthService = typeof googleAuthService