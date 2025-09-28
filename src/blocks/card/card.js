import { handleClosePopup, closePopup, showPhotoPopup, openPopup } from "../popup/popup";

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");

const newCardForm = document.forms["new-place"];
const placeNameInput = newCardForm.elements["place-name"];
const placePhotoLinkInput = newCardForm.elements.link;

newCardForm.addEventListener("submit", submitNewCardForm);

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

export function addCard() {
  openPopup('new-card');
}

function submitNewCardForm(evt) {
  evt.preventDefault();
  const placesWrap = document.querySelector(".places__list");

  if (placeNameInput.value && placePhotoLinkInput) {
    placesWrap.prepend(
      createCardElement(
        { name: placeNameInput.value, link: placePhotoLinkInput.value },
        handleDeleteCard,
        handleLikeCard,
        handlePhotoCLick
      )
    );

    closePopup();
  }
}

export function handleLikeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.add("card__like-button_is-active");
  }
}

export function handlePhotoCLick(evt) {
  if (evt.target.classList.contains("card__image")) {
    const name = evt.target.alt;
    const link = evt.target.src;
    showPhotoPopup({ name, link });
  }
}
