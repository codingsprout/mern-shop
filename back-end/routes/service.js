const express = require('express');
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')
const router = express.Router()
const { createService, getServicesBySlug } = require('../controller/service');
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

router.post('/service/create', requireLogin, middlewareForAdmin, upload.array('servicePicture'), createService)

router.get('/services/:slug', getServicesBySlug)

module.exports = router;