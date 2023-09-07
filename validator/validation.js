const { body } = require('express-validator');

module.exports.registerValidator = [
  body('email', 'неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
  body('avatarURL', 'Ссылка не поддерживается').optional().isURL()
];

module.exports.postValidator = [
  body('title', 'Введите заголовок статьи').isLength({ min: 1 }).isString(),
  body('text', 'Введите текст статьи').isLength({ min: 1 }),
  body('tags', 'Неверный формат тэгов (укажите массив)').optional().isArray(),
  body('imageURL', 'Неверная ссылка на изображение').optional().isURL()
];
