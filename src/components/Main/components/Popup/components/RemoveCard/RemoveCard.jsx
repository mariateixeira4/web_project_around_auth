export default function RemoveCard({ onConfirm }) {
  return (
    <button className="popup__button" type="button" onClick={onConfirm}>
      Sim
    </button>
  );
}
