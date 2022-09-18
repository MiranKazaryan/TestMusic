
function Header({onClick}) {
  return (
    <header className="header">
      <h2 className="header__title">Музыкальные инструменты</h2>
      <button onClick={onClick} className="header__button">Добавить инструменты</button>
    </header>
  );
}

export default Header;
