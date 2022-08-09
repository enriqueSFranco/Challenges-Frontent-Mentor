const $btnTheme = document.querySelector("[data-btn]");
const $root = document.querySelectorAll("[data-theme]");
const $elements = document.querySelectorAll("[data-theme-element]")
const $btnThemeText = document.querySelector(".theme-text");
const $form = document.getElementById("form");
const $avatar = document.querySelector(".dev-photo");
const $name = document.querySelector(".dev-name");
const $userName = document.querySelector(".dev-user");
const $join = document.querySelector(".dev-joind");
const $totalRepos = document.getElementById("respos");
const $totalFollowers = document.getElementById("followers");
const $totoalFollowing = document.getElementById("following");
const $location = document.getElementById("location");
const $webSite = document.querySelector(".web-site > a");
const $twitter = document.getElementById("twitter");
const $company = document.getElementById("company");

function themeDark() {
  // console.log("theme dark");
  $root.forEach(el => {
    el.classList.add('theme-dark-body')
  })
  $elements.forEach(el => {
    el.classList.add('theme-dark-elements')
  })
  $btnThemeText.innerHTML = `light <ion-icon name="sunny-outline"></ion-icon>`;
}

function themeLight() {
  // console.log("theme light");
  $root.forEach(el => {
    el.classList.remove('theme-dark-body')
  })
  $elements.forEach(el => {
    el.classList.remove('theme-dark-elements')
  })
  $btnThemeText.innerHTML = `dark <ion-icon name="moon-outline"></ion-icon>`;
}

function formataDate(date) {
  const newDate = new Date(date);
  let day = newDate.getDate()
  let month = newDate.toLocaleString('en-US', {month: 'long'})
  let year = newDate.getFullYear()
  return `${day} ${month} ${year}`
}

async function getUser(user) {
  try {
    let response = await fetch(`https://api.github.com/users/${user}`);

    if (!response.ok) {
      let error = {
        err: true,
        status: response.status,
        statusText: response.statusText,
      };
      throw error;
    }
    let json = await response.json();
    return json;
  } catch (error) {}
}

$btnTheme.addEventListener("click", (e) => {
  let { checked } = e.target;
  checked ? themeDark() : themeLight();
});

document.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target === $form) {
    const { value } = $form["input-search"];
    if (value) {
      getUser(value || "The Octocat")
        .then((response) => {
          console.log(response);
          $avatar.src = response.avatar_url;
          $name.textContent = response.name;
          $userName.textContent = response.login;
          $join.textContent = formataDate(response.created_at);
          $totalRepos.textContent = response.public_repos;
          $totalFollowers.textContent = response.followers;
          $totoalFollowing.textContent = response.following;

          $location.innerHTML = `${
            response.location
              ? `<ion-icon name="location-outline"></ion-icon> ${response.location}`
              : '<ion-icon name="location-outline"></ion-icon> Not available'
          }`;
          $webSite.href = response.blog;
          $webSite.textContent = `${
            response.blog ? `${response.blog}` : "Not available"
          }`;
          $twitter.innerHTML = `${
            response.twitter_username
              ? `<ion-icon name="logo-twitter"></ion-icon> ${response.twitter_username}`
              : '<ion-icon name="logo-twitter"></ion-icon> Not available'
          }`;
          $company.innerHTML = `${
            response.company
              ? `<ion-icon name="business-outline"></ion-icon> ${response.company}`
              : '<ion-icon name="business-outline"></ion-icon> Not available'
          }`;
        })
        .catch((error) => console.log(error));
    } else {
      console.log("vacio");
    }
  }
});

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  themeLight();
  getUser("enriqueSFranco")
    .then((response) => {
      console.log(response);
      $avatar.src = response.avatar_url;
      $name.textContent = response.name;
      $userName.textContent = `@${response.login}`;
      $join.textContent = `Joined ${formataDate(response.created_at)}`;
      $totalRepos.textContent = response.public_repos;
      $totalFollowers.textContent = response.followers;
      $totoalFollowing.textContent = response.following;

      $location.innerHTML = `${
        response.location
          ? `<ion-icon name="location-outline"></ion-icon> ${response.location}`
          : '<ion-icon name="location-outline"></ion-icon> Not available'
      }`;
      $webSite.href = response.blog;
      $webSite.textContent = `${
        response.blog ? `${response.blog}` : "Not available"
      }`;
      $twitter.innerHTML = `${
        response.twitter_username
          ? `<ion-icon name="logo-twitter"></ion-icon> ${response.twitter_username}`
          : '<ion-icon name="logo-twitter"></ion-icon> Not available'
      }`;
      $company.innerHTML = `${
        response.company
          ? `<ion-icon name="business-outline"></ion-icon> ${response.company}`
          : '<ion-icon name="business-outline"></ion-icon> Not available'
      }`;
    })
    .catch((error) => console.log(error));
});
