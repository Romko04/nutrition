document.addEventListener('DOMContentLoaded', function () {
  // Event listeners and other code here

  new Swiper('.swiper', {
    slidesPerView: 1.3,
    centeredSlides: true,
    spaceBetween: 14,
    breakpoints: {
      769: {
        slidesPerView: 1.8,
        centeredSlides: true,
        spaceBetween: 76,
        autoHeight: true
      }
    }
  });
  var popupContainer = document.querySelector('.popup-container');
  var scrollThreshold = 1400; // adjust this value as needed
  window.addEventListener('scroll', function() {
    if (window.scrollY >= scrollThreshold) {
      popupContainer.style.bottom = '-1px'; // show the container
    } else {
      popupContainer.style.bottom = '-100px'; // hide the container
    }
  });

  document.addEventListener('click', (e) => {


  
    const body = document.querySelector('body')
    let unlockPopup = true

    if (e.target.classList.contains('program__list-item__btn')) {
      e.target.classList.toggle('active')
      let nextElement = e.target.nextElementSibling;
      if (nextElement) {
        nextElement.classList.toggle('active');
        nextElement.style.maxHeight = nextElement.classList.contains('active') ? nextElement.scrollHeight + 'px' : 0;
        nextElement.style.marginBottom = nextElement.classList.contains('active') ? 16 + 'px' : 0;
      }
    }
    if (e.target.closest('.button--popup')) {

      const popupForm = document.querySelector('.popup--form')

      if (unlockPopup) {
        body.classList.add('body--lock')
        popupForm.classList.add('active')
      }

    }
    if (!e.target.closest('.popup__content') || e.target.closest('.popup__close')) {
      const popup = e.target.closest('.popup')
      if (popup) {
        e.preventDefault()
        popup.classList.remove('active')
        body.classList.remove('body--lock')
      }
    }
    // Other click event handling code

  });




  let form = document.querySelector('.feadback__form');
  let instaInput = document.getElementById('insta');
  let questionTextarea = document.getElementById('question');
  let submitButton = document.querySelector('.form__btn');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    let instaValue = instaInput.value;
    let questionValue = questionTextarea.value;

    // Перевірка, чи довжина повідомлення більше 10 символів
    if (questionValue.length <= 10) {
      // Додаємо клас та вставляємо текст про мінімальну кількість символів
      questionTextarea.classList.add('error');
      questionTextarea.nextElementSibling.innerText = 'Мінімальна кількість символів для запитання - 10';
    } else {
      // Генеруємо поточну дату та час
      let currentDate = new Date();
      let formattedDate = currentDate.toLocaleString(); // форматуємо дату для зручного відображення

      let telegramToken = '6144282446:AAEBydoJMTRovY3mTMwSXbv5OmgifWT2_28';
      let chatId = '-4165690602';

      // Формуємо повідомлення для відправлення
      let message = 'Instagram нік: ' + instaValue + '\nПитання: ' + questionValue + '\nДата та час: ' + formattedDate;

      // Викликаємо функцію відправлення повідомлення
      submitButton.classList.add('active')
      sendTelegramMessage(telegramToken, chatId, message);
    }
  });

  // Функція для видалення класу помилки та тексту про мінімальну кількість символів
  questionTextarea.addEventListener('input', function () {
    if (questionTextarea.classList.contains('error')) {
      questionTextarea.classList.remove('error');
      questionTextarea.nextElementSibling.innerText = '';
    }
  });

  function sendTelegramMessage(token, chatId, message) {
    let apiUrl = 'https://api.telegram.org/bot' + token + '/sendMessage';
    let data = {
      chat_id: chatId,
      text: message
    };

    // Використовуємо fetch для відправлення повідомлення
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        instaInput.value = '';
        questionTextarea.value = '';
        submitButton.nextElementSibling.innerText = '';
        submitButton.classList.remove('active');
        submitButton.classList.add('disabled');
        submitButton.disabled = true;
        submitButton.nextElementSibling.innerText = 'Я невдовзі звяжуся з вами!';
        submitButton.nextElementSibling.style.color = '#FDC248'; // Змініть колір, якщо потрібно
      })
      .catch(error => {
        submitButton.nextElementSibling.innerText = 'Щось пішло не так😢';
      });
  }

})



