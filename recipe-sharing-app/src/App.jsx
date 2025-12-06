import React from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";

import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import FavoritesList from "./components/FavoritesList";
import RecommendationsList from "./components/RecommendationsList";

const RecipeDetailWrapper = () => {
  const { id } = useParams();
  return <div>Recipe Detail Page for ID: {id}</div>;
};

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Recipe Sharing App</h1>

        <AddRecipeForm />
        <SearchBar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <RecipeList />
                <FavoritesList />
                <RecommendationsList />
              </>
            }
          />
          <Route path="/recipe/:id" element={<RecipeDetailWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
