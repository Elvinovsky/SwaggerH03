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
exports.postQueryRepository = void 0;
const runDB_1 = require("../../database/runDB");
const postsMapping_1 = require("../../functions/postsMapping");
const pagination_helpers_1 = require("../../helpers/pagination-helpers");
const commentsMapping_1 = require("../../functions/commentsMapping");
exports.postQueryRepository = {
    returnOfAllPosts(searchTitleTerm, pageNumber, pageSize, sortBy, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            if (searchTitleTerm) {
                filter.title = { $regex: searchTitleTerm, $options: 'i' };
            }
            const calculateOfFiles = yield runDB_1.postsCollection.countDocuments(filter);
            const foundPosts = yield runDB_1.postsCollection
                .find(filter)
                .sort({ [(0, pagination_helpers_1.getSortBy)(sortBy)]: (0, pagination_helpers_1.getDirection)(sortDirection), [pagination_helpers_1.DEFAULT_PAGE_SortBy]: (0, pagination_helpers_1.getDirection)(sortDirection) })
                .skip((0, pagination_helpers_1.getSkip)((0, pagination_helpers_1.getPageNumber)(pageNumber), (0, pagination_helpers_1.getPageSize)(pageSize)))
                .limit((0, pagination_helpers_1.getPageSize)(pageSize)).toArray();
            return {
                pagesCount: (0, pagination_helpers_1.pagesCountOfBlogs)(calculateOfFiles, pageSize),
                page: (0, pagination_helpers_1.getPageNumber)(pageNumber),
                pageSize: (0, pagination_helpers_1.getPageSize)(pageSize),
                totalCount: calculateOfFiles,
                items: (0, postsMapping_1.postsMapping)(foundPosts)
            };
        });
    },
    searchCommentsByPostId(postId, pageNumber, pageSize, sortBy, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            const postIdForPost = yield runDB_1.feedbacksCollection.findOne({ postId: postId }); //express validator .custom
            if (!postIdForPost) {
                return null;
            }
            const calculateOfFiles = yield runDB_1.feedbacksCollection.countDocuments({ postId });
            const foundComments = yield runDB_1.feedbacksCollection
                .find({ postId })
                .sort({ [(0, pagination_helpers_1.getSortBy)(sortBy)]: (0, pagination_helpers_1.getDirection)(sortDirection), [pagination_helpers_1.DEFAULT_PAGE_SortBy]: (0, pagination_helpers_1.getDirection)(sortDirection) })
                .skip((0, pagination_helpers_1.getSkip)((0, pagination_helpers_1.getPageNumber)(pageNumber), (0, pagination_helpers_1.getPageSize)(pageSize)))
                .limit((0, pagination_helpers_1.getPageSize)(pageSize)).toArray();
            return {
                pagesCount: (0, pagination_helpers_1.pagesCountOfBlogs)(calculateOfFiles, pageSize),
                page: (0, pagination_helpers_1.getPageNumber)(pageNumber),
                pageSize: (0, pagination_helpers_1.getPageSize)(pageSize),
                totalCount: calculateOfFiles,
                items: (0, commentsMapping_1.commentsMapping)(foundComments)
            };
        });
    }
};
