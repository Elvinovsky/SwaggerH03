import { check } from 'express-validator'

export const checkInputName =  check('name', )
    .trim()
    .isLength({min: 3, max: 15 })
    .withMessage({ message: "length should be no more than 15 characters", field: "name"})
    .bail()
    .isString()
    .withMessage({ message: "is not a string", field: "name"})
export const checkInputWebsiteUrl =  check('websiteUrl')
    .matches( /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
    .withMessage({ message: "is not a link to the site", field: "websiteUrl"})
    .bail()
    .isString()
    .withMessage({ message: "is not a string", field: "websiteUrl"})
    .isLength({min:10, max: 100 })
    .withMessage({ message: "must be at least 100 chars long", field: "websiteUrl"})
export const checkInputDescription =  check('description')
    .trim()
    .isLength({ min: 3, max: 500 })
    .withMessage({ message: "length should be no more than 500 characters", field: "description"})
    .bail()
    .isString()
    .withMessage({ message: "is not a string", field: "description"})
