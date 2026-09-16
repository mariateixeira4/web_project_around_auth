import "./InfoTooltip.css";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`info-tooltip ${isOpen ? "info-tooltip_opened" : ""}`}>
      <div className="info-tooltip__container">
        <button
          className="info-tooltip__close"
          type="button"
          onClick={onClose}
          aria-label="Fechar"
        />

        <div
          className={`info-tooltip__icon ${
            isSuccess
              ? "info-tooltip__icon_success"
              : "info-tooltip__icon_error"
          }`}
        />

        <h2 className="info-tooltip__message">
          {isSuccess
            ? "Vitória! Você precisa se registrar."
            : "Ops, algo saiu deu errado! Por favor, tente novamente."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
