// Reference to the container element where the Pokémon cards will be rendered
const container: HTMLElement | any = document.body.querySelector("#app");

// Placeholder for individual Pokémon card elements
const card: HTMLElement | any = document.body.querySelector(".poke-card");

// Total number of Pokémon to fetch
const pokemon: number = 120;

// Interface defining the structure for a Pokémon object
interface IPokemon {
    id: number;
    order: number;
    name: string;
    image: string;
    type: string;
    stat: string;
    base_stat: string;
    weight: number;
    height: number;
    abilities: string;
}

// Function to fetch Pokémon data for a specified number of Pokémon
let fetchAPIData = (): void => {
    for (let i = 1; i <= pokemon; i++) {
        getPokemon(i); // Fetch data for each Pokémon by its ID
    }
};

// Asynchronous function to fetch data for a single Pokémon by ID
const getPokemon = async (id: number): Promise<void> => {
    // Fetch Pokémon data from the PokéAPI
    const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon: any = await data.json(); // Convert the response to JSON format

    // Extract and format the Pokémon's type(s)
    const pokemonType: string = pokemon.types
        .map((pokemon: any) => pokemon.type.name)
        .join(", ");

    // Extract and format the Pokémon's abilities
    const pokemonAbilities: string = pokemon.abilities
        .map((pokemon: any) => pokemon.ability.name)
        .join(", ");

    // Extract the Pokémon's HP stat name
    const pokemonHP: string = pokemon.stats
        .map((pokemon: any) => pokemon.stat.name)
        .slice(pokemon.stats.length - 1)
        .join(" ");

    // Extract the Pokémon's base HP stat value
    const pokemonStats: string = pokemon.stats
        .map((pokemon: any) => pokemon.base_stat)
        .slice(pokemon.stats.length - 1)
        .join(" ");

    // Format the Pokémon's name into title case
    const firstChar: string = pokemon.name.slice(0, 1).toUpperCase();
    const restOfStr: string = pokemon.name.slice(1).toLowerCase();
    const titleCasedName: string = firstChar.concat(restOfStr);

    // Create a transformed Pokémon object with the necessary properties
    const transformedPokemon = {
        id: pokemon.id,
        order: pokemon.order,
        name: titleCasedName,
        stat: pokemonStats,
        base_stat: pokemonHP,
        image: `${pokemon.sprites.front_default}`,
        type: pokemonType,
        weight: pokemon.weight,
        height: pokemon.height,
        abilities: pokemonAbilities,
    };

    // Render the Pokémon card in the HTML
    showPokemon(transformedPokemon);
};

/* Render HTML */
// Function to display a Pokémon card on the webpage
const showPokemon = (pokemon: IPokemon): void => {
    // Create the HTML structure for the Pokémon card
    let output: string = `
        <div class="poke-card" id="${pokemon.name}">
            <div class="flexy">
                <span class="card-id">#${pokemon.id} </span>
                <span class="card-hp"><i id="poke-hp" class="fa fa-heart" aria-hidden="true"></i>${pokemon.stat}${pokemon.base_stat}</span>
            </div>
            <h1 class="card-name">${pokemon.name}</h1>
            <img class="card-image" src=${pokemon.image} alt=${pokemon.name} />
            <span class="card-details">${pokemon.type} type pokemon</span>
            <span>Length: ${pokemon.height} in, Weight: ${pokemon.weight} lbs.</span>
            <!-- Optional: Uncomment to show abilities -->
            <!-- <span>Abilities: ${pokemon.abilities}</span> -->
        </div>
    `;

    // Append the Pokémon card to the container element
    container.innerHTML += output;
};

// Start fetching and displaying Pokémon data
fetchAPIData();
