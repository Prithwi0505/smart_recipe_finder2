async function findRecipes() {
    let ingredients = document.getElementById("ingredientInput").value;
    let diet = document.getElementById("dietFilter").value;
    
    if (!ingredients) {
        alert("Please enter at least one ingredient!");
        return;
    }

    let apiKey = "YOUR_SPOONACULAR_API_KEY";
    let url = `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${ingredients}&diet=${diet}&number=6&addRecipeInformation=true&apiKey=${946927191fe547f2a63839ad01262135}`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        displayRecipes(data.results);
    } catch (error) {
        console.error("Error fetching recipes:", error);
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
                    <button class="btn btn-outline-danger" onclick="saveFavorite('${recipe.id}', '${recipe.title}', '${recipe.image}', '${recipe.sourceUrl}')">❤️ Save</button>
                </div>
            </div>
        `;
        recipeContainer.appendChild(recipeCard);
    });
}

function saveFavorite(id, title, image, url) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    let recipe = { id, title, image, url };
    if (!favorites.some(r => r.id === id)) {
        favorites.push(recipe);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert("Recipe saved!");
    } else {
        alert("Already saved!");
    }
}
