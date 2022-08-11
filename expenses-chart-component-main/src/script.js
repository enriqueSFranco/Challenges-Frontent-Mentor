export const data = [
  {
    "day": "mon",
    "amount": 17.45
  },
  {
    "day": "tue",
    "amount": 34.91
  },
  {
    "day": "wed",
    "amount": 52.36
  },
  {
    "day": "thu",
    "amount": 31.07
  },
  {
    "day": "fri",
    "amount": 23.39
  },
  {
    "day": "sat",
    "amount": 43.28
  },
  {
    "day": "sun",
    "amount": 25.48
  }
]

function createChart() {
  const $wrapper = document.querySelector('.wrapper');

  data.forEach(el => {
    let $wrapperBar = document.createElement('div');

    let height = el.amount / 7;
    let day = el.day;
    let element = "";

    $wrapperBar.classList.add('wrapper-bar');

    if (day === 'wed') {
      element += `<div class="bar active" style="--height: ${height}rem"></div>`;
    } else {
      element += `<div class="bar" style="--height: ${height}rem"></div>`;
    }
    $wrapperBar.innerHTML += `
      <div class="chart">
        ${element}
        <span class="day">${day}</span>
        </div>
    `
    $wrapper.appendChild($wrapperBar);
  })
}

document.addEventListener('DOMContentLoaded', createChart());
