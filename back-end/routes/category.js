const express = require('express');
const shortid = require('shortid')
const path = require('path')
const multer = require('multer')
const router = express.Router()
const { addCategory, getCategory, updateCategory } = require('../controller/category');
const { requireLogin, middlewareForAdmin } = require('../middleware/middleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads/'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage })

router.post('/category/create', requireLogin, middlewareForAdmin, upload.single('categoryImage'), addCategory)
router.get('/category/get', getCategory)

router.post('/category/update', upload.array('categoryImage'), updateCategory);

module.exports = router;