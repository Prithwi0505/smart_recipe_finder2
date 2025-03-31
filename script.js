const API_KEY = "857d4e224fe04375a097b49b7e1122f7";

async function findRecipes() {
    let ingredients = document.getElementById("ingredientInput").value.trim();
    let diet = document.getElementById("dietFilter") ? document.getElementById("dietFilter").value : "";

    if (!ingredients) {
        alert("❗ Please enter at least one ingredient!");
        return;
    }

    let url = `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${ingredients}&diet=${diet}&number=6&addRecipeInformation=true&apiKey=${API_KEY}`;

    console.log("📡 Fetching recipes from:", url); 

    try {
        let response = await fetch(url);
        let data = await response.json();

        console.log("📜 API Response:", data); 

        if (data.results && data.results.length > 0) {
            displayRecipes(data.results);
        } else {
            alert("⚠️ No recipes found! Try different ingredients.");
        }
    } catch (error) {
        console.error("❌ Error fetching recipes:", error);
        alert("🚨 Failed to fetch recipes. Check your API Key and internet connection.");
    }
}

function displayRecipes(recipes) {
    let recipeContainer = document.getElementById("recipeResults");
    recipeContainer.innerHTML = "";

    recipes.forEach(recipe => {
        let recipeCard = document.createElement("div");
        recipeCard.classList.add("col-md-4", "mb-4");

        recipeCard.innerHTML = `
            <div class="card">
                <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.title}</h5>
                    <a href="${recipe.sourceUrl}" target="_blank" class="btn btn-success">View Recipe</a>
                </div>
            </div>
        `;

        recipeContainer.appendChild(recipeCard);
    });
}


const darkModeToggle = document.getElementById("darkModeToggle");


if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️ Light Mode";
}


darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
        darkModeToggle.textContent = "☀️ Light Mode";
    } else {
        localStorage.setItem("darkMode", "disabled");
        darkModeToggle.textContent = "🌙 Dark Mode";
    }
});
async function findRecipes() {
    const recipeResults = document.getElementById("recipeResults");
    recipeResults.innerHTML = ""; // Clear previous results
    recipeResults.style.display = "none"; // Hide initially

    const query = document.getElementById("ingredientInput").value.trim(); // Get user input

    if (!query) {
        alert("Please enter at least one ingredient.");
        return;
    }

    const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.meals) {
            recipeResults.innerHTML = "<p>No recipes found. Try different ingredients.</p>";
            recipeResults.style.display = "block";
            return;
        }

        recipeResults.style.display = "block"; // Show results
        recipeResults.classList.add("has-content");

        data.meals.forEach(meal => {
            let recipeCard = document.createElement("div");
            recipeCard.classList.add("card");
            recipeCard.innerHTML = `
                <h3>${meal.strMeal}</h3>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="150">
            `;
            recipeResults.appendChild(recipeCard);
        });

    } catch (error) {
        console.error("Error fetching recipes:", error);
        recipeResults.innerHTML = "<p>Something went wrong. Please try again later.</p>";
        recipeResults.style.display = "block";
    }
}



