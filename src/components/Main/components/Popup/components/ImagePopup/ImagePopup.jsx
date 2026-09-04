export default function ImagePopup(props) {
  const { card } = props;

  return (
    <figure className="popup__figure">
      <img className="popup__image" src={card.link} alt={card.name} />
      <figcaption className="popup__caption">{card.name}</figcaption>
    </figure>
  );
}
