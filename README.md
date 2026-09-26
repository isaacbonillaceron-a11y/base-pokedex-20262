# Pokédex Nacional 🔴

## Isaac Bonilla Cerón

### Link: https://isaacbonillaceron-a11y.github.io/base-pokedex-20262/

Pokédex interactiva construida con **React + Vite**, con datos en vivo de la
[PokéAPI](https://pokeapi.co/api/v2/) y un diseño inspirado en la Pokédex
Nacional de los juegos de Game Boy Advance.

---


## Estructura del proyecto

```
pokedex-app/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                    # Punto de entrada de React
    ├── App.jsx                     # Componente raíz
    ├── components/
    │   ├── Pokedex.jsx             # Orquesta estado, búsqueda y layout
    │   ├── PokemonDetail.jsx       # Panel izquierdo (sprite + datos)
    │   ├── PokemonList.jsx         # Lista deslizable de la derecha
    │   └── SearchBar.jsx           # Barra de búsqueda (F5 BUSCAR)
    ├── hooks/
    │   ├── usePokemonList.js       # Trae la lista liviana (id + nombre)
    │   └── usePokemonDetail.js     # Trae el detalle del Pokémon seleccionado
    ├── utils/
    │   └── typeTranslations.js     # Traduce los tipos a español
    └── styles/
        └── pokedex.css             # Todo el estilo retro estilo GBA
```