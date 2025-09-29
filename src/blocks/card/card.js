const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");

export function createCardElement(data, onDelete, onLike, onPhotoClick) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardElement.querySelector(".card__title").textContent = data.name;

  deleteButton.addEventListener("click", onDelete);
  cardElement.addEventListener("click", onLike);
  cardElement.addEventListener("click", onPhotoClick);
  return cardElement;
}

export function handleDeleteCard(evt) {
  evt.target.closest(".card").remove();
}

export function handleLikeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}
