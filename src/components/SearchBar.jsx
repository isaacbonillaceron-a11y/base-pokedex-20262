/**
 * Search input placed in the lower control bar, next to the
 * "SALIR" and "PG AR/AB" retro buttons.
 */
function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <span className="search-bar-icon" aria-hidden="true">
        F5
      </span>
      <input
        type="text"
        className="search-bar-input"
        placeholder="BUSCAR por nombre o número..."
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        aria-label="Buscar Pokémon por nombre o número"
      />
    </div>
  );
}

export default SearchBar;
