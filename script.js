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

const timePicker = document.getElementById("time-picker");

const datePreview = document.getElementById("date-preview");

const foodScreen = document.getElementById("food-screen");

const foodOptions = document.querySelectorAll(".food-option");

const foodReaction = document.getElementById("food-reaction");

const foodNextButton = document.getElementById("food-next-button");

const confirmedScreen = document.getElementById("confirmed-screen");

const confirmedDate = document.getElementById("confirmed-date");

const confirmedTime = document.getElementById("confirmed-time");

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

  /*
   * Put the escaped NO button back where it belongs.
   * This is important because we moved it to <body>.
   */

  if (noButton.parentElement !== answerArea) {
    answerArea.appendChild(noButton);
  }

  noButton.style.position = "";
  noButton.style.left = "";
  noButton.style.top = "";
  noButton.style.transform = "";

  escapeMessage.textContent = "";

  /*
   * Show the YES reaction screen.
   */

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

  /*
   * Move the button to the document itself,
   * instead of keeping it inside the card.
   */

  if (noButton.parentElement !== document.body) {
    document.body.appendChild(noButton);
  }

  noButton.style.position = "fixed";

  /*
   * Button dimensions
   */

  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;

  /*
   * Keep a comfortable distance from
   * the edges of the screen.
   */

  const padding = 25;

  const maxX = window.innerWidth - buttonWidth - padding;

  const maxY = window.innerHeight - buttonHeight - padding;

  /*
   * The YES button should never be blocked.
   */

  const yesRect = yesButton.getBoundingClientRect();

  let x;
  let y;

  let validPosition = false;

  /*
   * Keep trying random positions until
   * we find one that doesn't overlap YES.
   */

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

  /*
   * Fallback position if random placement
   * somehow fails.
   */

  if (!validPosition) {
    x = padding;
    y = padding;
  }

  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
  noButton.style.transform = "none";

  /*
   * Show a playful message.
   */

  const messageIndex = Math.min(escapeCount - 1, escapeMessages.length - 1);

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

dateButton.addEventListener("click", () => {
  console.log("Let's pick a date. 📅");

  yesScreen.classList.remove("active");

  setTimeout(() => {
    dateScreen.classList.add("active");
  }, 250);
});

/* =========================================
   DATE & TIME SELECTION
========================================= */

function updateDatePreview() {
  const selectedDate = datePicker.value;
  const selectedTime = timePicker.value;

  if (!selectedDate || !selectedTime) {
    datePreview.textContent = "Pick a date and time...";

    lockDateButton.classList.remove("ready");

    return;
  }

  /*
   * Convert the selected date into
   * something more romantic/readable.
   */

  const dateObject = new Date(`${selectedDate}T${selectedTime}`);

  const formattedDate = dateObject.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const formattedTime = dateObject.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  datePreview.textContent = `${formattedDate} · ${formattedTime} 💗`;

  lockDateButton.classList.add("ready");
}

/*
 * Update whenever she changes the date.
 */

datePicker.addEventListener("change", updateDatePreview);

/*
 * Update whenever she changes the time.
 */

timePicker.addEventListener("change", updateDatePreview);

/* =========================================
   LOCK THE DATE
========================================= */

lockDateButton.addEventListener("click", () => {
  if (!datePicker.value || !timePicker.value) {
    return;
  }

  localStorage.setItem("date", datePicker.value);

  localStorage.setItem("time", timePicker.value);

  console.log("Date selected:", datePicker.value);

  console.log("Time selected:", timePicker.value);

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
    /*
     * Remove selection from all cards.
     */

    foodOptions.forEach((item) => {
      item.classList.remove("selected");
    });

    /*
     * Select this card.
     */

    option.classList.add("selected");

    /*
     * Remember the food.
     */

    selectedFood = option.dataset.food;

    localStorage.setItem("food", selectedFood);

    /*
     * Change the little message.
     */

    foodReaction.textContent = foodMessages[selectedFood];

    /*
     * Enable next button.
     */

    foodNextButton.classList.add("ready");
  });
});

/* =========================================
   CONTINUE
========================================= */

foodNextButton.addEventListener("click", () => {
  if (!selectedFood) {
    return;
  }

  console.log("Food selected:", selectedFood);

  /*
   * Get saved date and time.
   */

  const savedDate = localStorage.getItem("date");

  const savedTime = localStorage.getItem("time");

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
   * Format the time.
   */

  if (savedTime) {
    const timeObject = new Date(`2000-01-01T${savedTime}`);

    confirmedTime.textContent = timeObject.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
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
