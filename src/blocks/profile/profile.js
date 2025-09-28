import { closePopup, openPopup } from "../popup/popup";

const profileForm = document.forms["edit-profile"];
const profileNameEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;

profileForm.addEventListener("submit", submitProfileForm);

export function editProfile() {
  openPopup('edit');
  nameInput.value = profileNameEl.textContent;
  jobInput.value = profileDescriptionEl.textContent;
}

function submitProfileForm(evt) {
  evt.preventDefault();

  profileNameEl.textContent = nameInput.value;
  profileDescriptionEl.textContent = jobInput.value;

  closePopup();
}
