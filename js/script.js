// Event listeners
new Swiper('.swiper', {
  slidesPerView: 1.5,
  centeredSlides: true,
  spaceBetween: 76,
  autoHeight: true
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('program__list-item__btn')) {
    e.target.classList.toggle('active')
    let nextElement = e.target.nextElementSibling;
    if (nextElement) {
      nextElement.classList.toggle('active');
      nextElement.style.maxHeight = nextElement.classList.contains('active') ? nextElement.scrollHeight + 'px' : 0;
      nextElement.style.marginBottom = nextElement.classList.contains('active') ? 16 + 'px' : 0;
    }
  }
  if (e.target.classList.contains('anchor')) {
    anchorClick(e.target)
  }
  if (e.target.classList.contains('header__burger')) {
    toggleMenu()
  }
})


function anchorClick(e) {
  const activeAnchor = document.querySelector('.menu__link-active')
  activeAnchor.classList.remove('menu__link-active')
  e.classList.add('menu__link-active')
  if (menuBody.classList.contains('active')) {
    toggleMenu()
  }
  const blockId = e.getAttribute('href')
  document.querySelector('' + blockId).scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest"
  })
}


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
