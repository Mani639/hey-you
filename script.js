/* =========================================
   ELEMENT REFERENCES
========================================= */

const startButton = document.getElementById("start-button");

const welcomeScreen = document.getElementById("welcome-screen");
const questionScreen = document.getElementById("question-screen");
const yesScreen = document.getElementById("yes-screen");
const dateScreen = document.getElementById("date-screen");
const foodScreen = document.getElementById("food-screen");
const confirmedScreen = document.getElementById("confirmed-screen");
const finalScreen = document.getElementById("final-screen");

const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");

const answerArea = document.getElementById("answer-area");
const escapeMessage = document.getElementById("escape-message");

const dateButton = document.getElementById("date-button");
const lockDateButton = document.getElementById("lock-date-button");
const datePicker = document.getElementById("date-picker");
const datePreview = document.getElementById("date-preview");

const foodOptions = document.querySelectorAll(".food-option");
const foodReaction = document.getElementById("food-reaction");
const foodNextButton = document.getElementById("food-next-button");

const confirmedDate = document.getElementById("confirmed-date");
const confirmedFood = document.getElementById("confirmed-food");

const finalButton = document.getElementById("final-button");

const secretButton = document.getElementById("secret-button");
const secretMessage = document.getElementById("secret-message");


/* =========================================
   SCREEN TRANSITION HELPER
========================================= */

function showScreen(currentScreen, nextScreen) {
  currentScreen.classList.remove("active");

  setTimeout(() => {
    nextScreen.classList.add("active");
  }, 250);
}


/* =========================================
   SCREEN 1 → SCREEN 2
========================================= */

startButton.addEventListener("click", () => {
  showScreen(welcomeScreen, questionScreen);
});


/* =========================================
   YES BUTTON
========================================= */

yesButton.addEventListener("click", () => {
  console.log("SHE SAID YES! 💕");

  /*
   * Put the NO button back inside
   * the answer area.
   */

  if (noButton.parentElement !== answerArea) {
    answerArea.appendChild(noButton);
  }

  /*
   * Reset NO button styles.
   */

  noButton.style.position = "";
  noButton.style.left = "";
  noButton.style.top = "";
  noButton.style.transform = "";

  /*
   * Clear escape message.
   */

  escapeMessage.textContent = "";

  /*
   * Reset escape counter.
   */

  escapeCount = 0;

  /*
   * Move to YES screen.
   */

  showScreen(questionScreen, yesScreen);
});


/* =========================================
   NO BUTTON — ESCAPE ARTIST
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
   * Move the button to body so it can
   * escape outside the card.
   */

  if (noButton.parentElement !== document.body) {
    document.body.appendChild(noButton);
  }

  noButton.style.position = "fixed";

  /*
   * Get button dimensions.
   */

  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;

  /*
   * Keep button away from screen edges.
   */

  const padding = 25;

  const maxX = Math.max(
    padding,
    window.innerWidth - buttonWidth - padding
  );

  const maxY = Math.max(
    padding,
    window.innerHeight - buttonHeight - padding
  );

  /*
   * Get YES button position.
   */

  const yesRect = yesButton.getBoundingClientRect();

  let x = padding;
  let y = padding;

  let validPosition = false;

  /*
   * Try multiple random positions.
   */

  for (let attempt = 0; attempt < 50; attempt++) {
    x = padding + Math.random() * Math.max(0, maxX - padding);

    y = padding + Math.random() * Math.max(0, maxY - padding);

    const noRect = {
      left: x,
      right: x + buttonWidth,
      top: y,
      bottom: y + buttonHeight,
    };

    /*
     * Check whether NO overlaps YES.
     */

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
   * Fallback position.
   */

  if (!validPosition) {
    x = padding;
    y = padding;
  }

  /*
   * Apply position.
   */

  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
  noButton.style.transform = "none";

  /*
   * Show playful message.
   */

  const messageIndex = Math.min(
    escapeCount - 1,
    escapeMessages.length - 1
  );

  escapeMessage.textContent = escapeMessages[messageIndex];
}


/* =========================================
   DESKTOP — MOUSE
========================================= */

noButton.addEventListener("mouseenter", () => {
  moveNoButton();
});


/* =========================================
   MOBILE — TOUCH
========================================= */

