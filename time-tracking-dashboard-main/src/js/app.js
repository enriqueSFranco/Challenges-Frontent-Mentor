import { $ajax } from "./$ajax.js";

const db = [
  {
    "title": "Work",
    "icon": "./src/images/icon-work.svg",
    "ellipsi": "./src/images/icon-ellipsis.svg",
    "timeframes": {
      "daily": {
        "current": 5,
        "previous": 7
      },
      "weekly": {
        "current": 32,
        "previous": 36
      },
      "monthly": {
        "current": 103,
        "previous": 128
      }
    }
  },
  {
    "title": "Play",
    "icon": "./src/images/icon-play.svg",
    "ellipsi": "./src/images/icon-ellipsis.svg",
    "timeframes": {
      "daily": {
        "current": 1,
        "previous": 2
      },
      "weekly": {
        "current": 10,
        "previous": 8
      },
      "monthly": {
        "current": 23,
        "previous": 29
      }
    }
  },
  {
    "title": "Study",
    "icon": "./src/images/icon-study.svg",
    "ellipsi": "./src/images/icon-ellipsis.svg",
    "timeframes": {
      "daily": {
        "current": 0,
        "previous": 1
      },
      "weekly": {
        "current": 4,
        "previous": 7
      },
      "monthly": {
        "current": 13,
        "previous": 19
      }
    }
  },
  {
    "title": "Exercise",
    "icon": "./src/images/icon-exercise.svg",
    "ellipsi": "./src/images/icon-ellipsis.svg",
    "timeframes": {
      "daily": {
        "current": 1,
        "previous": 1
      },
      "weekly": {
        "current": 4,
        "previous": 5
      },
      "monthly": {
        "current": 11,
        "previous": 18
      }
    }
  },
  {
    "title": "Social",
    "icon": "./src/images/icon-social.svg",
    "ellipsi": "./src/images/icon-ellipsis.svg",
    "timeframes": {
      "daily": {
        "current": 1,
        "previous": 3
      },
      "weekly": {
        "current": 5,
        "previous": 10
      },
      "monthly": {
        "current": 21,
        "previous": 23
      }
    }
  },
  {
    "title": "Self Care",
    "icon": "./src/images/icon-self-care.svg",
    "ellipsi": "./src/images/icon-ellipsis.svg",
    "timeframes": {
      "daily": {
        "current": 0,
        "previous": 1
      },
      "weekly": {
        "current": 2,
        "previous": 2
      },
      "monthly": {
        "current": 7,
        "previous": 11
      }
    }
  }
]

const $sectionCards = document.getElementById('activities');
const $buttons = document.querySelectorAll('button[data-action]');
const $fragment = document.createDocumentFragment();

function handleSelected(button) {
  $buttons.forEach(button => button.classList.remove('selected'));
  button.classList.add('selected');
}

function calcTime(id) {
  if (id === 'daily') {
    return 'Yesterday'
  }
  if (id === 'weekly') {
    return 'Last Wek'
  }
  if (id === 'monthly') {
    return 'Last Month'
  }
}

function clearCards() {
  const $activities = document.querySelectorAll('.card-activity');
  if ($activities.length) {
    $activities.forEach(activity => activity.remove())
  }
}

{/* <article class="card-activity">
        <img class="activity-icon">
        <div class="card-activity__info">
          <div class="card-activity__info-left">
            <span class="activity-title"></span>
            <span class="activity-time"></span>
          </div>
          <div class="card-activity__info-right">
            <img class="activity-ellipsi">
            <span class="activity-moment"></span>
          </div>
        </div>
      </article> */}

function renderCards(option) {
  clearCards();
  let time = calcTime(option);
  db.forEach(el => {
    const $cardActivity = document.createElement('article');
    const $activityIcon = document.createElement('img');
    const $activityEllipsi = document.createElement('img');
    const $cardActivityInfo = document.createElement('div');
    const $cardActivityInfoLeft = document.createElement('div');
    const $cardActivityInfoRight = document.createElement('div');
    const $activityTitle = document.createElement('span');
    const $activityTime = document.createElement('span');
    const $activityMoment = document.createElement('span');

    // add class
    $cardActivity.classList.add('card-activity');
    $cardActivity.classList.add(`${el.title.replace(' ','-').toLowerCase()}`);
    $cardActivityInfo.classList.add('card-activity__info');
    $cardActivityInfoLeft.classList.add('card-activity__info-left');
    $activityIcon.classList.add('icon-activity');
    $cardActivityInfoRight.classList.add('card-activity__info-right');
    
    // add icons
    $activityIcon.src = el.icon;
    $activityIcon.alt = el.title;
    $activityEllipsi.src = el.ellipsi;
    $activityIcon.alt = 'ellipsi';
    
    $activityMoment.textContent = time;
    $activityTitle.textContent = el.title;
    $activityTime.textContent = `${el.timeframes[option].current}hrs`
    $cardActivityInfoLeft.appendChild($activityTitle);
    $cardActivityInfoLeft.appendChild($activityTime);
    $cardActivityInfo.appendChild($cardActivityInfoLeft);
    
    $cardActivityInfoRight.appendChild($activityEllipsi);
    $cardActivityInfoRight.appendChild($activityMoment)
    $cardActivityInfo.appendChild($cardActivityInfoRight);

    $cardActivity.appendChild($activityIcon);
    $cardActivity.appendChild($cardActivityInfo);

    $fragment.appendChild($cardActivity);
  })
  // clearCards();
  $sectionCards.appendChild($fragment);
}

$buttons.forEach(button => {
  button.addEventListener('click', e => {
    // selected button
    handleSelected(button);
    const option = button.dataset.action;
    // render cards
    renderCards(option);
  })
})