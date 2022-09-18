const router = require('express').Router();

const {
  getImages,  getImage, addComment, addImages
} = require('../controllers/images');

router.get('/images', getImages);
router.post('/images',addImages)
router.get('/images/:imageId', getImage);
router.post('/images/:imageId/comments', addComment);


module.exports = router;
