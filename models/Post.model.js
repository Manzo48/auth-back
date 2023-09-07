const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    title: {
      type: String,
      requred: true,
    },
    text: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    comments: {
        type: Array,
        default: [],

    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
    },
    imageURL: String,
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
