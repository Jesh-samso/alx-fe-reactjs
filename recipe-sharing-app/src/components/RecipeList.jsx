import { Link } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

const RecipeList = () => {
const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
const recipes = useRecipeStore((state) => state.recipes);
const searchTerm = useRecipeStore((state) => state.searchTerm);

const listToDisplay = searchTerm.trim() === "" ? recipes : filteredRecipes;

return ( <div>
{listToDisplay.map((recipe) => (
<div key={recipe.id} style={{ marginBottom: "20px" }}> <h3>
<Link to={`/recipe/${recipe.id}`}>
{recipe.title} </Link> </h3> <p>{recipe.description}</p> </div>
))} </div>
);
};

export default RecipeList;
