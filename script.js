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

// 🔹 Fetch Recipes from API
async function findRecipes() {
    const recipeResults = document.getElementById("recipeResults");
    recipeResults.innerHTML = "";
    recipeResults.style.display = "none";

    const query = document.getElementById("ingredientInput").value.trim();

    if (!query) {
        alert("Please enter at least one ingredient.");
        return;
    }

    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.meals) {
            recipeResults.innerHTML = "<p>No recipes found. Try another keyword.</p>";
            recipeResults.style.display = "block";
            return;
        }

        recipeResults.style.display = "block";
        recipeResults.classList.add("has-content");

        data.meals.forEach(meal => {
            let recipeCard = document.createElement("div");
            recipeCard.classList.add("card");
            recipeCard.innerHTML = `
                <h3>${meal.strMeal}</h3>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="150">
                <p><a href="${meal.strYoutube}" target="_blank">Watch Recipe Video</a></p>
            `;
            recipeResults.appendChild(recipeCard);
        });

    } catch (error) {
        console.error("Error fetching recipes:", error);
        recipeResults.innerHTML = "<p>Something went wrong. Please try again later.</p>";
        recipeResults.style.display = "block";
    }
}
