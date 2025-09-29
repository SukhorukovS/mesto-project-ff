import "./pages/index.css";
import { initialCards } from "./blocks/card/cards";
import {
  createCardElement,
  handleDeleteCard,
  handleLikeCard,
} from "./blocks/card/card";
import { editProfile } from "./blocks/profile/profile";
import { addCard, openPopup, closePopup } from "./blocks/popup/popup";
import { placesWrap } from "./blocks/card/cards";

// DOM узлы
const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const imgElement = document.querySelector(".popup__image");
const photoCaption = document.querySelector(".popup__caption");
const newCardForm = document.forms["new-place"];
const placeNameInput = newCardForm.elements["place-name"];
const placePhotoLinkInput = newCardForm.elements.link;

function handlePhotoCLick(evt) {
  imgElement.src = evt.target.src;
  imgElement.alt = evt.target.alt;
  photoCaption.textContent = evt.target.alt;
  openPopup("image");
}

function submitNewCardForm(evt) {
  evt.preventDefault();

  if (placeNameInput.value && placePhotoLinkInput.value) {
    placesWrap.prepend(
      createCardElement({
        data: { name: placeNameInput.value, link: placePhotoLinkInput.value },
        onDelete: handleDeleteCard,
        onLike: handleLikeCard,
        onPhotoClick: handlePhotoCLick,
      })
    );

    evt.target.reset();

    closePopup();
  }
}

initialCards.forEach((data) => {
  placesWrap.append(
    createCardElement({
      data,
      onDelete: handleDeleteCard,
      onLike: handleLikeCard,
      onPhotoClick: handlePhotoCLick,
    })
  );
});

profileEditButton.addEventListener("click", editProfile);

addButton.addEventListener("click", addCard);

newCardForm.addEventListener("submit", submitNewCardForm);
