// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function togglePopup(popupClass) {
  document.querySelector(popupClass).classList.toggle("popup_is-opened");
}

// ------------------------------ CARD ----------------------------------

const placesList = document.querySelector(".places__list");

function addCard(name, url) {
  const template = document.querySelector("#card-template").content;
  const cardElement = template.cloneNode(true);

  cardElement.querySelector(".card__image").src = url;
  cardElement.querySelector(".card__title").textContent = name;

  placesList.append(cardElement);
}

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
