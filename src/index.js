import "./pages/index.css";
import {
  createCardElement,
  handleDeleteCard,
  handleLikeCard,
  addCard,
} from "./components/card/card";
import {
  editAvatar,
  editProfile,
  profileDescriptionEl,
  profileNameEl,
  profilePhotoEl,
} from "./components/profile/profile";
import { openPopup, closePopup } from "./components/popup/popup";
import {
  placesWrap,
  newCardForm,
  placeNameInput,
  placePhotoLinkInput,
  deleteCardForm,
  submitDeleteCardForm,
} from "./components/card/card";
import { enableValidation } from "./components/form/validation";
import { validationConfig } from "./config";
import { createNewCard, getCardList, getProfile } from "./api/api";

// DOM узлы
const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarBlock = document.querySelector(".profile__avatar");
const avatrEditButton = document.querySelector(".profile__avatar-button");
const imgElement = document.querySelector(".popup__image");
const photoCaption = document.querySelector(".popup__caption");

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

enableValidation(validationConfig);
