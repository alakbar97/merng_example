const { AuthenticationError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/check_auth");
const { PUB_SUB } = require("../../utils/constants");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);

        if (!post) throw new Error("Post not found");

        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      if (!body.trim()) throw new Error("Post body cannot be empty");

      const user = checkAuth(context);

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      context.pubsub.publish(PUB_SUB.NEW_POST, {
        newPost: post,
      });

      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);

        if (user.username === post.username) {
          await post.delete();
          return "Deleted Post";
        }

        throw new AuthenticationError("Action not allowed");
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(PUB_SUB.NEW_POST),
    },
  },
};
