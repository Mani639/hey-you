const startButton = document.getElementById("start-button");

const welcomeScreen = document.getElementById("welcome-screen");
const questionScreen = document.getElementById("question-screen");
const yesScreen = document.getElementById("yes-screen");
const dateScreen = document.getElementById("date-screen");

const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");

const answerArea = document.getElementById("answer-area");
const escapeMessage = document.getElementById("escape-message");

const dateButton = document.getElementById("date-button");

const lockDateButton = document.getElementById("lock-date-button");

const datePicker = document.getElementById("date-picker");

const datePreview = document.getElementById("date-preview");

const foodScreen = document.getElementById("food-screen");

const foodOptions = document.querySelectorAll(".food-option");

const foodReaction = document.getElementById("food-reaction");

const foodNextButton = document.getElementById("food-next-button");

const confirmedScreen = document.getElementById("confirmed-screen");

const confirmedDate = document.getElementById("confirmed-date");

const confirmedFood = document.getElementById("confirmed-food");

const finalButton = document.getElementById("final-button");

const finalScreen = document.getElementById("final-screen");

const secretButton = document.getElementById("secret-button");

const secretMessage = document.getElementById("secret-message");

/* =========================================
   SCREEN TRANSITION
========================================= */

startButton.addEventListener("click", () => {
  welcomeScreen.classList.remove("active");

  setTimeout(() => {
    questionScreen.classList.add("active");
  }, 250);
});

/* =========================================
   YES BUTTON
========================================= */

yesButton.addEventListener("click", () => {
  console.log("SHE SAID YES! 💕");

  questionScreen.classList.remove("active");

  if (noButton.parentElement !== answerArea) {
    answerArea.appendChild(noButton);
  }

  noButton.style.position = "";
  noButton.style.left = "";
  noButton.style.top = "";
  noButton.style.transform = "";

  escapeMessage.textContent = "";

  setTimeout(() => {
    yesScreen.classList.add("active");
  }, 250);
});

/* =========================================
   NO BUTTON — THE ESCAPE ARTIST
========================================= */

let escapeCount = 0;

const escapeMessages = [
  "Hmm... try again. 👀",
  "Nice try. 😌",
  "You almost got me there.",
  "Nope, too slow. 😂",
  "Are you sure about that?",
  "I don't think so. 🙃",
];

function moveNoButton() {
  escapeCount++;

  if (noButton.parentElement !== document.body) {
    document.body.appendChild(noButton);
  }

  noButton.style.position = "fixed";

  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;

  const padding = 25;

  const maxX = window.innerWidth - buttonWidth - padding;
  const maxY = window.innerHeight - buttonHeight - padding;

  const yesRect = yesButton.getBoundingClientRect();

  let x;
  let y;

  let validPosition = false;

  for (let attempt = 0; attempt < 50; attempt++) {
    x = padding + Math.random() * Math.max(1, maxX - padding);

    y = padding + Math.random() * Math.max(1, maxY - padding);

    const noRect = {
      left: x,
      right: x + buttonWidth,
      top: y,
      bottom: y + buttonHeight,
    };

    const overlapsYes =
      noRect.left < yesRect.right &&
      noRect.right > yesRect.left &&
      noRect.top < yesRect.bottom &&
      noRect.bottom > yesRect.top;

    if (!overlapsYes) {
      validPosition = true;
      break;
    }
  }

  if (!validPosition) {
    x = padding;
    y = padding;
  }

  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
  noButton.style.transform = "none";

  const messageIndex = Math.min(
    escapeCount - 1,
    escapeMessages.length - 1
  );

  escapeMessage.textContent = escapeMessages[messageIndex];
}

/* =========================================
   DESKTOP
========================================= */

noButton.addEventListener("mouseenter", () => {
  moveNoButton();
});

/* =========================================
   MOBILE
========================================= */

noButton.addEventListener("touchstart", (event) => {
  event.preventDefault();

  moveNoButton();
});

