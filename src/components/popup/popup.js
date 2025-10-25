let openedPopup;

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
}

export function openPopup(type) {
  openedPopup = document.querySelector(`.popup_type_${type}`);

  openedPopup.classList.add("popup_is-opened");

  openedPopup.addEventListener("click", handleClosePopup);

  document.addEventListener("keydown", handleClosePopup);
}

export function closePopup() {
  openedPopup.classList.remove("popup_is-opened");
  openedPopup.removeEventListener("click", handleClosePopup);
  document.removeEventListener("keydown", handleClosePopup);
}
