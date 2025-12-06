import { create } from "zustand";

export const useRecipeStore = create((set) => ({
  // =======================
  // MAIN STATE
  // =======================
  recipes: [],
  searchTerm: "",
  filteredRecipes: [],

  // =======================
  // FAVORITES FEATURE
  // =======================
  favorites: [],

  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: [...state.favorites, recipeId],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // =======================
  // RECOMMENDATIONS FEATURE
  // =======================
  recommendations: [],

  generateRecommendations: () =>
    set((state) => {
      // simple logic: recommend favorite recipes
      const recommended = state.recipes.filter((recipe) =>
        state.favorites.includes(recipe.id)
      );

      return { recommendations: recommended };
    }),

  // =======================
  // CRUD FEATURES
  // =======================
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    })),

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

  // =======================
  // SEARCH FEATURE
  // =======================
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

  // =======================
  // SET ALL RECIPES DIRECTLY
  // =======================
  setRecipes: (recipes) => set({ recipes }),
}));
