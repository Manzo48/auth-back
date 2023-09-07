require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require('multer')
const registerValidator = require('./validator/validation')
const {auth} = require('./middlewares/checkAuth')
const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use(require('./routes/user.route'));
app.use(require('./routes/post.route'));
app.use(require('./routes/comment.route'))

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads")
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  }
});
const upload = multer({storage})
app.post('/upload', auth,  upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})


mongoose
  .connect(
    process.env.MONGO,

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Успешно соединились с сервером MongoDB"))
  .catch(() => console.log("Ошибка при соединении с сервером MongoDB"));

app.listen(process.env.PORT, () => {
  console.log(`Сервер запущен успешно на порте ${process.env.PORT}`);
});