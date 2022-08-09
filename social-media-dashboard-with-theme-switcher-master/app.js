const $elementList = document.querySelectorAll('[data-theme]');
const $btnTheme = document.querySelector('#checked');

console.log($elementList)

function themeDark() {
  $elementList.forEach(element => element.classList.add('card-theme-dark'));
  document.body.classList.add('theme-dark');
}

function themeLight() {
  $elementList.forEach(element => element.classList.remove('card-theme-dark'));
  document.body.classList.remove('theme-dark');
}

function toogleTheme() {
  $btnTheme.addEventListener('click', e => {
    let theme = e.target.checked;
    if (theme) {
      // dark
      themeDark();
    } else {
      themeLight();
      // light
    }
  })
}

toogleTheme();