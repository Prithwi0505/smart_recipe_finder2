async function findRecipes() {
    let ingredients = document.getElementById("ingredientInput").value;
    if (!ingredients) {
        alert("Please enter at least one ingredient!");
        return;
    }

    let apiKey = "YOUR_SPOONACULAR_API_KEY"; // Replace with your API key
    let url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${apiKey}`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        displayRecipes(data);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

function displayRecipes(recipes) {
    let recipeContainer = document.getElementById("recipeResults");
    recipeContainer.innerHTML = ""; // Clear previous results

    recipes.forEach(recipe => {
        let recipeCard = document.createElement("div");
        recipeCard.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}" width="200">
        `;
        recipeContainer.appendChild(recipeCard);
    });
}
