document.addEventListener("DOMContentLoaded", function () {
    // Apply Dark Mode on Page Load
    const darkModeEnabled = localStorage.getItem("darkMode") === "true";
    if (darkModeEnabled) {
        document.body.classList.add("dark-mode");
        let toggleSwitch = document.getElementById("darkModeToggle");
        if (toggleSwitch) toggleSwitch.checked = true;

        let label = document.getElementById("darkModeLabel");
        if (label) label.textContent = "Dark Mode";
    }

    // Attach event listener to search button
    let searchButton = document.getElementById("searchButton");
    if (searchButton) {
        searchButton.addEventListener("click", findRecipes);
    }
});

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const darkModeEnabled = document.body.classList.contains("dark-mode");

    // Save preference in localStorage
    localStorage.setItem("darkMode", darkModeEnabled);

    // Update label text
    let label = document.getElementById("darkModeLabel");
    if (label) label.textContent = darkModeEnabled ? "Dark Mode" : "Light Mode";

    // Update slider position
    let toggleSwitch = document.getElementById("darkModeToggle");
    if (toggleSwitch) toggleSwitch.checked = darkModeEnabled;
}

function findRecipes() {
    let searchInput = document.getElementById("searchInput");

    if (!searchInput) {
        console.error("Error: Input field not found!");
        return;
    }

    let ingredients = searchInput.value.trim();

    if (ingredients === "") {
        alert("Please enter some ingredients!");
        return;
    }

    console.log("Searching recipes for:", ingredients);

    let apiKey = "857d4e224fe04375a097b49b7e1122f7"; // 🔹 Replace with your valid API key
    let apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("API request failed: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("API Response:", data);
            displayRecipes(data);
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
            let resultsContainer = document.getElementById("recipeResults");
            if (resultsContainer) {
                resultsContainer.innerHTML = "<p style='color:red;'>Error fetching recipes. Please try again later.</p>";
            }
        });
}

function displayRecipes(recipes) {
    let resultsContainer = document.getElementById("recipeResults");
    resultsContainer.innerHTML = ""; // Clear previous results

    if (!recipes || recipes.length === 0) {
        resultsContainer.innerHTML = "<p>No recipes found.</p>";
        return;
    }

    recipes.forEach(recipe => {
        let recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        // Spoonacular provides recipe links via `spoonacularSourceUrl`
        let recipeUrl = `https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, "-")}-${recipe.id}`;

        recipeCard.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p>Used ingredients: ${recipe.usedIngredientCount}</p>
            <p>Missed ingredients: ${recipe.missedIngredientCount}</p>
            <a href="${recipeUrl}" target="_blank">
                <button class="view-recipe-button">View Recipe</button>
            </a>
        `;

        resultsContainer.appendChild(recipeCard);
    });
}
