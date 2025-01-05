const { compareSync } = require("bcryptjs");
const { userExistByMail, userExistById, userExistByToken, userExistByPhone, createTempToken, findTempTokenById, deleteTempTokenById } = require("../../services");
const { APIError } = require("../../utils/apiError");
const { CONSTANTS } = require("../../config");
const buildRes = require("../../utils/seeData")
const logger = require("../../logger");
const jwt = require("jsonwebtoken");
const config = require("../../config/env");
const { removeAuth } = require("../../utils/seeData");
const { META } = require("../../utils/actions");
const { default: mongoose } = require("mongoose");
const { isValidEmail, isPhoneNumberValid, shortIdGen } = require("../../utils/generator");

exports.login = async (req, res, next) => {
	try {
		let token = req.cookies?.leRn_iac;
		if (!token) token = req.headers?.authorization?.split(' ')[1];
		if (!token) token = req.headers?.cookie?.split('=')[1];
		const { email, password } = req.body;
		const exist = await userExistByMail(email.toLowerCase());
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
			return next(APIError.unauthenticated('Refresh token is required'));
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

exports.forgetPassword = async (req, res, next) => {
	try {
		 const info = {}
		 for (let key in req.body){
			info[key] = req.body[key];
			break;
		 }
		if(Object.keys(info).length === 0) return next(APIError.badRequest("Email or Phone is required"))
		if(!info) return next(APIError.badRequest("Email or phone is required"));
		if(info?.email && !isValidEmail(info?.email)) return next(APIError.badRequest("Invalid email"))
		let userExist = await userExistByMail(info?.email);
		if(info?.phone && !isPhoneNumberValid(info?.info)) return next(APIError.badRequest("Invalid Phone number"))
		if(!userExist) userExist = await userExistByPhone(info?.phone)
		if(!userExist) return next(APIError.notFound("Account not found"));
		logger.info("Account found", {service: META.AUTH})
		// generate token for recovery link
		payload = {
			id: userExist._id,
			accountId: userExist.accountId,
			type: userExist.type,  
			email: userExist.email,
		};
		const payload = jwt.sign(payload, config.TOKEN_SECRETE, {
			expiresIn:"10m",
		}); 
		const createTemp = await createTempToken({id: shortIdGen(20), token:payload, accountId:userExist._id});
		if(!createTemp) {
			logger.info("Token failed to create", {service: META.AUTH})
			return next(APIError.badRequest("Token failed to create"));
		}
		if(createTemp?.error) return next(APIError.badRequest(createTemp.error));
		logger.info("Token created successfully", {service: META.AUTH});
		// send recovery email
		res.status(200).json({msg: "Recovery email sent successfully"})
	} catch (error) {
		next(error)
	}
}
exports.verifyToken = async (req, res, next) => {
	try {
		const {id} = req.body;
		if(!id) return next(APIError.badRequest("Token is required"));
		// find token by id
		const tokenExist = await findTempTokenById(id);
		if(!tokenExist) return next(APIError.badRequest("Invalid recover Link"));
		if(tokenExist?.error) return next(APIError.badRequest(tokenExist.error));
		logger.info("Token retrieved successfully", {service: META.AUTH});
		jwt.verify(tokenExist.token, config.TOKEN_SECRETE, async(err, decode) =>{
			if(err){
				await deleteTempTokenById(id);
				return next(APIError.unauthorized("Link expired"))
			}
		});
		res.status(200).json({msg: "Link verified successfully"});
	} catch (error) {
		next(error)
	}
}
exports.resetPassword = async (req, res, next) => {
	try {
		const {id } = req.body;
		if(!id) return next(APIError.badRequest("Token is required"));
		// find token by id
		const tokenExist = await findTempTokenById(id);
		if(!tokenExist) return next(APIError.badRequest("Invalid recover Link"));
		if(tokenExist?.error) return next(APIError.badRequest(tokenExist.error));
		logger.info("Token retrieved successfully", {service: META.AUTH});
		jwt.verify(tokenExist.token, config.TOKEN_SECRETE, async(err, decode) =>{
			if(err){
				await deleteTempTokenById(id);
				return next(APIError.unauthorized("Link expired"))
			}
		});
		res.status(200).json({msg: "Link verified successfully"});
		// add strong password validator
	} catch (error) {
		next(error)
	}
}