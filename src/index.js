import "./pages/index.css";
import { initialCards } from "./cards";
// Темплейт карточки
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");

// DOM узлы
const placesWrap = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileForm = document.forms["edit-profile"];
const profileNameEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;
const newCardForm = document.forms["new-place"];
const placeNameInput = newCardForm.elements["place-name"];
const placePhotoLinkInput = newCardForm.elements.link;

function createCardElement(data, onDelete, onLike) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardElement.querySelector(".card__title").textContent = data.name;

  deleteButton.addEventListener("click", onDelete);
  cardElement.addEventListener("click", onLike);
  return cardElement;
}

function handleDeleteCard(evt) {
  evt.target.closest(".card").remove();
}

initialCards.forEach((data) => {
  placesWrap.append(createCardElement(data, handleDeleteCard, handleLikeCard));
});

profileEditButton.addEventListener("click", editProfile);

addButton.addEventListener("click", addCard);

function editProfile(evt) {
  const popupEditProfile = document.querySelector(".popup_type_edit");

  popupEditProfile.classList.add("popup_is-opened");

  nameInput.value = profileNameEl.textContent;
  jobInput.value = profileDescriptionEl.textContent;

  popupEditProfile.addEventListener("click", handleClosePopup);
  document.addEventListener("keydown", handleClosePopup);
}

function addCard(evt) {
  const popupAddCard = document.querySelector(".popup_type_new-card");

  popupAddCard.classList.add("popup_is-opened");

  popupAddCard.addEventListener("click", handleClosePopup);
}

function handleClosePopup(evt) {
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

function closePopup() {
  const popup = document.querySelector(".popup_is-opened");
  popup.classList.remove("popup_is-opened");
}

profileForm.addEventListener("submit", submitProfileForm);

function submitProfileForm(evt) {
  evt.preventDefault();

  profileNameEl.textContent = nameInput.value;
  profileDescriptionEl.textContent = jobInput.value;

  closePopup();
}

newCardForm.addEventListener("submit", submitNewCardForm);

function submitNewCardForm(evt) {
  evt.preventDefault();

  if (placeNameInput.value && placePhotoLinkInput) {
    placesWrap.prepend(
      createCardElement(
        { name: placeNameInput.value, link: placePhotoLinkInput.value },
        handleDeleteCard,
        handleLikeCard,
      )
    );
  
    closePopup();
  }
}

function handleLikeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.add("card__like-button_is-active");
  }
}
