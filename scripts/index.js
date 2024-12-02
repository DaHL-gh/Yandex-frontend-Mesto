// @todo: Функция создания карточки

// @todo: Функция удаления карточки

function togglePopup(popupClass) {
  document.querySelector(popupClass).classList.toggle("popup_is-opened");
}

// ------------------------------ CARDS ----------------------------------

const placesList = document.querySelector(".places__list");

function addCard(name, url) {
  const template = document.querySelector("#card-template").content;
  const cardElement = template.cloneNode(true);

  cardElement.querySelector(".card__image").src = url;
  cardElement.querySelector(".card__title").textContent = name;

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteButton.closest(".card").remove();
  });

  placesList.append(cardElement);
}

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

initialCards.forEach((item) => addCard(item.name, item.link));

// -------------------------- EDIT POP-UP -------------------------------

editPopup = document.querySelector(".popup_type_edit");

editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", () => {
  togglePopup(".popup_type_edit");
});

const closeEditButton = editPopup.querySelector(".popup__close");
closeEditButton.addEventListener("click", () => {
  togglePopup(".popup_type_edit");
});

const inputInput = editPopup.querySelector(".popup__input_type_name");
inputInput.value = document.querySelector(".profile__title").textContent;

const descriptionInput = editPopup.querySelector(
  ".popup__input_type_description"
);
descriptionInput.value = document.querySelector(
  ".profile__description"
).textContent;

const submitEditButton = editPopup.querySelector(".popup__button");
submitEditButton.addEventListener("click", (event) => {
  if (!!inputInput.value && !!descriptionInput.value) {
    event.preventDefault();

    document.querySelector(".profile__title").textContent = inputInput.value;
    document.querySelector(".profile__description").textContent =
      descriptionInput.value;

    togglePopup(".popup_type_edit");
  }
});

// -------------------------- ADD POP-UP -------------------------------
addPopup = document.querySelector(".popup_type_new-card");

addProfileButton = document.querySelector(".profile__add-button");
addProfileButton.addEventListener("click", () => {
  togglePopup(".popup_type_new-card");
});

const closeAddButton = addPopup.querySelector(".popup__close");
closeAddButton.addEventListener("click", () => {
  togglePopup(".popup_type_new-card");
});

const submitAddButton = addPopup.querySelector(".popup__button");
submitAddButton.addEventListener("click", (event) => {
  cardNameInput = addPopup.querySelector(".popup__input_type_card-name");
  urlInput = addPopup.querySelector(".popup__input_type_url");

  if (!!cardNameInput.value && !!urlInput.value) {
    event.preventDefault();

    addCard(cardNameInput.value, urlInput.value);

    cardNameInput.value = "";
    urlInput.value = "";

    togglePopup(".popup_type_new-card");
  }
});
