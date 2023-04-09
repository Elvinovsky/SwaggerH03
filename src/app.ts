import express, {Request, Response} from "express";
import {postsRouter} from "./routers/posts-router";
import {blogsRouter} from "./routers/blogs-router";
import {deleteAllDataRouter} from "./routers/Testing-DB-Delete-router";
import {usersRouter} from "./routers/users-router";
import {authRouter} from "./routers/auth-router";
import {feedBacksRouter} from "./routers/feedbacks-router";

const jsonBodyMiddleware = express.json()
const app = express()

app.use(jsonBodyMiddleware)
app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!!')
})
app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/posts', postsRouter)
app.use('/blogs', blogsRouter)
app.use('/comments', feedBacksRouter)
app.use('/testing', deleteAllDataRouter)

const startServer = () => {
    const port = process.env.PORT || 3005;
    app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        })
};

export { app, startServer };




