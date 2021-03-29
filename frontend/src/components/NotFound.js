import './NotFound.css';
import error404 from '../images/404.gif';

export default function NotFound() {
  return (
    <div className="notfound">
      <p className="notfound__text">Страница не найдена</p>
      <img className="notfound__image" src={error404} alt="Ошибка 404"/>
    </div>
  );
}