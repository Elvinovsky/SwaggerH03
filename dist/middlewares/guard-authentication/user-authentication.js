"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenAuthentication = exports.userAuthentication = void 0;
const jwt_service_1 = require("../../application/jwt-service");
const users_service_1 = require("../../domains/users-service");
const users_db_repository_1 = require("../../repositories/db/users-db-repository");
exports.userAuthentication = ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        res.sendStatus(401);
        return;
    }
    const token = (req.headers.authorization).split(' ')[1];
    const userId = yield jwt_service_1.jwtService.getUserIdByAccessToken(token);
    if (userId) {
        req.userView = yield users_service_1.usersService.findUserById(userId);
        next();
    }
    else {
        res.status(401).send('Authentication required.'); // custom message
        return;
    }
}));
exports.refreshTokenAuthentication = ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
        return res.sendStatus(401);
    }
    const searchDeviceIdInDevicesSessions = yield jwtDbRepository.findTokenByUserId(refreshToken);
    if (searchTokenInTokenList) {
        return res.sendStatus(401);
    }
    const userId = yield jwt_service_1.jwtService.getUserIdByRefreshToken(refreshToken);
    if (userId) {
        const usedToken = {
            userId: userId,
            refreshToken: refreshToken
        };
        yield jwtDbRepository.addTokenRepo(usedToken);
        req.userDB = yield users_db_repository_1.usersRepository.findUserById(userId);
        return next();
    }
    else {
        return res.status(401).send('Authentication required.'); // custom message
    }
}));
