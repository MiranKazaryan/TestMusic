
//компонент карточки
function Image({ image,onImageClick }) {

  function handleImageClick(){
    onImageClick(image);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={image.link}
        alt={image.name}
        onClick={handleImageClick}
      />
      <div className="card__info">
        <h2 className="card__title">{image.name} </h2>
      </div>
    </li>
  );
}

export default Image;
