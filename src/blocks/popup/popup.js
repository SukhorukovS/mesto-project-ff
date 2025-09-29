import { createCardElement, handleDeleteCard, handleLikeCard } from "../card/card";
import { placesWrap } from "../card/cards";

const newCardForm = document.forms["new-place"];
const placeNameInput = newCardForm.elements["place-name"];
const placePhotoLinkInput = newCardForm.elements.link;
const imgElement = document.querySelector(".popup__image");

let openedPopup;

newCardForm.addEventListener("submit", submitNewCardForm);

export function handleClosePopup(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }

  if (evt.target.classList.contains("popup__close")) {
    closePopup();
  }

  if (evt.target.classList.contains("popup")) {
    closePopup();
  }

  document.removeEventListener("keydown", handleClosePopup);
}

export function openPopup(type) {
  openedPopup = document.querySelector(`.popup_type_${type}`);

  openedPopup.classList.add("popup_is-opened");
  
  openedPopup.addEventListener("click", handleClosePopup);
  
  document.addEventListener("keydown", handleClosePopup);
}

export function closePopup() {
  openedPopup.classList.remove("popup_is-opened");
}

export function showPhotoPopup({ name, link }) {
  imgElement.src = link;
  imgElement.alt = name;
  openPopup('image');

  document.querySelector(".popup__caption").textContent = name;
}

export function submitNewCardForm(evt) {
  evt.preventDefault();

  if (placeNameInput.value && placePhotoLinkInput.value) {
    placesWrap.prepend(
      createCardElement(
        { name: placeNameInput.value, link: placePhotoLinkInput.value },
        handleDeleteCard,
        handleLikeCard,
        handlePhotoCLick
      )
    );

    evt.target.reset();

    closePopup();
  }
}

export function addCard() {
  openPopup('new-card');
}

export function handlePhotoCLick(evt) {
  if (evt.target.classList.contains("card__image")) {
    const name = evt.target.alt;
    const link = evt.target.src;
    showPhotoPopup({ name, link });
  }
}
