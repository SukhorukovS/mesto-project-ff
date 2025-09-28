import "./pages/index.css";
import { initialCards } from "./blocks/card/cards";
import {
  createCardElement,
  handleDeleteCard,
  addCard,
  handleLikeCard,
  handlePhotoCLick,
} from "./blocks/card/card";
import { editProfile } from "./blocks/profile/profile";

// DOM узлы
const placesWrap = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

initialCards.forEach((data) => {
  placesWrap.append(
    createCardElement(data, handleDeleteCard, handleLikeCard, handlePhotoCLick)
  );
});

profileEditButton.addEventListener("click", editProfile);

addButton.addEventListener("click", addCard);
