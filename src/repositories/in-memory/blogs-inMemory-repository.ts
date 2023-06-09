import {inMemory} from "../../database/in-memory";
import {BlogView} from "../../models/modelsBlogs/blog-view";

//
// export const blogsRepository = {
//     //тестовое удаление базы данных о блогах.
//     async testingDeleteAllBlogs() {
//         return inMemory.allBlogs = []
//     },
//     //все существующие блоги.
//     async returnOfAllBlogs(): Promise<BlogView[]> {
//        return inMemory.allBlogs
//     } ,
//     //создание и добавление нового блога.
//     async addNewBlog(name: string, description: string, websiteUrl: string,): Promise <BlogView> {
//         const createBlog: BlogView = {
//             id:	(+(new Date())).toString(),
//             name: name,
//             description: description,
//             websiteUrl: websiteUrl,
//             createdAt: new Date().toISOString(),
//             isMembership: false
//         }
//         inMemory.allBlogs.push(createBlog)
//         return createBlog;
//     },
//     //поиск и возврат блога по ID.
//     async findBlogById(id: string): Promise <BlogView | undefined> {
//         return  inMemory.allBlogs.find(el => el.id === id)
//     },
//     //обновление блога по айди.
//     async updateBlogById(id: string, name: string, description: string, websiteUrl: string): Promise <boolean> {
//         if (await this.findBlogById(id)) {
//             inMemory.allBlogs.forEach(el => {
//                 el.name = name
//                 el.description = description
//                 el.websiteUrl = websiteUrl
//             })
//             return true;
//         }
//         return false;
//     },
//     //поиск блога по ID для удаления.
//     async searchBlogByIdDelete(id: string): Promise <boolean> {
//         const index = inMemory.allBlogs.findIndex(b => b.id === id)
//         if (index > -1) {
//             inMemory.allBlogs.splice(index, 1)
//             return true;
//         }
//         return false;
//     }
// }
