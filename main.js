const tarjetaPokemon = document.getElementById("tarjetaPokemon");
const pokeName = document.getElementById("pokeName");
const pokeImagenContainer = document.getElementById("pokeImagenContainer");
const pokeImagen = document.getElementById("pokeImagen");
const pokeId = document.getElementById("pokeId");
const pokeTipo = document.getElementById("pokeTipo");
const pokeEstadisticas = document.getElementById("pokeEstadisticas");
//Diccionario de colores sacado desde https://gist.github.com/apaleslimghost/0d25ec801ca4fc43317bcff298af43c3
const colours = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};




// Funcion para buscar pokemon desde <form action="" onsubmit="buscarPokemon(event)">
const buscarPokemon = event => {
    event.preventDefault();
    const {value} = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(respuesta => mostrarPokemon(respuesta))
}
const mostrarPokemon = data =>{
    const sprite = data.sprites.other.home.front_default;
    const { stats, types} = data;
    console.log(data)
    // Mostrar el nombre en <div id="pokeName" class="pokeNameStyle">Pokedex</div>
    pokeName.textContent = data.name;
    // Mostrar la imagen en <img id="pokeImagen" src="./assets/cual.webp" alt="¿Quién es este pokemon?">
    pokeImagen.setAttribute('src',sprite);
    //Mostrar el numero del pokemon en <div id="pokeId"></div>
    pokeId.textContent= `ID ${data.id}`

}