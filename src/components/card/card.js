import { closePopup, openPopup } from "../popup/popup";
import { clearValidation } from "../form/validation";
import { validationConfig } from "../../config";
import { deleteCard, likeCard, unLikeCard } from "../../api/api";

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");

export const placesWrap = document.querySelector(".places__list");

export const newCardForm = document.forms["new-place"];
export const placeNameInput = newCardForm.elements["place-name"];
export const placePhotoLinkInput = newCardForm.elements.link;

export const deleteCardForm = document.forms["delete-card"];
const submitButton = deleteCardForm.elements["delete-button"];

export function createCardElement({
  data,
  profileId,
  onDelete,
  onLike,
  onPhotoClick,
}) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeElement = cardElement.querySelector(".card__like-button");
  likeElement.dataset.cardId = data._id;
  const hasUserLike = data.likes.some((user) => user._id === profileId);
  if (hasUserLike) {
    likeElement.classList.add("card__like-button_is-active");
  }

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
  submitButton.dataset.cardId = evt.target.dataset.cardId;
  openPopup("delete-card");
}

export function handleLikeCard(evt) {
  if (!evt.target.classList.contains("card__like-button_is-active")) {
    likeCard(evt.target.dataset.cardId)
      .then((data) => {
        evt.target.classList.add("card__like-button_is-active");
        evt.target.nextElementSibling.textContent = data.likes.length;
      })
      .catch((err) => console.error(err));
  } else {
    unLikeCard(evt.target.dataset.cardId)
      .then((data) => {
        evt.target.classList.remove("card__like-button_is-active");
        evt.target.nextElementSibling.textContent = data.likes.length || "";
      })
      .catch((err) => console.error(err));
  }
}

export function addCard() {
  openPopup("new-card");
  placeNameInput.value = "";
  placePhotoLinkInput.value = "";
  clearValidation(newCardForm, validationConfig);
}

export function submitDeleteCardForm(evt) {
  evt.preventDefault();

  evt.submitter.textContent = "Удаление...";

  const cardId = submitButton.dataset.cardId;

  deleteCard(cardId)
    .then(() => {
      document
        .querySelector(`.card__delete-button[data-card-id="${cardId}"]`)
        .closest(".card")
        .remove();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      evt.submitter.textContent = "Да";
      closePopup();
    });
}
