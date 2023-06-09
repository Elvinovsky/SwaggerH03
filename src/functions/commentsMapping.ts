import { WithId } from "mongodb";
import { CommentViewModel } from "../models/modelsComment/comment-view";
import { CommentDBModel } from "../models/modelsComment/comment-input";
import {
    likesAndDisCount
} from "../helpers/like-helpers";
import { likesQueryRepo } from "../compositions-root";

export const commentsMapping = ( array: Array<WithId<CommentDBModel>>, userId?: string ): Promise<CommentViewModel[]> => {

    return Promise
        .all(array.map(async( el ) => {

            const status = await likesQueryRepo.getLikeStatusCurrentUser(el._id,
                userId)

            const countsLikeAndDis = await likesAndDisCount(el._id)

            return {
                id: el._id.toString(),
                content: el.content,
                commentatorInfo: {
                    userId: el.commentatorInfo.userId,
                    userLogin: el.commentatorInfo.userLogin
                },
                likesInfo: {
                    likesCount: countsLikeAndDis.likes,
                    dislikesCount: countsLikeAndDis.disLikes,
                    myStatus: status
                },
                createdAt: el.createdAt
            }
        }))
}

export const commentMapping = async( comment: WithId<CommentDBModel>, userId?: string ): Promise<CommentViewModel> => {

    const status = await likesQueryRepo.getLikeStatusCurrentUser(comment._id,
        userId)

    const countsLikeAndDis = await likesAndDisCount(comment._id)

    return {
        id: comment._id.toString(),
        content: comment.content,
        commentatorInfo: {
            userId: comment.commentatorInfo.userId,
            userLogin: comment.commentatorInfo.userLogin
        },
        likesInfo: {
            likesCount: countsLikeAndDis.likes,
            dislikesCount: countsLikeAndDis.disLikes,
            myStatus: status
        },
        createdAt: comment.createdAt
    }
}