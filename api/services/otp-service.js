const crypto = require('crypto')
const hashService = require('./hash-service')

var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console

const twilioClient = require('twilio')(accountSid, authToken, {
    lazyLoading: true
});
class OtpService {

    generateOtp() {
        const otp = crypto.randomInt(1000, 9999)
        return otp
    }

    async sendBySms(to, otp) {
        return await twilioClient.messages.create({
            to,
            from: process.env.SMS_FROM_NUMBER,
            body: `Your developer house otp is ${otp}`
        })
    }

    verifyOtp(hash, data) {
        const computedHash = hashService.hashOtp(data)
        return computedHash === hash
    }
}

module.exports = new OtpService()