export default function Popup(props) {
  const { onClose, title, children, type } = props;

  return (
    <div className="popup popup_opened">
      <div
        className={`popup__container ${
          !title
            ? "popup__container_type_image"
            : type === "confirm"
              ? "popup__container_type_confirm"
              : ""
        }`}
      >
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>

        {title && <h3 className="popup__title">{title}</h3>}

        {children}
      </div>
    </div>
  );
}
