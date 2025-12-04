import { create } from "zustand";

export const useRecipeStore = create((set) => ({
recipes: [],
searchTerm: "",
filteredRecipes: [],

addRecipe: (newRecipe) =>
set((state) => ({ recipes: [...state.recipes, newRecipe] })),

updateRecipe: (updatedRecipe) =>
set((state) => ({
recipes: state.recipes.map((recipe) =>
recipe.id === updatedRecipe.id ? updatedRecipe : recipe
),
})),

deleteRecipe: (id) =>
set((state) => ({
recipes: state.recipes.filter((recipe) => recipe.id !== id),
})),


setSearchTerm: (term) =>
set((state) => {
const filtered = state.recipes.filter((recipe) =>
recipe.title.toLowerCase().includes(term.toLowerCase())
);
return {
searchTerm: term,
filteredRecipes: filtered,
};
}),


filterRecipes: () =>
set((state) => ({
filteredRecipes: state.recipes.filter((recipe) =>
recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
),
})),

setRecipes: (recipes) => set({ recipes }),
}));
