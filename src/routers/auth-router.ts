import {Response, Router} from "express";
import {RequestInputBody} from "../types/req-res-types";
import {usersService} from "../domains/users-service";
import {LoginInput} from "../models/modelsUsersLogin/login-input";
import {validatorInputAuthRout} from "../middlewares/body-validator/check-bodyUser";
import {jwtService} from "../application/jwt-service";
import {userAuthentication} from "../middlewares/guard-authentication/user-authentication";
import {usersQueryRepository} from "../repositories/queryRepository/users-query-repository";


export const authRouter = Router()

authRouter.post('/login',validatorInputAuthRout,
    async (req: RequestInputBody<LoginInput>,
           res: Response) => {
    const user = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)
        if(user) {
            const token = await jwtService.createJWT(user)
            res.status(200).send(token)
        } else {
            res.sendStatus(401)
            return;
        }
    })
authRouter.get('/me',userAuthentication,
    async (req: RequestInputBody<LoginInput>,
           res: Response) => {
        const user = await usersQueryRepository.getUserInfo(req.user!.id)
        if(user) {
            res.send(user)
            return
        }
    })