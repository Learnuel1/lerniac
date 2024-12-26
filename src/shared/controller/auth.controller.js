const { compareSync } = require("bcryptjs");
const { userExistByMail, userExistById, userExistByToken } = require("../../services");
const { APIError } = require("../../utils/apiError");
const { CONSTANTS } = require("../../config");
const buildRes = require("../../utils/seeData")
const logger = require("../../logger");
const jwt = require("jsonwebtoken");
const config = require("../../config/env");
const { removeAuth } = require("../../utils/seeData");
const { META } = require("../../utils/actions");
const { default: mongoose } = require("mongoose");

exports.login = async (req, res, next) => {
	try {
		let token = req.cookies?.len_iac;
		if (!token) token = req.headers?.authorization?.split(' ')[1];
		if (!token) token = req.headers?.cookie?.split('=')[1];
		const { email, password } = req.body;
		const exist = await userExistByMail(email);
		if (!exist) return next(APIError.notFound('User does not exist', 404));
		if (exist.error) return next(APIError.customError(exist.error, 400));
		if (!compareSync(password, exist.password))
			return next(APIError.badRequest('Incorrect password'));
    if(exist.type === CONSTANTS.ACCOUNT_TYPE_OBJ.student && exist.refreshToken.length !== 0) return next(APIError.unauthorized("You have an active session on another device, logout all device?"))
		const foundUser = await userExistByToken(token);
		if (token ) {
			jwt.verify(token, config.TOKEN_SECRETE, async (err, decoded) => {
				if (err) {
					const untrusted = await userExistById(decoded?.id);
          if(untrusted){
            untrusted.refreshToken = [];
            untrusted.save();

          }
				}
				if(decoded?.email === email) { 
					logger.info('Token reuse detected', { service: META.AUTH });
					return next(APIError.customError('You are already logged in', 403));
				}
			});
      return next(APIError.customError('You are already logged in', 403));
		}

		 
		let payload = {};
		payload = {
			id: exist._id,
			accountId: exist.accountId,
			type: exist.type, 
			firstName: exist.firstName,
			lastName: exist.lastName,
			email: exist.email,
		};

		const newToken = jwt.sign(payload, config.TOKEN_SECRETE, {
			expiresIn: `${req.body?.rememberMe ? '5m' : '5m'}`,
		});
		const newRefreshToken = jwt.sign(payload, config.REFRESH_TOKEN_SECRETE, {
			expiresIn: `${req.body?.rememberMe ? '7m' : '7m'}`,
		});
		 
		res.clearCookie('leRn_iac')
		let newRefreshTokenArray = [];
		if (token)
			newRefreshTokenArray = exist.refreshToken.filter(
				(rt) => rt !== token
			);
		else newRefreshTokenArray = exist.refreshToken;
		exist.refreshToken = [...newRefreshTokenArray, newRefreshToken];

		// connections.push({activeId: activeId, userId: payload.id});

		exist.save();
		const data =  buildRes.removeAuth(exist.toObject());
		logger.info('Login successful', { service: META.AUTH });
		const response = buildRes.reqResponse('login successful', data, 'user', {
			token:newToken,
			refreshToken: newRefreshToken,
		});
		res.cookie('leRn_iac', newToken, {
			httpOnly: false,
			secure: true,
			sameSite: 'none',
			// maxAge: 60 * 60 * 1000,
		});
		res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};


exports.logout = async (req, res, next) => {
	try { 
		const {refreshToken} = req.body;
		if (!refreshToken)
			return next(APIError.unauthenticated('You need to login first'));
		const isUser = await userExistByToken(refreshToken);
		if (!isUser) return next(APIError.unauthenticated());
		if (isUser?.error) return next(APIError.badRequest(isUser.error));
		const payload = jwt.decode(refreshToken, config.REFRESH_TOKEN_SECRETE);
		if (isUser.role === CONSTANTS.ACCOUNT_TYPE_OBJ.student) {
			isUser.refreshToken = [];
			isUser.save();
		} else {
			const refreshTokenArr = isUser.refreshToken.filter((rt) => rt !== refreshToken);
			isUser.refreshToken = [...refreshTokenArr];
			isUser.save();
		}
		logger.info('Logout successful', { service: META.AUTH });
		res.clearCookie('leRn_iac');
		res
			.status(200)
			.json({ success: true, msg: 'You have successfully logged out' });
	} catch (error) {
		// if (error.message === ERROR_FIELD.JWT_EXPIRED) next(APIError.unauthenticated());
		next(error);
	}
};
