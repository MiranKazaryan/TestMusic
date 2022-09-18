const Image = require("../models/image");
const BAD_REQUEST = require("../errors/BadRequesError");
const NOT_FOUND = require("../errors/NotFoundError");
const CONFLICT_ERROR = require("../errors/ConflictError");

// получение данных о пользователях
const getImages = (req, res, next) => {
  Image.find({})
    .then((img) => res.status(200).send(img))
    .catch(next);
};

// получение данных о пользователе
const getImage = (req, res, next) => {
  Image.findById(req.params.imageId)
    .orFail(() => {
      throw new NOT_FOUND("Image with id is not found");
    })
    .then((img) => {
      res.status(200).send(img);
    })
    .catch((e) => {
      if (e.name === "CastError") {
        next(new BAD_REQUEST("Uncorrect data"));
      } else {
        next(e);
      }
    });
};

const addComment = (req, res, next) => {
  Image.findByIdAndUpdate(
    req.params.imageId,
    { $push: { comments: req.body.comment } } // положить комментарий в массив
  )
    .orFail(() => {
      throw new NOT_FOUND("Card not found");
    })
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BAD_REQUEST("Data is not correct"));
      } else {
        next(err);
      }
    });
};

// создание карточки
const addImages = (req, res, next) => {
  const { arr } = req.body;
  Image.insertMany(arr)
    .then((card) => {
      res.status(200).send({ card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BAD_REQUEST("Data is not correct"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getImages,
  getImage,
  addComment,
  addImages,
};
