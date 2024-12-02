// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function togglePopup(popupClass) {
  document.querySelector(popupClass).classList.toggle("popup_is-opened");
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
