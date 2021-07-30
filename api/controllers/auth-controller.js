
const otpService = require('../services/otp-service')
const hashService = require('../services/hash-service');

class AuthController {
    async sendOtp(req, res) {
        const { phone } = req.body;
        if (!phone) {
            res.status(400).json({ message: 'Phone field is required!' });
        }

        // send OTP
        try {
            const otp = await otpService.generateOtp()
            const ttl = 1000 * 60 * 2; // 2 min
            const expires = Date.now() + ttl;
            const data = `${phone}.${otp}.${expires}`;
            const hash = hashService.hashOtp(data);
            await otpService.sendBySms(phone, otp);
            res.json({
                hash: `${hash}.${expires}`,
                phone,
                otp,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'message sending failed' });
        }
    }
    async sendOtp(req, res) {
        const { hash, otp, phone } = req.body;
        if (!hash || !otp || !phone) {
            res.status(400).json({ message: 'All fields required' })
        }

        const [hashOtp, expires] = hash.split('.')
        if (Date.now() > +expires) {
            res.status(400).json({ message: 'OTP expired' })
        }
        const data = `${phone}.${otp}.${expires}`;
        const isValid = await otpService.verifyOtp(hashOtp, data);
        if (!isValid) {
            res.status(400).json({ message: 'OTP Invalid' })
        }
    }
}

module.exports = new AuthController()