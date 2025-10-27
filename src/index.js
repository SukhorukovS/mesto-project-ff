import "./pages/index.css";
import { createCardElement } from "./components/card/card";
import { openPopup, closePopup } from "./components/popup/popup";
import {
  enableValidation,
  clearValidation,
} from "./components/form/validation";
import { validationConfig } from "./config";
import {
  createNewCard,
  getCardList,
  getProfile,
  updateAvatar,
  updateProfile,
  deleteCard,
  likeCard,
  unLikeCard,
} from "./api/api";

// DOM узлы
const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarBlock = document.querySelector(".profile__avatar");
const avatrEditButton = document.querySelector(".profile__avatar-button");
const imgElement = document.querySelector(".popup__image");
const photoCaption = document.querySelector(".popup__caption");
const placesWrap = document.querySelector(".places__list");
const newCardForm = document.forms["new-place"];
const placeNameInput = newCardForm.elements["place-name"];
const placePhotoLinkInput = newCardForm.elements.link;
const deleteCardForm = document.forms["delete-card"];
const submitButton = deleteCardForm.elements["delete-button"];
const profileForm = document.forms["edit-profile"];
const avatarForm = document.forms["edit-avatar"];
const profileNameEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");
const profilePhotoEl = document.querySelector(".profile__image");
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;
const avatarInput = avatarForm.elements.link;

let profileId;

function handlePhotoCLick(evt) {
  imgElement.src = evt.target.src;
  imgElement.alt = evt.target.alt;
  photoCaption.textContent = evt.target.alt;
  openPopup("image");
}

function submitNewCardForm(evt) {
  evt.preventDefault();

  evt.submitter.textContent = "Сохранение...";

  createNewCard({
    name: placeNameInput.value,
    link: placePhotoLinkInput.value,
  })
    .then((data) => {
      placesWrap.prepend(
        createCardElement({
          data,
          profileId,
          onDelete: handleDeleteCard,
          onLike: handleLikeCard,
          onPhotoClick: handlePhotoCLick,
        })
      );
      evt.target.reset();
      closePopup();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
}

function addCard() {
  openPopup("new-card");
  placeNameInput.value = "";
  placePhotoLinkInput.value = "";
  clearValidation(newCardForm, validationConfig);
}

function submitDeleteCardForm(evt) {
  evt.preventDefault();

  evt.submitter.textContent = "Удаление...";

  const cardId = submitButton.dataset.cardId;

  deleteCard(cardId)
    .then(() => {
      document
        .querySelector(`.card__delete-button[data-card-id="${cardId}"]`)
        .closest(".card")
        .remove();
      closePopup();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      evt.submitter.textContent = "Да";
    });
}

function handleDeleteCard(evt) {
  submitButton.dataset.cardId = evt.target.dataset.cardId;
  openPopup("delete-card");
}

function handleLikeCard(evt) {
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

function submitProfileForm(evt) {
  evt.preventDefault();

  evt.submitter.textContent = "Сохранение...";

  updateProfile({ name: nameInput.value, about: jobInput.value })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
      closePopup();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
}

function submitAvatarForm(evt) {
  evt.preventDefault();

  evt.submitter.textContent = "Сохранение...";

  updateAvatar(avatarInput.value)
    .then((data) => {
      profilePhotoEl.style.backgroundImage = `url(${data.avatar})`;
      closePopup();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
}

function editProfile() {
  openPopup("edit");
  nameInput.value = profileNameEl.textContent;
  jobInput.value = profileDescriptionEl.textContent;
  clearValidation(profileForm, validationConfig);
}

function editAvatar() {
  openPopup("edit-avatar");
  avatarInput.value = "";
  clearValidation(avatarForm, validationConfig);
}

Promise.all([getProfile(), getCardList()])
  .then(([profile, cardList]) => {
    profileNameEl.textContent = profile.name;
    profileDescriptionEl.textContent = profile.about;
    profilePhotoEl.style.backgroundImage = `url(${profile.avatar})`;
    profileId = profile._id;

    cardList.forEach((data) => {
      placesWrap.append(
        createCardElement({
          data,
          profileId: profile._id,
          onDelete: handleDeleteCard,
          onLike: handleLikeCard,
          onPhotoClick: handlePhotoCLick,
        })
      );
    });
  })
  .catch((error) => console.log(error));

profileEditButton.addEventListener("click", editProfile);

addButton.addEventListener("click", addCard);

avatarBlock.addEventListener("click", editAvatar);

avatrEditButton.addEventListener("click", editAvatar);

newCardForm.addEventListener("submit", submitNewCardForm);

deleteCardForm.addEventListener("submit", submitDeleteCardForm);

profileForm.addEventListener("submit", submitProfileForm);

avatarForm.addEventListener("submit", submitAvatarForm);

enableValidation(validationConfig);
