# Pokédex Nacional 🔴

Pokédex interactiva construida con **React + Vite**, con datos en vivo de la
[PokéAPI](https://pokeapi.co/api/v2/) y un diseño inspirado en la Pokédex
Nacional de los juegos de Game Boy Advance.

---

## 1. Instalar Node.js

Node.js es el programa que necesitas para ejecutar proyectos de React en tu
computador (incluye `npm`, el gestor de paquetes).

1. Ve a **https://nodejs.org**
2. Descarga la versión **LTS** (la recomendada, más estable).
3. Instálala haciendo doble clic en el instalador y siguiendo los pasos
   (siguiente, siguiente, finalizar — no necesitas cambiar ninguna opción).
4. Abre una terminal:
   - **Windows:** busca "PowerShell" o "CMD" en el menú de inicio.
   - **Mac:** abre la app "Terminal" (Spotlight → escribe "Terminal").
5. Verifica que quedó instalado escribiendo:
   ```bash
   node -v
   npm -v
   ```
   Si ves un número de versión en ambos casos (ej. `v20.11.0` y `10.2.4`),
   ¡ya está listo!

---

## 2. Obtener el proyecto

Ya te entregué el proyecto completo y funcional en esta carpeta
(`pokedex-app`). Solo necesitas moverte a ella desde la terminal:

```bash
cd ruta/donde/descargaste/pokedex-app
```

> 💡 **Para futuros proyectos desde cero**, así es como se crea un proyecto
> nuevo de React con Vite (no es necesario para este, ya está creado):
> ```bash
> npm create vite@latest nombre-de-tu-proyecto -- --template react
> ```

---

## 3. Instalar las dependencias

Dentro de la carpeta del proyecto, ejecuta:

```bash
npm install
```

Esto descarga React, Vite y todo lo necesario (se crea una carpeta
`node_modules`, es normal que sea pesada).

---

## 4. Ejecutar el servidor local

```bash
npm run dev
```

La terminal mostrará algo como:

```
  VITE v5.x.x  ready in 400 ms
  ➜  Local:   http://localhost:5173/
```

Abre esa dirección (`http://localhost:5173/`) en tu navegador y verás la
Pokédex funcionando, consumiendo datos en tiempo real de la PokéAPI.

Para detener el servidor, vuelve a la terminal y presiona `Ctrl + C`.

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

## Notas y personalización

- **Cantidad de Pokémon cargados:** por defecto se cargan los 151 de Kanto.
  Puedes cambiar esto editando la constante `POKEMON_LIMIT` en
  `src/hooks/usePokemonList.js`.
- **"Vistos" y "Propios":** "Vistos" muestra el total de Pokémon cargados en
  la Pokédex; "Propios" cuenta cuántos Pokémon distintos has seleccionado
  durante la sesión actual (funciona como un contador de "inspeccionados").
- **Idioma del código:** todo el código (variables, funciones, componentes)
  está en inglés, siguiendo buenas prácticas internacionales. La interfaz
  visible para el usuario está en español.
- **Fuentes:** se usan las tipografías pixeladas "Press Start 2P" (títulos)
  y "VT323" (texto general) desde Google Fonts, cargadas en `index.html`.
