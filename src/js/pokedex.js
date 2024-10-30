const pokemonName = document.querySelector(".pokemon__name");

const pokemonNumber = document.querySelector(".pokemon__number");

const pokemonImage = document.querySelector(".pokemon__image")

const input = document.querySelector(".input__search")

const form = document.querySelector(".form")

const btnPrev = document.querySelector(".btn-prev")

const btnNext = document.querySelector(".btn-next")

let searchPokemon = 1;


// CONECTAR  E CAPTURAR AS INFORMÇÕES DA API

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon) => {

    pokemonName.textContent = 'loading'

    pokemonNumber.textContent = '';

    pokemonImage.src = 'https://i.pinimg.com/originals/0a/50/6f/0a506fe0f6c211128cf1ed370655c6a1.gif'

    const data = await fetchPokemon(pokemon);

    console.log(data)


    if (data) {
        // when its right
        pokemonImage.computedStyleMap.width = '25%'
        pokemonImage.src = data.sprites.versions["generation-v"]["black-white"].animated.front_default

        // PATH sprites.versions["generation-v"]["black-white"].animated.front_default

        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        input.value = "";
        searchPokemon = data.id;

    } else {
        
        // when its wrong
        pokemonNumber.textContent = "";
        pokemonName.textContent = "not found :(";
        pokemonImage.src = 'https://media0.giphy.com/media/UHAYP0FxJOmFBuOiC2/200w.gif?cid=6c09b952l8mmx31kbhu67oq0p9smmcxyc4ayqp3il7u4b90u&ep=v1_gifs_search&rid=200w.gif&ct=g'
        pokemonImage.style.width = '35%'
    }



}

form.addEventListener("submit", (event) => {
    event.preventDefault();


    renderPokemon(input.value.toLowerCase());
})

btnPrev.addEventListener("click", () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;

        renderPokemon(searchPokemon)
    }

})

btnNext.addEventListener("click", () => {

    searchPokemon += 1;

    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)