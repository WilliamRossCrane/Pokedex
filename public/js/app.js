"use strict";

// Helper function to handle async/await behavior for generator functions
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

// Select the container where Pokémon cards will be rendered
const container = document.body.querySelector("#app");

// Select a sample Pokémon card element (not actively used here)
const card = document.body.querySelector(".poke-card");

// Total number of Pokémon to fetch and display
const pokemon = 120;

// Fetch data for all Pokémon from 1 to the specified total
let fetchAPIData = () => {
    for (let i = 1; i <= pokemon; i++) {
        getPokemon(i);
    }
};

// Fetch data for a single Pokémon by ID and process it
const getPokemon = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch Pokémon data from the API
    const data = yield fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = yield data.json();

    // Extract Pokémon types as a comma-separated string
    const pokemonType = pokemon.types
        .map((pokemon) => pokemon.type.name)
        .join(", ");

    // Extract Pokémon abilities as a comma-separated string
    const pokemonAbilities = pokemon.abilities
        .map((pokemon) => pokemon.ability.name)
        .join(", ");

    // Get the last stat's name (usually HP)
    const pokemonHP = pokemon.stats
        .map((pokemon) => pokemon.stat.name)
        .slice(pokemon.stats.length - 1)
        .join(" ");

    // Get the last stat's base value
    const pokemonStats = pokemon.stats
        .map((pokemon) => pokemon.base_stat)
        .slice(pokemon.stats.length - 1)
        .join(" ");

    // Capitalize the first letter of the Pokémon name
    const firstChar = pokemon.name.slice(0, 1).toUpperCase();
    const restOfStr = pokemon.name.slice(1).toLowerCase();
    const titleCasedName = firstChar.concat(restOfStr);

    // Create a new object with transformed Pokémon data
    const transformedPokemon = {
        id: pokemon.id,
        order: pokemon.order,
        name: titleCasedName,
        stat: pokemonStats,
        base_stat: pokemonHP,
        image: `${pokemon.sprites.front_default}`, // Pokémon image URL
        type: pokemonType,
        weight: pokemon.weight, // Weight in decigrams
        height: pokemon.height, // Height in decimetres
        abilities: pokemonAbilities,
    };

    // Render the Pokémon card in HTML
    showPokemon(transformedPokemon);
});

/* Render a single Pokémon card on the webpage */
const showPokemon = (pokemon) => {
    // Create an HTML template for the Pokémon card
    let output = `
        <div class="poke-card" id="${pokemon.name}">
            <div class="flexy">
                <span class="card-id">#${pokemon.id} </span>
                <span class="card-hp">
                    <i id="poke-hp" class="fa fa-heart" aria-hidden="true"></i>
                    ${pokemon.stat}${pokemon.base_stat}
                </span>
            </div>
            <h1 class="card-name">${pokemon.name}</h1>
            <img class="card-image" src=${pokemon.image} alt=${pokemon.name} />
            <span class="card-details">${pokemon.type} type pokemon</span>
            <span>Length: ${pokemon.height} in, Weight: ${pokemon.weight} lbs.</span>
            <!-- <span>Abilities: ${pokemon.abilities}</span> -->
        </div>
    `;

    // Append the Pokémon card to the container
    container.innerHTML += output;
};

// Start fetching and displaying Pokémon data
fetchAPIData();
