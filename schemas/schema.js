
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    GraphQLSchema
} from "graphql"
import { QiushiItemModel } from "../models"

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
                type: GraphQLInt,
                description: "total pages"
            },
            currentPage: {
                type: GraphQLInt,
                description: "current page"
            },
            pageItems: {
                type: GraphQLInt,
                description: "items per page"
            },
            rows: {
                type: new GraphQLList(QiushiItemType),
                description: "items array"
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
                type: GraphQLInt,
                description: "request page"
            },
            pageNum: {
                name: "pageNum",
                type: GraphQLInt,
                description: "request page number"
            },
            type: {
                name: "qiushi type",
                type: GraphQLInt,
                description: "0->hot 1->24hours 2->hot image 3->text 4->chuanyue 5->qiutu 6->fresh"
            }
        },
        resolve: async (root, params) => {
            const totalCount = await model.find({ "type": params.type }).count();
            var totalPageNum = 0;
            if (params.pageNum > 0) {
                totalPageNum = Math.ceil(totalCount / params.pageNum);
            } else {
                totalPageNum = Math.ceil(totalCount / 10);
            }
            const h = await model.find({ "type": params.type }).sort({ "_id": -1 }).limit(params.pageNum > 0 ? params.pageNum : 10).skip(params.pageNum * (params.page - 1));
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
            items: helper(QiushiItemModel)
        })
    })
})




