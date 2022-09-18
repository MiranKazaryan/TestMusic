import Image from '../components/Image';

function Main({images, onImageClick}) {

  return (
<section className="photo-grid">
<ul className="cards">
          {images.map((img,key) => (
            <Image
              image={img}
              key={img._id || key}
              onImageClick={onImageClick}
            />
          ))}
        </ul>
      </section>
  );
}

export default Main;
