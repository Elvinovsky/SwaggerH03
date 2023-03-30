import express, {Request, Response} from "express";
import {postsRouter} from "./routers/posts-router";
import {blogsRouter} from "./routers/blogs-router";
import {deleteAllDataRouter} from "./routers/Testing-DB-Delete-router";

const jsonBodyMiddleware = express.json()
const app = express()

app.use(jsonBodyMiddleware)
app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!!')
})
app.use('/posts', postsRouter)
app.use('/blogs', blogsRouter)
app.use('/testing', deleteAllDataRouter)

export {app};
