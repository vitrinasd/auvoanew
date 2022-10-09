window.addEventListener('DOMContentLoaded', () => {
  function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  const location = window.location.pathname;

  if (/thank/.test(location)) {
    $('#phone1').intlTelInput({
      initialCountry: 'au',
      separateDialCode: true,
      preferredCountries: ['au'],
      geoIpLookup: function (callback) {
        $.get('https://ipinfo.io', function () {}, 'jsonp').always(function (
          resp
        ) {
          var countryCode = resp && resp.country ? resp.country : '';
          callback(countryCode);
        });
      },
      utilsScript:
        'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.14/js/utils.js',
    });

    $('#hiden').intlTelInput({
      initialCountry: 'au',
      dropdownContainer: 'body',
      utilsScript:
        'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.14/js/utils.js',
    });

    /* ADD A MASK IN PHONE1 INPUT (when document ready and when changing flag) FOR A BETTER USER EXPERIENCE */

    var mask1 = $('#phone1').attr('placeholder').replace(/[0-9]/g, 0);

    $(document).ready(function () {
      $('#phone1').mask(mask1);
    });

    $('#phone1').on('countrychange', function (e, countryData) {
      $('#phone1').val('');
      var mask1 = $('#phone1').attr('placeholder').replace(/[0-9]/g, 0);
      $('#phone1').mask(mask1);
    });

    /*ON SUBMIT...*/

    function submitForm(oFormElement) {
      const error = document.querySelector('#error-msg');
      document.getElementById('hiden').value = $('#phone1')
        .val()
        .replace(/\s+/g, ''); // REMOVE ALL THE SPACES OF PHONE1 VALUE
      // PUT THE RESULT IN HIDEN INPUT
      // AND TEST THIS LATTER TO SEE IF IT FITS WITH
      // the intlTelInput NUMBER FORMAT

      // alert(phone);
      // AND IT WILL DISPLAY OK
      if ($('#hiden').intlTelInput('isValidNumber') == true) {
        error.textContent = '';
        const code = $('.selected-dial-code').text();
        const phone = code + $('#hiden').val();
        const button = document.querySelector('.form__button');

        document.getElementById('hiden').value = phone;

        button.setAttribute('disabled', true);

        oFormElement.submit();
        buttonLoading(button);
        return true;
      } else {
        error.textContent = 'Please add correct phone number';
        return false;
      }
    }

    const form = document.querySelector('.form');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitForm(form);
    });

    $('input.hide').parent().hide();

    const newsTemp = document.querySelector('.news__temp');
    const newsBlock = document.querySelector('.news__header-block');

    const inputUrl = document.querySelector('[name="landing_url"]');

    inputUrl.value = window.location.href;

    newsBlock.classList.remove('d-none');
    newsTemp.classList.add('d-none');

    function buttonLoading() {
      const button = document.querySelector('.form__button');

      const id = setInterval(() => {
        addDot(button);
      }, 500);

      function addDot(element) {
        if (/\./.test(element.textContent)) {
          if (element.textContent.match(/\./g).length >= 3) {
            element.textContent = button.textContent.replace(/\./g, '');
          } else {
            element.textContent = button.textContent + '.';
          }
        } else {
          element.textContent = button.textContent + '.';
        }
      }

      return id;
    }

    const buttons = document.querySelectorAll('.question__button');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const parent = btn.parentElement.parentElement;
        const questionId = parent.getAttribute('data-question');
        parent.classList.add('d-none');
        if (questionId == 6) {
          const questionTemp = document.querySelector('.question__temp');
          questionTemp.classList.add('d-none');
          showForm();
        } else {
          showQuestion(questionId, parent);
        }
      });
    });

    function showQuestion(number) {
      const questionId = +number + 1;
      const question = document.querySelector(
        `[data-question="${questionId}"]`
      );
      question.classList.remove('d-none');
      question.classList.add('animate__animated');
      question.classList.add('animate__fadeIn');
      question.classList.add('animate__fast');
    }

    function showForm() {
      const form = document.querySelector('.form');
      form.classList.remove('d-none');
      form.classList.add('animate__animated');
      form.classList.add('animate__fadeIn');
      form.classList.add('animate__fast');
    }
  } else if ('/' === location) {
    function video() {
      const video = document.querySelector('video');
      const playButton = document.querySelector('.play__button');

      video.addEventListener('click', (e) => {
        if (!video.paused) {
          video.pause();
          playButton.classList.remove('d-none');
        }
      });

      playButton.addEventListener('click', (e) => {
        if (video.paused) {
          video.play();
          playButton.classList.add('d-none');
        } else {
          video.pause();
          playButton.classList.remove('d-none');
        }
      });

      video.addEventListener('ended', () => {
        const button = document.querySelector('.button');
        button.setAttribute(
          'class',
          'button animate__animated animate__fadeInDown'
        );
      });
    }

    video();

    function showSignedUp() {
      const num = randomInteger(1, 29);
      const path = `../img/slider/${num}.jpg`;
      const parent = document.querySelector('.signup');
      const img = document.querySelector('.signup__img');
      img.src = path;
      parent.classList.add('active');
      setTimeout(() => {
        parent.classList.remove('active');
      }, 2500);
    }

    setInterval(() => {
      showSignedUp();
    }, 7000);
  } else if (/load/.test(location)) {
    const list = document.querySelector('.load__list');

    const items = [
      'Verifying your location',
      'Checking for doubt entries',
      'Validating answers',
    ];

    let counter = 0;

    let id = setInterval(() => {
      addItem(items[counter]);
      counter += 1;

      if (counter >= 3) {
        clearInterval(id);
        setTimeout(() => {
          window.location.href = '/congrat.html';
        }, 4000);
      }
    }, 4000);

    function addItem(text) {
      const li = document.createElement('li');
      li.classList.add('load__item');
      li.textContent = text;
      li.classList.add('animate__animated');
      li.classList.add('animate__fadeIn');
      li.classList.add('animate__fast');
      list.appendChild(li);
      setTimeout(() => {
        li.classList.add('loaded');
      }, 2000);
    }
  }

  const modalBtns = document.querySelectorAll('.footer__item');
  const modalClose = document.querySelectorAll('.modal__close');
  const modal = document.querySelector('.modal');

  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      hideModals();
    }
  });

  modalClose.forEach((item) => {
    item.addEventListener('click', hideModals);
  });

  function hideModals() {
    modal.classList.remove('active');
    const containers = document.querySelectorAll('.modal__container');
    containers.forEach((container) => container.classList.remove('active'));
  }

  modalBtns.forEach((item) => {
    if (item.getAttribute('data-modal')) {
      item.addEventListener('click', () => {
        const target = item.getAttribute('data-modal');
        modal.classList.add('active');
        let container = document.getElementById(target);
        console.log(target);
        container.classList.add('active');
      });
    }
  });
});
