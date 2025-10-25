import { clearValidation } from "../form/validation";
import { closePopup, openPopup } from "../popup/popup";
import { validationConfig } from "../../config";
import { updateAvatar, updateProfile } from "../../api/api";

const profileForm = document.forms["edit-profile"];
const avatarForm = document.forms["edit-avatar"];
export const profileNameEl = document.querySelector(".profile__title");
export const profileDescriptionEl = document.querySelector(
  ".profile__description"
);
export const profilePhotoEl = document.querySelector(".profile__image");
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;
const avatarInput = avatarForm.elements.link;

profileForm.addEventListener("submit", submitProfileForm);
avatarForm.addEventListener("submit", submitAvatarForm);

export function editProfile() {
  openPopup("edit");
  nameInput.value = profileNameEl.textContent;
  jobInput.value = profileDescriptionEl.textContent;
  clearValidation(profileForm, validationConfig);
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

export function editAvatar() {
  openPopup("edit-avatar");
  avatarInput.value = "";
  clearValidation(avatarForm, validationConfig);
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
