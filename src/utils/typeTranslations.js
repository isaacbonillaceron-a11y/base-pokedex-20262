// PokeAPI returns type names in English. Since translating every type
// would require an extra request per type, we keep a small static map
// so the UI can stay fully in Spanish.
export const TYPE_NAME_ES = {
  normal: 'Normal',
  fire: 'Fuego',
  water: 'Agua',
  electric: 'Eléctrico',
  grass: 'Planta',
  ice: 'Hielo',
  fighting: 'Lucha',
  poison: 'Veneno',
  ground: 'Tierra',
  flying: 'Volador',
  psychic: 'Psíquico',
  bug: 'Bicho',
  rock: 'Roca',
  ghost: 'Fantasma',
  dragon: 'Dragón',
  dark: 'Siniestro',
  steel: 'Acero',
  fairy: 'Hada',
};

export function translateTypeName(englishTypeName) {
  return TYPE_NAME_ES[englishTypeName] || englishTypeName;
}
