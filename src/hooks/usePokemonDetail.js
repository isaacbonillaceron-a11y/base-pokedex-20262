import { useEffect, useState } from 'react';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Picks the Spanish flavor entry from a pokemon-species genus/flavor list,
 * falling back to English if Spanish isn't available.
 */
function pickSpanishEntry(entries, textField) {
  const spanishEntry = entries.find((entry) => entry.language.name === 'es');
  const englishEntry = entries.find((entry) => entry.language.name === 'en');
  const chosenEntry = spanishEntry || englishEntry;
  return chosenEntry ? chosenEntry[textField] : '';
}

/**
 * Fetches the full detail (base stats endpoint + species endpoint) needed
 * to render the left-hand preview panel for a given Pokémon id.
 */
export function usePokemonDetail(pokemonId) {
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonId) return;

    let isCancelled = false;

    async function fetchPokemonDetail() {
      try {
        setIsLoading(true);
        setError(null);

        const [pokemonResponse, speciesResponse] = await Promise.all([
          fetch(`${POKEAPI_BASE_URL}/pokemon/${pokemonId}`),
          fetch(`${POKEAPI_BASE_URL}/pokemon-species/${pokemonId}`),
        ]);

        if (!pokemonResponse.ok || !speciesResponse.ok) {
          throw new Error('No se pudo obtener la información del Pokémon.');
        }

        const pokemonData = await pokemonResponse.json();
        const speciesData = await speciesResponse.json();

        const speciesCategory = pickSpanishEntry(speciesData.genera, 'genus');

        const formattedDetail = {
          id: pokemonData.id,
          name: pokemonData.name,
          species: speciesCategory || 'Desconocido',
          types: pokemonData.types.map((typeEntry) => typeEntry.type.name),
          height: pokemonData.height,
          weight: pokemonData.weight,
          spriteUrl:
            pokemonData.sprites.front_default ||
            pokemonData.sprites.other?.['official-artwork']?.front_default ||
            '',
        };

        if (!isCancelled) {
          setPokemonDetail(formattedDetail);
        }
      } catch (fetchError) {
        if (!isCancelled) {
          setError(fetchError.message);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchPokemonDetail();

    return () => {
      isCancelled = true;
    };
  }, [pokemonId]);

  return { pokemonDetail, isLoading, error };
}
