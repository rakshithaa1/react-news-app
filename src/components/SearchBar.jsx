import { FiSearch } from "react-icons/fi";

function SearchBar({
  searchTerm,
  setSearchTerm,
  handleSearch,
}) {
  return (
    <>
      <input
        type="text"
        placeholder="Search news..."
        value={searchTerm}
        onChange={(event) =>
          setSearchTerm(event.target.value)
        }
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSearch();
          }
        }}
      />

      <button onClick={handleSearch} aria-label="Search news">
        <FiSearch />
      </button>
    </>
  );
}

export default SearchBar;