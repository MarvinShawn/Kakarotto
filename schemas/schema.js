
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    GraphQLSchema
} from "graphql"
import { HotModel, ImageModel, NewModel, TextModel } from "../models"

const QiushiItemType = new GraphQLObjectType({
    name: 'QiushiItem',
    fields: {
        tag: {
            type: GraphQLString
        },
        comments: {
            type: GraphQLInt
        },
        likes: {
            type: GraphQLInt
        },
        contentText: {
            type: GraphQLString
        },
        nickname: {
            type: GraphQLString
        },
        avatar: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        gender: {
            type: GraphQLBoolean
        },
        contentImg: {
            type: GraphQLString
        },
        ratio: {
            type: GraphQLFloat
        }
    }
})

const PageInfoType = new GraphQLObjectType(
    {
        name: 'pageInfo',
        description: 'page info items',
        fields: () => ({
            totalPages: {
                type: GraphQLInt
            },
            currentPage: {
                type: GraphQLInt
            },
            pageItems: {
                type: GraphQLInt
            },
            rows: {
                type: new GraphQLList(QiushiItemType)
            }
        }),
    }
)


const helper = (model) => {
    return {
        type: PageInfoType,
        args: {
            page: {
                name: "page",
                type: GraphQLInt
            },
            pageNum: {
                name: "pageNum",
                type: GraphQLInt
            }
        },
        resolve: async (root, params) => {
            const totalCount = await model.count()
            var totalPageNum = 0;
            if (params.pageNum > 0) {
                totalPageNum = Math.ceil(totalCount / params.pageNum)
            } else {
                totalPageNum = Math.ceil(totalCount / 10)
            }
            const h = await model.find({}).limit(params.pageNum > 0 ? params.pageNum : 10).skip(params.pageNum * (params.page - 1));
            return {
                totalPages: totalPageNum,
                currentPage: params.page,
                pageItems: params.pageNum,
                rows: h
            };
        }
    }
}

export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        description: "Qiushibaike",
        fields: () => ({
            hots: helper(HotModel),
            news: helper(NewModel),
            images: helper(ImageModel),
            texts: helper(TextModel)
        })
    })
})




