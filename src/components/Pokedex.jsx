import { useMemo, useState } from 'react';
import PokemonDetail from './PokemonDetail.jsx';
import PokemonList from './PokemonList.jsx';
import SearchBar from './SearchBar.jsx';
import { usePokemonList } from '../hooks/usePokemonList.js';

/**
 * Main Pokédex feature component. Owns the selection + search state and
 * composes the left preview panel with the right scrollable list.
 */
function Pokedex() {
  const { pokemonList, isLoading, error } = usePokemonList();
  const [selectedId, setSelectedId] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Every Pokémon the user has clicked on during this session counts
  // as "Propios" (owned), while "Vistos" reflects the full Pokédex
  // loaded from the API.
  const [inspectedIds, setInspectedIds] = useState(() => new Set([1]));

  function handleSelectPokemon(pokemonId) {
    setSelectedId(pokemonId);
    setInspectedIds((previousIds) => new Set(previousIds).add(pokemonId));
  }

  const filteredPokemonList = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    if (!normalizedSearch) return pokemonList;

    return pokemonList.filter((pokemon) => {
      const matchesName = pokemon.name.toLowerCase().includes(normalizedSearch);
      const matchesId = String(pokemon.id).includes(normalizedSearch);
      return matchesName || matchesId;
    });
  }, [pokemonList, searchTerm]);

  return (
    <div className="pokedex-shell">
      <div className="pokedex-top-bar">
        <span className="pokedex-title">Pokédex Nacional</span>
      </div>

      <div className="pokedex-body">
        <div className="pokedex-panel pokedex-panel-left">
          <PokemonDetail
            pokemonId={selectedId}
            seenCount={pokemonList.length}
            ownedCount={inspectedIds.size}
          />
        </div>

        <div className="pokedex-panel pokedex-panel-right">
          {isLoading && <div className="pokedex-status">Cargando Pokédex...</div>}
          {error && <div className="pokedex-status pokedex-status-error">{error}</div>}
          {!isLoading && !error && (
            <PokemonList
              pokemonList={filteredPokemonList}
              selectedId={selectedId}
              onSelectPokemon={handleSelectPokemon}
            />
          )}
        </div>
      </div>

      <div className="pokedex-bottom-bar">
        <button type="button" className="pokedex-button">
          <span className="pokedex-button-icon">✕</span> SALIR
        </button>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>
    </div>
  );
}

export default Pokedex;
