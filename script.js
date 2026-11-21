// --- Step 1: Find all elements ---
const waterInput = document.getElementById("water-input");
const waterButton = document.getElementById("save-water");
const waterStatus = document.getElementById("water-status");

const sleepInput = document.getElementById("sleep-input");
const sleepButton = document.getElementById("save-sleep");
const sleepStatus = document.getElementById("sleep-status");

const foodYesButton = document.getElementById("save-food-yes");
const foodNoButton = document.getElementById("save-food-no");
const foodStatus = document.getElementById("food-status");

const summary = document.getElementById("summary");

// --- Step 2: Load saved data from localStorage ---
let healthData = JSON.parse(localStorage.getItem("healthData")) || {
    water: null,
    sleep: null,
    food: null
};

// --- Step 3: A helper to save and update the screen ---
function saveAndRender() {
    // Save to browser
    localStorage.setItem("healthData", JSON.stringify(healthData));

    // Update water status
    if (healthData.water !== null) {
        waterStatus.textContent = `You drank ${healthData.water} glasses of water today.`;
    } else {
        waterStatus.textContent = "Not logged yet.";
    }

    // Update sleep status
    if (healthData.sleep !== null) {
        sleepStatus.textContent = `You slept ${healthData.sleep} hours last night.`;
    } else {
        sleepStatus.textContent = "Not logged yet.";
    }

    // Update food status
    if (healthData.food === "yes") {
        foodStatus.textContent = "You ate three proper meals today. Well done!";
    } else if (healthData.food === "no") {
        foodStatus.textContent = "You didn't eat properly today. Try to do better tomorrow.";
    } else {
        foodStatus.textContent = "Not logged yet.";
    }

    // Build the summary
    let summaryText = "";
    if (healthData.water !== null && healthData.sleep !== null && healthData.food !== null) {
        summaryText = `Today's check-in: ${healthData.water} glasses of water, ${healthData.sleep} hours of sleep, and `;
        summaryText += healthData.food === "yes" ? "you ate three proper meals." : "you didn't eat three proper meals.";
    } else {
        summaryText = "Complete your check-ins above to see your summary.";
    }
    summary.textContent = summaryText;
}

// --- Step 4: The click events ---

waterButton.addEventListener("click", function () {
    const value = parseInt(waterInput.value);
    if (isNaN(value) || value < 0) {
        alert("Please enter a valid number of glasses.");
        return;
    }
    healthData.water = value;
    waterInput.value = "";
    saveAndRender();
});

sleepButton.addEventListener("click", function () {
    const value = parseFloat(sleepInput.value);
    if (isNaN(value) || value < 0) {
        alert("Please enter a valid number of hours.");
        return;
    }
    healthData.sleep = value;
    sleepInput.value = "";
    saveAndRender();
});

foodYesButton.addEventListener("click", function () {
    healthData.food = "yes";
    saveAndRender();
});

foodNoButton.addEventListener("click", function () {
    healthData.food = "no";
    saveAndRender();
});

// --- Step 5: Run on page load ---
saveAndRender();
