import axios from 'axios';

const HTTP = axios.create({
    baseURL: process.env.NODE_ENV !== 'development'
      ? 'http://kl-architects.co.il/'
      : 'http://localhost:3025'
  });

function sendEmail (emailData){
    console.log(emailData,'send email')
    return HTTP.post('/api/email', { emailData }).then(res => res.data);
}

export default {
    sendEmail
}