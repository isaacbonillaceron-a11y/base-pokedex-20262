function formatPokemonId(id) {
  return String(id).padStart(3, '0');
}

/**
 * Scrollable list of Pokémon ordered by id. The currently selected
 * Pokémon is highlighted and marked with a Pokéball icon.
 */
function PokemonList({ pokemonList, selectedId, onSelectPokemon }) {
  if (pokemonList.length === 0) {
    return <div className="pokemon-list-empty">No se encontraron resultados.</div>;
  }

  return (
    <ul className="pokemon-list" role="listbox" aria-label="Lista de Pokémon">
      {pokemonList.map((pokemon) => {
        const isSelected = pokemon.id === selectedId;

        return (
          <li
            key={pokemon.id}
            role="option"
            aria-selected={isSelected}
            className={`pokemon-list-item ${isSelected ? 'is-selected' : ''}`}
            onClick={() => onSelectPokemon(pokemon.id)}
          >
            <span className="pokemon-list-marker">
              {isSelected ? (
                <span className="pokeball-icon" aria-hidden="true" />
              ) : (
                <span className="pokemon-list-marker-empty" aria-hidden="true" />
              )}
            </span>
            <span className="pokemon-list-id">{formatPokemonId(pokemon.id)}</span>
            <span className="pokemon-list-name">{pokemon.name}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default PokemonList;
