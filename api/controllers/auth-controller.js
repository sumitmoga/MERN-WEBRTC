
const otpService = require('../services/otp-service')
const hashService = require('../services/hash-service');
const userService = require('../services/user-service');
const tokenService = require('../services/token-service');
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
    async verifyOtp(req, res) {
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

        let user;
        try {
            user = await userService.findUser({ phone });
            if (!user) {
                user = await userService.createUser({ phone });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Db error' });
        }
        const { accessToken, refreshToken } = tokenService.generateTokens({
            _id: user._id,
            activated: false,
        });
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });
        res.json({ accessToken });
    }
}

module.exports = new AuthController()