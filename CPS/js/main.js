// кнопка для текста

document.getElementById('toggleText').addEventListener('click', function () {
  const textContainer = document.querySelector('.content__text')
  const button = document.getElementById('toggleText')

  textContainer.classList.toggle('content__text--show-more')
  button.classList.toggle('shown')

  if (textContainer.classList.contains('content__text--show-more')) {
    button.innerHTML = '<img src="img/icons/arrow_down.svg" alt="Arrow"> Скрыть'
  } else {
    button.innerHTML =
      '<img src="img/icons/arrow_down.svg" alt="Arrow"> Показать всё'
  }
})

// кнопка для карточек Бренды
// кнопка для карточек Бренды
document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggleBrands')
  const brandCards = document.querySelectorAll('.brands__card')
  const cardsPerRow = 3
  const rowsToShow = 2
  let cardsToShow = cardsPerRow * rowsToShow

  function updateCardsVisibility() {
    const screenWidth = window.innerWidth

    if (screenWidth < 768) {
      cardsToShow = brandCards.length
    } else {
      cardsToShow = cardsPerRow * rowsToShow
    }

    for (let i = 0; i < brandCards.length; i++) {
      if (i < cardsToShow) {
        brandCards[i].classList.remove('hidden')
      } else {
        brandCards[i].classList.add('hidden')
      }
    }

    if (cardsToShow < brandCards.length) {
      toggleButton.style.display = 'flex'
    } else {
      toggleButton.style.display = 'none'
    }
    toggleButton.classList.remove('shown')
    toggleButton.innerHTML =
      '<img src="img/icons/arrow_down.svg" alt="Стрелка показать"> Показать всё'
  }

  function toggleCards() {
    const isShowingAll = toggleButton.classList.toggle('shown')

    if (isShowingAll) {
      for (let i = 0; i < brandCards.length; i++) {
        brandCards[i].classList.remove('hidden')
      }
      toggleButton.innerHTML =
        '<img src="img/icons/arrow_down.svg" alt="Стрелка показать"> Скрыть'
    } else {
      updateCardsVisibility()
    }
  }

  toggleButton.addEventListener('click', toggleCards)
  window.addEventListener('resize', updateCardsVisibility)

  updateCardsVisibility()
})

// кнопка карточки ремонт

document.addEventListener('DOMContentLoaded', function () {
  var toggleButton = document.getElementById('toggleRepairTypes')
  var repairCards = document.querySelectorAll('.repair-types__card')
  var cardsToShow = 3

  function updateCardsVisibility() {
    var screenWidth = window.innerWidth

    if (screenWidth >= 1120 && screenWidth < 1440) {
      cardsToShow = 4
    } else if (screenWidth >= 768 && screenWidth < 1120) {
      cardsToShow = 3
    } else {
      cardsToShow = repairCards.length
    }

    for (var i = 0; i < repairCards.length; i++) {
      if (i < cardsToShow) {
        repairCards[i].classList.remove('hidden')
      } else {
        repairCards[i].classList.add('hidden')
      }
    }

    if (cardsToShow < repairCards.length) {
      toggleButton.style.display = 'flex'
    } else {
      toggleButton.style.display = 'none'
    }

    toggleButton.classList.remove('shown')
    toggleButton.innerHTML =
      '<img src="img/icons/arrow_down.svg" alt="Стрелка показать"> Показать всё'
  }

  function toggleCards() {
    var isShowingAll = toggleButton.classList.toggle('shown')

    if (isShowingAll) {
      for (var i = 0; i < repairCards.length; i++) {
        repairCards[i].classList.remove('hidden')
      }
      toggleButton.innerHTML =
        '<img src="img/icons/arrow_down.svg" alt="Стрелка показать"> Скрыть'
    } else {
      updateCardsVisibility()
    }
  }

  toggleButton.addEventListener('click', toggleCards)
  window.addEventListener('resize', updateCardsVisibility)

  updateCardsVisibility()
})

// модальные окна
document.addEventListener('DOMContentLoaded', function () {
  let callbackButtons = document.querySelectorAll('.btn-link--callback')
  let feedbackButtons = document.querySelectorAll('.btn-link--feedback')
  let closeModalButtons = document.querySelectorAll('.modal-btn-close')

  let callbackModal = document.getElementById('callback-modal')
  let feedbackModal = document.getElementById('feedback-modal')

  function openModal(modal) {
    console.log('Opening modal: ' + modal.id)
    modal.classList.add('open')
  }

  function closeModal(modal) {
    console.log('Closing modal: ' + modal.id)
    modal.classList.remove('open')
  }

  for (let i = 0; i < callbackButtons.length; i++) {
    callbackButtons[i].addEventListener('click', function () {
      openModal(callbackModal)
    })
  }

  for (let i = 0; i < feedbackButtons.length; i++) {
    feedbackButtons[i].addEventListener('click', function () {
      openModal(feedbackModal)
    })
  }

  for (let i = 0; i < closeModalButtons.length; i++) {
    closeModalButtons[i].addEventListener('click', function (event) {
      let modal = event.target.closest('.modal')
      closeModal(modal)
    })
  }
})

// бургер
document
  .querySelector('.header .burger-btn')
  .addEventListener('click', function () {
    const menu = document.querySelector('.burger-menu')
    menu.classList.toggle('open')
  })

document
  .querySelector('.burger-btn--close')
  .addEventListener('click', function () {
    const menu = document.querySelector('.burger-menu')
    menu.classList.remove('open')
  })

// кнопка для раздела Ремонт
document
  .getElementById('toggleRepairTypes')
  .addEventListener('click', function () {
    const repairTypesContainer = document.querySelector('.repair-types__list')
    const button = document.getElementById('toggleRepairTypes')

    repairTypesContainer.classList.toggle('show-all')
    button.classList.toggle('shown')

    if (repairTypesContainer.classList.contains('show-all')) {
      button.innerHTML =
        '<img src="img/icons/arrow_down.svg" alt="Arrow"> Скрыть'
    } else {
      button.innerHTML =
        '<img src="img/icons/arrow_down.svg" alt="Arrow"> Показать всё'
    }
  })
