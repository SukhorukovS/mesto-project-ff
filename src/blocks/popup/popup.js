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
  const popup = document.querySelector(`.popup_type_${type}`);

  popup.classList.add("popup_is-opened");
  
  popup.addEventListener("click", handleClosePopup);
  
  document.addEventListener("keydown", handleClosePopup);
}

export function closePopup() {
  const popup = document.querySelector(".popup_is-opened");

  popup.classList.remove("popup_is-opened");
}

export function showPhotoPopup({ name, link }) {
  openPopup('image');
  const imgElement = document.querySelector(".popup__image");

  imgElement.src = link;
  imgElement.alt = name;

  document.querySelector(".popup__caption").textContent = name;
}
