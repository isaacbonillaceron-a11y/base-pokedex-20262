import { usePokemonDetail } from '../hooks/usePokemonDetail.js';
import { translateTypeName } from '../utils/typeTranslations.js';

function formatPokemonId(id) {
  return String(id).padStart(3, '0');
}

/**
 * Left-hand preview panel: header with the Pokémon's name, sprite,
 * and retro-styled data boxes (species, types, seen/owned counters).
 */
function PokemonDetail({ pokemonId, seenCount, ownedCount }) {
  const { pokemonDetail, isLoading, error } = usePokemonDetail(pokemonId);

  return (
    <div className="pokemon-detail">
      <div className="detail-name-bar">
        {isLoading || !pokemonDetail ? 'Cargando...' : pokemonDetail.name}
      </div>

      <div className="detail-screen">
        {isLoading && <div className="detail-message">Cargando datos...</div>}
        {error && <div className="detail-message detail-error">{error}</div>}
        {!isLoading && !error && pokemonDetail && (
          <img
            src={pokemonDetail.spriteUrl}
            alt={pokemonDetail.name}
            className="detail-sprite"
          />
        )}
      </div>

      <div className="detail-info-box">
        <div className="detail-info-row">
          <span className="detail-info-label">N.°</span>
          <span className="detail-info-value">
            {formatPokemonId(pokemonId)}
          </span>
        </div>
        <div className="detail-info-row">
          <span className="detail-info-label">Especie</span>
          <span className="detail-info-value">
            {pokemonDetail?.species || '—'}
          </span>
        </div>
        <div className="detail-info-row">
          <span className="detail-info-label">Tipo</span>
          <span className="detail-info-value">
            {pokemonDetail
              ? pokemonDetail.types.map(translateTypeName).join(' / ')
              : '—'}
          </span>
        </div>
      </div>

      <div className="detail-counters">
        <div className="counter-box">
          <span className="counter-label">Vistos:</span>
          <span className="counter-value">{seenCount}</span>
        </div>
        <div className="counter-box">
          <span className="counter-label">Propios:</span>
          <span className="counter-value">{ownedCount}</span>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
