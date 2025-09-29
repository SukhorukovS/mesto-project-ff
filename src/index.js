import "./pages/index.css";
import { initialCards } from "./blocks/card/cards";
import {
  createCardElement,
  handleDeleteCard,
  handleLikeCard,
} from "./blocks/card/card";
import { editProfile } from "./blocks/profile/profile";
import { submitNewCardForm, handlePhotoCLick, addCard } from "./blocks/popup/popup";
import { placesWrap } from "./blocks/card/cards";

// DOM узлы
const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

initialCards.forEach((data) => {
  placesWrap.append(
    createCardElement(data, handleDeleteCard, handleLikeCard, handlePhotoCLick)
  );
});

profileEditButton.addEventListener("click", editProfile);

addButton.addEventListener("click", addCard);