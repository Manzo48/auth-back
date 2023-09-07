const { Router } = require("express");
const { postController } = require("../controllers/postController");
const { auth } = require("../middlewares/checkAuth.js");
const { postValidator } = require("../validator/validation");
const router = Router();

router.post("/post", auth, postController.addNews);
router.delete("/post/:id", postValidator, auth, postController.deleteNews);
router.patch("/post/:id", postValidator, auth, postController.editNews);
router.get("/post/:id", postValidator, auth, postController.getNewsById);
router.get("/post", postController.getNews);

module.exports = router;
