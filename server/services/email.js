const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const handlebars = require('handlebars');
const fs = require('fs')
const path = require('path')

const templateConfig = require('../config/email');


const applicationHost = process.env.APPLICATION_HOST

function getCompiledTemplate(template){
    const emailTemplate = fs.readFileSync(path.join(__dirname, template), "utf-8");
    const compiledTemplate = handlebars.compile(emailTemplate);
    return compiledTemplate;
}

exports.sendVerificationEmail = function(user,code){
    console.log(`Debug: Sending verification code: ${code} `)
    const fullName = user.firstName || user.lastName;
    console.log(fullName);
    const compiledTemplate = getCompiledTemplate(templateConfig.confirmEmail.template)
    const messageBody = (compiledTemplate({
        host:applicationHost,
        fullName:fullName, 
        code: code
      }));
    sendMail(user.email,templateConfig.confirmEmail.subject,messageBody);
}

exports.sendResetPasswordEmail = function (user,code){
    console.log(`Debug: Sending reset password code: ${code} `)
    const fullName = user.firstName || user.lastName;
    const compiledTemplate = getCompiledTemplate(templateConfig.resetPassword.template)
    const messageBody = (compiledTemplate({
        host:applicationHost,
        fullName:fullName, 
        code: code
      }));
    sendMail(user.email,templateConfig.resetPassword.subject,messageBody);
}

async function sendMail(to,subject,messageBody,attachment){
    try{
        const email = {
            to: to, 
            from: process.env.SENDGRID_SENDER_EMAIL, 
            subject: subject,
            html: messageBody,
          }
        if(attachment != undefined){
            const attachment_content = Buffer.from(attachment).toString('base64');
            email["attachments"] = [
                {
                  content:  attachment_content,
                  filename: "transcript.txt",
                  type: "application/txt",
                  disposition: "attachment"
                }
            ];

        }
        sgMail.send(email);
        console.log("email sent")
    }
    catch(e){
        console.log('Email service ERROR: ' + e.message, JSON.stringify(e, null, 2));
    }
}