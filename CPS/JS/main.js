// кнопка для текста

document.getElementById("toggleText").addEventListener("click", function () {
  const textContainer = document.querySelector(".content__text");
  const button = document.getElementById("toggleText");

  textContainer.classList.toggle("content__text--show-more");
  button.classList.toggle("shown");

  if (textContainer.classList.contains("content__text--show-more")) {
    button.innerHTML =
      '<img src="./Img/icons/arrow_down.svg" alt="Arrow"> Скрыть';
  } else {
    button.innerHTML =
      '<img src="./Img/icons/arrow_down.svg" alt="Arrow"> Показать всё';
  }
});

// кнопка для карточек
document.getElementById("toggleBrands").addEventListener("click", function () {
  const brandsContainer = document.querySelector(".brands__list");
  const button = document.getElementById("toggleBrands");

  brandsContainer.classList.toggle("shw-more");
  button.classList.toggle("shown");

  if (brandsContainer.classList.contains("shw-more")) {
    button.innerHTML =
      '<img src="./Img/icons/arrow_down.svg" alt="Arrow"> Скрыть';
  } else {
    button.innerHTML =
      '<img src="./Img/icons/arrow_down.svg" alt="Arrow"> Показать всё';
  }
});

// бургер
document.querySelector(".burger-btn").addEventListener("click", function () {
  const menu = document.querySelector(".header__menu");
  menu.classList.toggle("open");
});

document
  .querySelector(".burger-btn-close")
  .addEventListener("click", function () {
    const menu = document.querySelector(".header__menu");
    menu.classList.remove("open");
  });
