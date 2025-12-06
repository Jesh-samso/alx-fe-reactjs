import React from 'react';
import { useRecipeStore } from '../recipeStore';

const SearchBar = () => {
const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);

const handleSearch = (event) => {
const term = event.target.value;
setSearchTerm(term); // filtering happens automatically in the store
};

return (
<input
type="text"
placeholder="Search recipes..."
onChange={handleSearch}
style={{ padding: "8px", marginBottom: "15px", width: "100%" }}
/>
);
};

export default SearchBar;
