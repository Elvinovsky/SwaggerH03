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
exports.devicesSessionsRepository = void 0;
const runDB_1 = require("../../database/runDB");
exports.devicesSessionsRepository = {
    testingDeleteAllSessions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield runDB_1.sessionsCollection.deleteMany({});
        });
    },
    findDeviceSession(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUsedToken = yield runDB_1.sessionsCollection.findOne({ refreshToken: token });
            return (!!isUsedToken);
        });
    },
    addDeviceSession(deviceSession) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield runDB_1.sessionsCollection.insertOne(deviceSession);
        });
    },
    rootedToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield runDB_1.sessionsCollection.updateOne({ refreshToken: token }, { $set: { isValid: false } });
            return result.matchedCount === 1;
        });
    }
};
