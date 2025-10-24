import { clearValidation } from "../form/validation";
import { closePopup, openPopup } from "../popup/popup";
import { validationConfig } from "../../config";
import { updateProfile } from "../../api/api";

const profileForm = document.forms["edit-profile"];
const avatarForm = document.forms["edit-avatar"];
export const profileNameEl = document.querySelector(".profile__title");
export const profileDescriptionEl = document.querySelector(
  ".profile__description"
);
export const profilePhotoEl = document.querySelector(".profile__image");
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;

profileForm.addEventListener("submit", submitProfileForm);

export function editProfile() {
  openPopup("edit");
  nameInput.value = profileNameEl.textContent;
  jobInput.value = profileDescriptionEl.textContent;
  clearValidation(profileForm, validationConfig);
}

function submitProfileForm(evt) {
  evt.preventDefault();

  updateProfile({ name: nameInput.value, about: jobInput.value })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
    })
    .catch((err) => console.error(err));

  closePopup();
}

export function editAvatar() {
  openPopup("edit-avatar");
  clearValidation(avatarForm, validationConfig);
}
