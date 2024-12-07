// ---------------------------- FUNCTIONS --------------------------------

function togglePopup(popupClass) {
  element = document.querySelector(popupClass)
  if (!!element) {
    element.classList.toggle("popup_is-opened");
  }
}

function showInputError(inputElement, errorElement) {
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = inputElement.validationMessage;
}

function hideInputError(inputElement, errorElement) {
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
}

function validateForm(formElement, submitButton, ...inputElements) {
  inputElements.forEach((element) => {
    if (!element.validity.valid) {
      showInputError(element, element.nextElementSibling);
    } else {
      hideInputError(element, element.nextElementSibling);
    }
  });

  if (formElement.checkValidity()) {
    submitButton.disabled = false;
    submitButton.classList.remove("popup__button_disabled");
  } else {
    submitButton.disabled = true;
    submitButton.classList.add("popup__button_disabled");
  }
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    togglePopup(".popup_is-opened");
  }
}

// ------------------------------ POPUPS ----------------------------------

const popups = document.querySelectorAll(".popup");
popups.forEach((element) => {
  console.log(element)
  document.addEventListener("keydown", closeByEsc);
  element.classList.add("popup_is-animated");
});

// ------------------------------ CARDS ----------------------------------

const placesList = document.querySelector(".places__list");

function addCard(name, url) {
  const template = document.querySelector("#card-template").content;
  const cardElement = template.cloneNode(true);

  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = url;
  cardElement.querySelector(".card__title").textContent = name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  deleteButton.addEventListener("click", () => {
    deleteButton.closest(".card").remove();
  });

  cardImage.addEventListener("click", () => {
    imagePopup.querySelector(".popup__image").src = url;
    imagePopup.querySelector(".popup__caption").textContent = name;

    togglePopup(".popup_type_image");
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

editForm = document.forms.namedItem("edit-profile");
editPopup = document.querySelector(".popup_type_edit");

const nameInput = editForm.elements.name;
nameInput.addEventListener("input", () => {
  validateForm(editForm, submitEditButton, nameInput);
});
const descInput = editForm.elements.description;
descInput.addEventListener("input", () => {
  validateForm(editForm, submitEditButton, descInput);
});

editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", () => {
  nameInput.value = document.querySelector(".profile__title").textContent;
  descInput.value = document.querySelector(".profile__description").textContent;
  validateForm(editForm, submitEditButton, nameInput, descInput);

  togglePopup(".popup_type_edit");
});

const closeEditButton = editPopup.querySelector(".popup__close");
closeEditButton.addEventListener("click", () => {
  togglePopup(".popup_type_edit");
});

const submitEditButton = editForm.elements.namedItem("submit-button");
submitEditButton.addEventListener("click", (event) => {
  event.preventDefault();

  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = descInput.value;

  togglePopup(".popup_type_edit");
});

// -------------------------- ADD POP-UP -------------------------------

addForm = document.forms.namedItem("new-place");
const addPopup = document.querySelector(".popup_type_new-card");

const cardNameInput = addForm.elements.namedItem("place-name");
cardNameInput.addEventListener("input", () => {
  validateForm(addForm, submitAddButton, cardNameInput);
});
const urlInput = addForm.elements.link;
urlInput.addEventListener("input", () => {
  validateForm(addForm, submitAddButton, urlInput);
});

addProfileButton = document.querySelector(".profile__add-button");
addProfileButton.addEventListener("click", () => {
  hideInputError(cardNameInput, cardNameInput.nextElementSibling);
  hideInputError(urlInput, urlInput.nextElementSibling);

  submitAddButton.disabled = true;
  submitAddButton.classList.add("popup__button_disabled");

  cardNameInput.value = "";
  urlInput.value = "";

  togglePopup(".popup_type_new-card");
});

const closeAddButton = addPopup.querySelector(".popup__close");
closeAddButton.addEventListener("click", () => {
  togglePopup(".popup_type_new-card");
});

const submitAddButton = addForm.elements.namedItem("submit-button");
submitAddButton.addEventListener("click", (event) => {
  event.preventDefault();

  addCard(cardNameInput.value, urlInput.value);

  cardNameInput.value = "";
  urlInput.value = "";

  togglePopup(".popup_type_new-card");
});

// -------------------------- IMAGE POPUP -------------------------------

const imagePopup = document.querySelector(".popup_type_image");

const closeImageButton = imagePopup.querySelector(".popup__close");
closeImageButton.addEventListener("click", () => {
  togglePopup(".popup_type_image");
});


