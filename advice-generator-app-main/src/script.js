import { $ajax } from "./utils/$ajax.js";

const API_URL = "https://api.adviceslip.com/advice";
const $button = document.querySelector(".play");
const $advice = document.querySelector(".advice-text");
const $adviceId = document.getElementById("id");
const $adviceContent = document.querySelector(".advice-content");
const $loader = document.getElementById("loader");

function genereteAdvice() {
  $button.addEventListener("click", (e) => {
    e.preventDefault();
    $ajax()
      .get(API_URL)
      .then((response) => {
        if (!response.err) {
          $loader.classList.add('lds-ring');
          $adviceContent.classList.add('isLoadingContent');
          setTimeout(() => {
            // agregar el slip al advice-text
            const { slip } = response;
            $adviceId.textContent = slip.id;
            $advice.textContent = slip.advice;
            $loader.classList.remove('lds-ring');
            $adviceContent.classList.remove('isLoadingContent');
          }, 3000);
        }
      })
  });
}

document.addEventListener("DOMContentLoaded", (e) => {
  genereteAdvice();
  $ajax()
    .get(API_URL)
    .then((response) => {
      if (!response.err) {
        // agregar el slip al advice-text
        const { slip } = response;
        $adviceId.textContent = slip.id;
        $advice.textContent = slip.advice;
      }
    });
});
