import { useEffect, useState } from 'react';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Extracts the numeric id from a PokeAPI resource URL, e.g.
 * "https://pokeapi.co/api/v2/pokemon/25/" -> 25
 */

function extractIdFromUrl(resourceUrl) {
  const urlSegments = resourceUrl.split('/').filter(Boolean);
  return Number(urlSegments[urlSegments.length - 1]);
}

/**
 * Fetches a lightweight list of Pokémon (id + name only) used to populate
 * the scrollable list on the right side of the Pokédex. Loads the FULL
 * PokéAPI catalog (every Pokémon and form currently available), not just
 * a fixed generation, by first asking the API how many entries exist.
 */

export function usePokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchPokemonList() {
      try {
        setIsLoading(true);

        // Step 1: ask the API for the total count of Pokémon available.
        const countResponse = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=1`);
        if (!countResponse.ok) {
          throw new Error('No se pudo obtener el total de Pokémon.');
        }
        const countData = await countResponse.json();
        const totalPokemonCount = countData.count;

        // Step 2: fetch every entry in a single request using that total.
        const response = await fetch(
          `${POKEAPI_BASE_URL}/pokemon?limit=${totalPokemonCount}&offset=0`
        );
        
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de Pokemón.');
        }

        const data = await response.json();

        const formattedList = data.results.map((entry) => ({
          id: extractIdFromUrl(entry.url),
          name: entry.name,
          url: entry.url,
        }));

        if (!isCancelled) {
          setPokemonList(formattedList);
          setError(null);
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

    fetchPokemonList();

    return () => {
      isCancelled = true;
    };
  }, []);

  return { pokemonList, isLoading, error };
}
