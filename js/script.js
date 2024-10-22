const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) =>{


    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    if(APIResponse.status === 200){
    const data = await APIResponse.json();
    return data;
}
}

const rederPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){
    pokemonImg.style.display = 'block'
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    input.value = '';
    searchPokemon = data.id;
} else{
    pokemonImg.style.display = 'none'
    pokemonName.innerHTML = 'Not Found :c';
    pokemonNumber.innerHTML = '';
}

}

form.addEventListener('submit', (e) =>{

    e.preventDefault()

    rederPokemon(input.value.toLowerCase())
    
});

buttonPrev.addEventListener('click', () =>{
    if (searchPokemon > 1){
    searchPokemon -= 1;
    rederPokemon(searchPokemon)
};
});

buttonNext.addEventListener('click', () =>{
    searchPokemon += 1;
    rederPokemon(searchPokemon)
})

rederPokemon(searchPokemon)