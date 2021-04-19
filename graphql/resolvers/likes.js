const { UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/check_auth");

module.exports = {
  Mutation: {
    likePost: async (_, { postId }, context) => {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);

      if (post) {
        const foundLike = post.likes.find((like) => like.username === username);

        if (foundLike) {
          post.likes = post.likes.filter((like) => like.username !== username);
          await post.save();

          return post;
        }

        post.likes.push({
          username,
          createdAt: new Date().toISOString(),
        });

        await post.save();

        return post;
      }

      throw new UserInputError("Post not found");
    },
  },
};
