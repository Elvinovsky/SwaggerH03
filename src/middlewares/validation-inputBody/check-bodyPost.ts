import { check } from 'express-validator'
import {postsRepository} from "../../repositories/db/posts-db-repository";


export const checksTitle =  check('title', )
    .exists()
    .trim()
    .isLength({min: 3, max: 30 })
    .withMessage({ message: "length should be no more than 30 characters", field: "title"})
    .isString()
    .withMessage({ message: "is not a string", field: "title"})
export const checksShortDescription =  check('shortDescription')
    .exists(undefined)
    .trim()
    .isLength({min:10, max: 100 })
    .withMessage({ message: "must be at least 100 chars long", field: "shortDescription"})
    .isString()
    .withMessage({ message: "is not a string", field: "shortDescription"})
export const checksContent =  check('content')
    .exists()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage({ message: "length should be no more than 1000 characters", field: "content"})
    .isString()
    .withMessage({ message: "is not a string", field: "content"})
export const checksBlogId =  check('blogId')
    .exists()
    .isString()
    .withMessage({ message: "is not a string", field: "blogId"})
    .custom(async (blogId) => {
        const validationBlogId = await postsRepository.searchBlogIdForPost(blogId)
        if (!validationBlogId) {
            throw new Error('blogId not found');
        }
    });