noButton.addEventListener(
  "touchstart",
  (event) => {
    event.preventDefault();

    moveNoButton();
  },
  { passive: false }
);


/* =========================================
   BACKUP CLICK
========================================= */

noButton.addEventListener("click", (event) => {
  event.preventDefault();

  moveNoButton();
});


/* =========================================
   SCREEN 3 → SCREEN 4
========================================= */

dateButton.addEventListener("click", () => {
  console.log("Let's pick a date. 📅");

  showScreen(yesScreen, dateScreen);
});


/* =========================================
   DATE SETUP
========================================= */

/*
 * Prevent selecting a date in the past.
 */

function setMinimumDate() {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");

  const day = String(today.getDate()).padStart(2, "0");

  const todayString = `${year}-${month}-${day}`;

  datePicker.min = todayString;
}

setMinimumDate();


/* =========================================
   DATE PREVIEW
========================================= */

function updateDatePreview() {
  const selectedDate = datePicker.value;

  /*
   * No date selected.
   */

  if (!selectedDate) {
    datePreview.textContent = "Pick a date...";

    lockDateButton.classList.remove("ready");

    return;
  }

  /*
   * Convert selected date.
   */

  const dateObject = new Date(`${selectedDate}T00:00:00`);

  /*
   * Format date.
   */

  const formattedDate = dateObject.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  /*
   * Show preview.
   */

  datePreview.textContent = `${formattedDate} 💗`;

  /*
   * Enable button.
   */

  lockDateButton.classList.add("ready");
}


/*
 * Update when date changes.
 */

datePicker.addEventListener("change", updateDatePreview);


/* =========================================
   SCREEN 4 → SCREEN 5
========================================= */

lockDateButton.addEventListener("click", () => {
  /*
   * Don't continue without a date.
   */

  if (!datePicker.value) {
    return;
  }

  /*
   * Save date.
   */

  localStorage.setItem("date", datePicker.value);

  console.log("Date selected:", datePicker.value);

  /*
   * Move to food screen.
   */

  showScreen(dateScreen, foodScreen);
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

  "Dessert first":
    "Honestly... this might be the correct answer. 🍦",
};


/*
 * Add click event to every food option.
 */

foodOptions.forEach((option) => {
  option.addEventListener("click", () => {
    /*
     * Remove selection from all options.
     */

    foodOptions.forEach((item) => {
      item.classList.remove("selected");
    });

    /*
     * Select clicked option.
     */

    option.classList.add("selected");

    /*
     * Store selected food.
     */

    selectedFood = option.dataset.food;

    /*
     * Save to localStorage.
     */

    localStorage.setItem("food", selectedFood);

    /*
     * Show reaction.
     */

    foodReaction.textContent =
      foodMessages[selectedFood] || "Good choice. 😌";

    /*
     * Enable next button.
     */

    foodNextButton.classList.add("ready");
  });
});


/* =========================================
   SCREEN 5 → SCREEN 6
========================================= */

foodNextButton.addEventListener("click", () => {
  /*
   * Don't continue without selecting food.
   */

  if (!selectedFood) {
    return;
  }

  console.log("Food selected:", selectedFood);

  /*
   * Get saved date.
   */

  const savedDate = localStorage.getItem("date");

  /*
   * Format saved date.
   */

  if (savedDate) {
    const dateObject = new Date(`${savedDate}T00:00:00`);

    const formattedDate = dateObject.toLocaleDateString(
      "en-US",
      {
        weekday: "short",
        month: "short",
        day: "numeric",
      }
    );

    confirmedDate.textContent = formattedDate;
  } else {
    confirmedDate.textContent = "—";
  }

  /*
   * Show selected food.
   */

  confirmedFood.textContent =
    `${selectedFood} ${getFoodEmoji(selectedFood)}`;

  /*
   * Move to confirmation screen.
   */

  showScreen(foodScreen, confirmedScreen);
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
   SCREEN 6 → SCREEN 7
========================================= */

finalButton.addEventListener("click", () => {
  console.log("One last thing... 💌");

  showScreen(confirmedScreen, finalScreen);
});


/* =========================================
   SECRET MESSAGE
========================================= */

secretButton.addEventListener("click", () => {
  /*
   * Show secret message.
   */

  secretMessage.classList.add("visible");

  /*
   * Change button text.
   */

  secretButton.innerHTML = "💗 You found it";
});
