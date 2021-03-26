import imgSuccess from '../images/success.svg';
import imgFailure from '../images/failure.svg';
import './InfoToolTip.css';

export default function InfoToolTip(props) {
  return (
    <section
      className={`popup${props.isOpen ? ' popup_visible' : ''}`}
      onClick={props.isLoading ? null : props.onClose}
    >
      <div className="infotooltip">
        {props.isLoading
          ? (
            <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#000">
              <g fill="none" fillRule="evenodd">
                <g transform="translate(1 1)" strokeWidth="2">
                  <circle strokeOpacity=".5" cx="18" cy="18" r="18"/>
                  <path d="M36 18c0-9.94-8.06-18-18-18">
                    <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/>
                  </path>
                </g>
              </g>
            </svg>
          )
          : (
            <img className="infotooltip__img"
              src={props.success ? imgSuccess : imgFailure}
              alt="Иконка результата"
            />
          )
        }
        <h2 className="infotooltip__title">{props.message}</h2>
        {props.isLoading ? null : <button className="popup__button-close" type="button"></button>}
      </div>
    </section>
  );
}
