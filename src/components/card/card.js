const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");

export function createCardElement({
  data,
  profileId,
  onDelete,
  onLike,
  onPhotoClick,
}) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeElement = cardElement.querySelector(".card__like-button");
  likeElement.dataset.cardId = data._id;
  const hasUserLike = data.likes.some((user) => user._id === profileId);
  if (hasUserLike) {
    likeElement.classList.add("card__like-button_is-active");
  }

  const photoElement = cardElement.querySelector(".card__image");
  const countLikeElement = cardElement.querySelector(".card__like-count");

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardElement.querySelector(".card__title").textContent = data.name;

  if (data.likes?.length) {
    countLikeElement.textContent = data.likes?.length;
  }

  if (data.owner._id === profileId) {
    deleteButton.dataset.cardId = data._id;
    deleteButton.addEventListener("click", onDelete);
  } else {
    deleteButton.style.display = "none";
  }

  likeElement.addEventListener("click", onLike);
  photoElement.addEventListener("click", onPhotoClick);
  return cardElement;
}
