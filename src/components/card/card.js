import { openPopup } from "../popup/popup";
import { clearValidation } from "../form/validation";
import { validationConfig } from "../../config";
import { deleteCard } from "../../api/api";

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");

const cardForm = document.forms["new-place"];
const placeNameInput = cardForm.elements["place-name"];
const linkInput = cardForm.elements.link;

export function createCardElement({ data, profileId, onDelete, onLike, onPhotoClick }) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeElement = cardElement.querySelector(".card__like-button");
  const photoElement = cardElement.querySelector(".card__image");
  const countLikeElement = cardElement.querySelector(".card__like-count");

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardElement.querySelector(".card__title").textContent = data.name;
  
  if (data.likes?.length) {
    countLikeElement.textContent = data.likes?.length;
  }
  
  if (data.owner._id === profileId) {
    deleteButton.dataset.cardId = data._id;
    deleteButton.addEventListener("click", onDelete);
  } else {
    deleteButton.style.display = "none";
  }

  likeElement.addEventListener("click", onLike);
  photoElement.addEventListener("click", onPhotoClick);
  return cardElement;
}

export function handleDeleteCard(evt) {
  deleteCard(evt.target.dataset.cardId).then((data) => {
    evt.target.closest(".card").remove();
  }).catch((err) => console.error(err))
}

export function handleLikeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export function addCard() {
  openPopup("new-card");
  placeNameInput.value = "";
  linkInput.value = "";
  clearValidation(cardForm, validationConfig);
}
