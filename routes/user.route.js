const { Router } = require("express");
const { userController } = require("../controllers/user.controller");
const  {auth}  = require('../middlewares/checkAuth.js')
const {registerValidator } = require('../validator/validation')
const router = Router();

router.post("/auth", registerValidator, userController.registerUser); // Роут регистрации пользователя
router.post("/login", registerValidator,   userController.login); // Вход в учетную запись
router.get("/getMe", auth,   userController.getMe)

module.exports = router;