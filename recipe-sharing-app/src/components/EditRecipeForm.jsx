import { useState } from 'react';
import { useRecipeStore } from '../recipeStore';

const EditRecipeForm = ({ recipe }) => {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  const handleSubmit = (event) => {
    event.preventDefault();

    updateRecipe({
      ...recipe,
      title,
      description,
    });

    alert("Recipe updated!");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={(event) => setTitle(event.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />

      <textarea
        value={description}
        placeholder="Description"
        onChange={(event) => setDescription(event.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditRecipeForm;
