function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const darkModeEnabled = document.body.classList.contains("dark-mode");

    // Save preference in localStorage
    localStorage.setItem("darkMode", darkModeEnabled);

    // Update label text
    document.getElementById("darkModeLabel").textContent = darkModeEnabled ? "Dark Mode" : "Light Mode";

    // Update slider position
    document.getElementById("darkModeToggle").checked = darkModeEnabled;
}

// Apply Dark Mode on Page Load
window.onload = function () {
    const darkModeEnabled = localStorage.getItem("darkMode") === "true";
    
    if (darkModeEnabled) {
        document.body.classList.add("dark-mode");
        document.getElementById("darkModeToggle").checked = true;
        document.getElementById("darkModeLabel").textContent = "Dark Mode";
    }
};

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchButton").addEventListener("click", findRecipes);
});

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

    let apiKey = "YOUR_API_KEY"; // Replace with your API key
    let apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data);
            displayRecipes(data);
        })
        .catch(error => console.error("Error fetching recipes:", error));
}

function displayRecipes(recipes) {
    let resultsContainer = document.getElementById("recipeResults");
    resultsContainer.innerHTML = ""; // Clear previous results

    if (recipes.length === 0) {
        resultsContainer.innerHTML = "<p>No recipes found.</p>";
        return;
    }

    recipes.forEach(recipe => {
        let recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        recipeCard.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p>Used ingredients: ${recipe.usedIngredientCount}</p>
            <p>Missed ingredients: ${recipe.missedIngredientCount}</p>
        `;

        resultsContainer.appendChild(recipeCard);
    });
}