/* =========================================
   BACKUP CLICK
========================================= */

noButton.addEventListener("click", (event) => {
  event.preventDefault();

  moveNoButton();
});

/* =========================================
   DATE SCREEN
========================================= */

dateButton.addEventListener("click", () => {
  console.log("Let's pick a date. 📅");

  yesScreen.classList.remove("active");

  setTimeout(() => {
    dateScreen.classList.add("active");
  }, 250);
});

/* =========================================
   DATE SELECTION
========================================= */

function updateDatePreview() {
  const selectedDate = datePicker.value;

  if (!selectedDate) {
    datePreview.textContent = "Pick a date...";

    lockDateButton.classList.remove("ready");

    return;
  }

  const dateObject = new Date(`${selectedDate}T00:00:00`);

  const formattedDate = dateObject.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  datePreview.textContent = `${formattedDate} 💗`;

  lockDateButton.classList.add("ready");
}

/*
 * Update whenever she changes the date.
 */

datePicker.addEventListener("change", updateDatePreview);

/* =========================================
   LOCK THE DATE
========================================= */

lockDateButton.addEventListener("click", () => {
  if (!datePicker.value) {
    return;
  }

  localStorage.setItem("date", datePicker.value);

  console.log("Date selected:", datePicker.value);

  dateScreen.classList.remove("active");

  setTimeout(() => {
    foodScreen.classList.add("active");
  }, 250);
});

/* =========================================
   FOOD SELECTION
========================================= */

let selectedFood = null;

const foodMessages = {
  Pizza: "Classic. You have excellent taste. 🍕",

  Burger: "Solid choice. I approve. 🍔",

  Sandwich: "A sandwich? Okay, fancy. 🥪",

  Noodles: "Okayyy, now we're talking. 🍜",

  Tacos: "Tacos? This date is already looking good. 🌮",

  "Dessert first": "Honestly... this might be the correct answer. 🍦",
};

foodOptions.forEach((option) => {
  option.addEventListener("click", () => {

    foodOptions.forEach((item) => {
      item.classList.remove("selected");
    });

    option.classList.add("selected");

    selectedFood = option.dataset.food;

    localStorage.setItem("food", selectedFood);

    foodReaction.textContent = foodMessages[selectedFood];

    foodNextButton.classList.add("ready");
  });
});

/* =========================================
   CONTINUE TO CONFIRMATION
========================================= */

foodNextButton.addEventListener("click", () => {
  if (!selectedFood) {
    return;
  }

  console.log("Food selected:", selectedFood);

  /*
   * Get saved date.
   */

  const savedDate = localStorage.getItem("date");

  /*
   * Format the date.
   */

  if (savedDate) {
    const dateObject = new Date(`${savedDate}T00:00:00`);

    confirmedDate.textContent = dateObject.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }

  /*
   * Show selected food.
   */

  confirmedFood.textContent = `${selectedFood} ${getFoodEmoji(selectedFood)}`;

  /*
   * Move to confirmation screen.
   */

  foodScreen.classList.remove("active");

  setTimeout(() => {
    confirmedScreen.classList.add("active");
  }, 250);
});

/* =========================================
   FOOD EMOJI
========================================= */

function getFoodEmoji(food) {
  const emojis = {
    Pizza: "🍕",
    Burger: "🍔",
    Sandwich: "🥪",
    Noodles: "🍜",
    Tacos: "🌮",
    "Dessert first": "🍦",
  };

  return emojis[food] || "🍽️";
}

/* =========================================
   FINAL SCREEN
========================================= */

finalButton.addEventListener("click", () => {
  console.log("One last thing... 💌");

  confirmedScreen.classList.remove("active");

  setTimeout(() => {
    finalScreen.classList.add("active");
  }, 250);
});

/* =========================================
   SECRET MESSAGE
========================================= */

secretButton.addEventListener("click", () => {
  secretMessage.classList.add("visible");

  secretButton.textContent = "💗 You found it";
});
