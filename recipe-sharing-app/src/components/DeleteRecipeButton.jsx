import { useRecipeStore } from '../recipeStore';
import { useNavigate } from 'react-router-dom';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteRecipe(recipeId);
    alert("Recipe deleted!");
    navigate("/");
  };

  return (
    <button
      style={{ background: "red", color: "white", marginTop: 10 }}
      onClick={handleDelete}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
