const userController = require('../controllers/user');
const {GraphQLUpload} = require('graphql-upload');
const followController = require('../controllers/follow');
const publicationController = require('../controllers/publication');
const commentController = require('../controllers/comment');
const likeController = require('../controllers/like');

const resolver = {
    Upload: GraphQLUpload,
    Query:{
        //User
        getUser: (_, {id, username})=> userController.getUser(id, username),
        search: (_, { search }) => userController.search(search),

        //Follow
        isFollow: (_, {username}, ctx) => followController.isFollow(username,ctx),
        getFollowers: (_,{username}) => followController.getFollowers(username),
        getFolloweds: (_,{username}) => followController.getFolloweds(username),
        getNotFolloweds: (_,{}, ctx) => followController.getNotFolloweds(ctx),
        //Publication
        getPublication: (_,{username}) => publicationController.getPublication(username),
        getPublicationFolloweds: (_,{},ctx) => publicationController.getPublicationFolloweds(ctx),
        //Comment
        getComments: (_,{idPublication}) => commentController.getComments(idPublication),


        //Like
        isLike: (_,{idPublication}, ctx) => likeController.isLike(idPublication,ctx),
        countLike: (_,{idPublication}) => likeController.countLike(idPublication),
    },
    Mutation:{
        //User
        register: (_, {input}) => userController.register(input),
        login: (_, {input}) => userController.login(input),
        updateAvatar: (_,{file}, ctx) => userController.updateAvatar(file, ctx),
        deleteAvatar: (_,{}, ctx) => userController.deleteAvatar(ctx),
        updateUser: (_,{input},ctx) => userController.updateUser(input,ctx),
    

        //Follow
        follow:(_,{username}, ctx) => followController.follow(username, ctx),
        unFollow:(_,{username}, ctx) => followController.unFollow(username, ctx),
    
        //publish
        publish:(_,{file}, ctx) => publicationController.publish(file, ctx),
    
        //Comment
        addComment: (_,{input}, ctx) => commentController.addComment(input, ctx),
    
        //Like
        addLike:(_, {idPublication}, ctx) => likeController.addLike(idPublication, ctx),
        deleteLike:(_, {idPublication}, ctx) => likeController.deleteLike(idPublication, ctx),
    }
    ,
};

module.exports = resolver;