//компонент для открытия картинки
function Comments({ comment }) {
  return (
    <li className="comment">
      <h2 className="comment__paragraph">{comment}</h2>
    </li>
  );
}

export default Comments;
