import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/db/blogs-db-repository";
import {postsRepository} from "../repositories/db/posts-db-repository";
import {usersRepository} from "../repositories/db/users-db-repository";
import {feedBacksRepository} from "../repositories/db/feedbacks_repository";

export const deleteAllDataRouter = Router();

deleteAllDataRouter.delete('/all-data', async (req: Request, res: Response) => {
    await blogsRepository.testingDeleteAllBlogs()
    await postsRepository.testingDeleteAllPosts()
    await usersRepository.testingDeleteAllUsers()
    await feedBacksRepository.testingDeleteAllComments()
    res.send(204)
    return;
})