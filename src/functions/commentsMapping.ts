import {WithId} from "mongodb";
import {CommentViewModel} from "../models/modelsComment/comment-view";
import {CommentDBModel} from "../models/modelsComment/comment-input";

export const commentsMapping = (array: Array<WithId<CommentDBModel>>): CommentViewModel[] =>{
    return array.map((el) => {
        return {
            id: el._id.toString(),
            content: el.content,
            commentatorInfo: {
                userId: el.commentatorInfo.userId,
                userLogin: el.commentatorInfo.userLogin
            },
            createdAt: el.createdAt
        }
    })
}
export const commentMapping = (comment: WithId<CommentDBModel> ): CommentViewModel => {
    return {
        id: comment._id.toString(),
        content: comment.content,
        commentatorInfo: {
            userId: comment.commentatorInfo.userId,
            userLogin: comment.commentatorInfo.userLogin
        },
        createdAt: comment.createdAt
    }
}