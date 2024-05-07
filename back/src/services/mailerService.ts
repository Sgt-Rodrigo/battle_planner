// import { MAILER_PORT, MAIL_APP_PASS, SERVER_MAIL } from "../config/envs";

// const nodemailer = require('nodemailer');

// type Email = {
//     email: string, 
//     subject: string,
//     usrName: string,
//     password: string
// }

// const transporter = nodemailer.createTransport({
//     service:'gmail',
//     port: MAILER_PORT,
//   secure: false,
//     auth:{
//         user:SERVER_MAIL,
//         pass: MAIL_APP_PASS
//     }
// })





// export default function sendConfirmedRegistEmail({email, subject, usrName, password}:Email){

//     const server_message = `
// <h1>Welcome to Our Service!</h1>
//         <p>Dear ${usrName},</p>
//         <p>Thank you for registering. Here are your login details:</p>
//         <ul>
//             <li>Username: ${usrName}</li>
//             <li>Password: ${password}</li>
//         </ul>
//         <p>Please keep this information safe.</p>
//         <p>Best regards,</p>
//         <p>Your Service Team</p>
// `
    
//     const mailConfig = {
//         from: SERVER_MAIL,
//         to: email,
//         subject: subject,
//         html: server_message
//     }

//     return new Promise((resolve, reject)=>{

//         transporter.sendMail(mailConfig, (error:any, info:any)=>{
//             if(error){
//                 console.log(error);
//                 return reject({message:'An error ocurred'})
//             }

//             return resolve({message:'Email sent successfully'});
//     });

//     })
// }