import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import { constants } from "../constants/constants";
import { useEffect, useState } from "react";
import { api } from "../utils/Api";

function App() {
  const [selectedImage, setSelectedImage] = useState({});
  const [images, setImages] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [comments, setComments] = useState([]);

  //хук получения изображений
  useEffect(() => {
    api
      .getInitialImages()
      .then((imgs) => {
        setImages(imgs);
        setClicked(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [clicked]);

  //закрытие попапов
  function closePopup() {
    setSelectedImage({});
  }
  //функция клика по оверлею
  function handleOverlayClose(e) {
    if (e?.target.classList.contains("popup")) {
      closePopup();
    }
  }
  //отслеживание клика на Esc
  useEffect(() => {
    function handleEscapeKey(e) {
      if (e.key === "Escape") {
        closePopup();
      }
    }
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);
  //отслеживание нажатой картинки
  function handleImageClick(image) {
    setSelectedImage(image);
    handleOpenImage(image._id);
  }
  //добавление комментария
  function handleAddComment(comment, id) {
    setComments((comments) => {
      comments.push(comment);
      return comments;
    });
    api
      .addComment(comment, selectedImage._id)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }
  //добавление фотографий по кнопке из константы
  function handleAddImages() {
    api
      .addImages(constants)
      .then(() => {
        setClicked(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //открытие картинки
  function handleOpenImage(id) {
    api
      .getImage(id)
      .then((com) => {
        setComments(com.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="page">
      <Header onClick={handleAddImages} />

      <Main onImageClick={handleImageClick} images={images} />

      <Footer />

      <ImagePopup
        image={selectedImage}
        onImageClick={handleOpenImage}
        comments={comments}
        onClose={closePopup}
        handleOverlayClose={handleOverlayClose}
        onSubmit={handleAddComment}
      />
    </div>
  );
}

export default App;
