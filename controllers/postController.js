const Post = require("../models/Post.model");

module.exports.postController = {
  getNews: async (req, res) => {
    try {
      const data = await Post.find({}).populate("user").exec();
      res.json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getNewsById: async (req, res) => {
    try {
      const postId = req.params.id;
      const data = await Post.findByIdAndUpdate(
        postId,
        { $inc: { viewsCount: 1 } },
        { returnDocument: "after" }
      );

      if (!data) {
        return res.status(403).json({ error: "Invalid user." });
      }

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Не удалось вернуть статью" });
    }
  },

  getNewsByIdCategory: async (req, res) => {
    try {
      const data = await Post.find({ category: req.params.categoryId });
      res.json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  addNews: async (req, res) => {
    const { title, text, category, imageURL} = req.body;
    try {
      const news = await Post.create({
        user: req.user,
        title,
        text,
        category,
        imageURL
      });
      res.json(news);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteNews: async (req, res) => {
    try {
      await Post.findByIdAndRemove(req.params.id);
      res.json("Новость удалена");
    } catch (err) {
      res.status(500).json("Произошла ошибка при удалении новости");
    }
  },

  editNews: async (req, res) => {
    const { title, text, imageURL } = req.body;
    try {
      const data = await Post.findByIdAndUpdate(
        req.params.id,
        { title, text, imageURL }, // Update the 'text' field
        { new: true } // Return the updated document
      );
      res.json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
