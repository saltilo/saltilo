document.getElementById("toggleBrands").addEventListener("click", function () {
  const list = document.querySelector(".brands__list");
  const button = document.getElementById("toggleBrands");

  list.classList.toggle("shw-more");
  button.classList.toggle("shown");

  if (list.classList.contains("shw-more")) {
    button.innerHTML =
      '<img src="../Img/icons/arrow_down.svg" alt="Arrow"> Скрыть';
  } else {
    button.innerHTML =
      '<img src="../Img/icons/arrow_down.svg" alt="Arrow"> Показать всё';
  }
});
