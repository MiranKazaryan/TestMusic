import { useState } from "react";
import Comments from "./Comments";

//компонент для открытия картинки
function ImagePopup({
  image,
  onImageClick,
  comments,
  onClose,
  handleOverlayClose,
  onSubmit,
}) {
  const [comment, setComment] = useState("");

  function handleCloseImgPopup(e) {
    handleOverlayClose(e);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(comment, image._id);
    setComment("");
  }
  return (
    <section
      className={`popup popup_view ${image.link && "popup_opened"}`}
      onClick={handleCloseImgPopup}
    >
      <div className="popup__area">
        <div className="popup__area-img">
          <img className="popup__image" alt={image.name} src={image.link} />
          <p className="popup__view-title">{image.name}</p>
        </div>
        <div className="popup__area-comments">
          <form onSubmit={handleSubmit} className="popup__form">
            <input
              className="popup__input"
              id=""
              name=""
              value={comment}
              onChange={({ target }) => setComment(target.value)}
              placeholder="Комментарий..."
              required={true}
              minLength={1}
            />
            <button type="submit" className="popup__add-button"></button>
          </form>
          <ul className="comments">
            {comments.map((com, key) => (
              <Comments comment={com} key={com._id || key} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ImagePopup;
