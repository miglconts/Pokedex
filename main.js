const tarjetaPokemon = document.getElementById("tarjetaPokemon");
const pokeName = document.getElementById("pokeName");
const pokeImagenContainer = document.getElementById("pokeImagenContainer");
const pokeImagen = document.getElementById("pokeImagen");
const pokeId = document.getElementById("pokeId");
const pokeTipo = document.getElementById("pokeTipo");
const pokeEstadisticas = document.getElementById("pokeEstadisticas");
//Diccionario de colores sacado desde https://gist.github.com/apaleslimghost/0d25ec801ca4fc43317bcff298af43c3
const coloresTipo = {
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
	defecto : '#FDF6EC'
};

// Funcion para buscar pokemon desde <form action="" onsubmit="buscarPokemon(event)">
const buscarPokemon = event => {
    event.preventDefault();
    const {value} = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(respuesta => mostrarPokemon(respuesta))
		.catch(err => mostrarNoEncontrado(value))
		return value
}
const mostrarPokemon = data =>{
    const sprite = data.sprites.other.home.front_default;
    const { stats, types} = data;
    console.log(data)
    // Mostrar el nombre en <div id="pokeName" class="pokeNameStyle">Pokedex</div>
    pokeName.textContent = data.name.toUpperCase();
	pokeName.style.fontWeight = `500`;
	pokeName.style.fontStyle= 'italic';
	pokeName.style.fontSize = `2rem`;
	pokeName.style.color = coloresTipo[types[0].type.name];
	tarjetaPokemon.style.background = `white`;
    // Mostrar la imagen en <img id="pokeImagen" src="./assets/cual.webp" alt="¿Quién es este pokemon?">
    pokeImagen.setAttribute('src',sprite);
    //Mostrar el numero del pokemon en <div id="pokeId"></div>
    pokeId.textContent= `ID ${data.id}`
	pokeId.style.fontSize = `1.5rem`;
	pokeId.style.color = coloresTipo[types[0].type.name];
	colorearContenedor(types);
	mostrarTypePokemon(types);
	mostrarPokemonEstadisticas(stats);
}

const colorearContenedor = types => {
	const colorUno = coloresTipo[types[0].type.name];
	const colorDos = types[1] ? coloresTipo[types[1].type.name]: coloresTipo.defecto;
	pokeImagen.style.background= `white`;
	pokeImagenContainer.style.background= `linear-gradient(  ${colorUno},${colorDos} )`;
	// pokeImagen.style.borderStyle = `solid`;
	// pokeImagen.style.borderWidth = `.5rem`;
	// pokeImagen.style.borderImage= `linear-gradient(${colorUno},${colorDos} )30`;
	pokeImagen.style.backgroundSize = `100%`;
	tarjetaPokemon.style.borderStyle = `solid`;
	tarjetaPokemon.style.borderWidth = `.5rem`;
	tarjetaPokemon.style.borderImage = `linear-gradient(${colorUno},${colorDos})30`;
}

const mostrarTypePokemon = types => {
	pokeTipo.innerHTML = '';
	types.forEach(type => {
		const elementoTextoType = document.createElement("div");
		elementoTextoType.style.backgroundColor = coloresTipo[type.type.name];
		elementoTextoType.textContent = type.type.name.toUpperCase();
		elementoTextoType.style.color = `white`;

		pokeTipo.appendChild(elementoTextoType);		
	});
}

const mostrarPokemonEstadisticas = stats => {
	pokeEstadisticas.innerHTML ='';
	stats.forEach(stat => {
		const elementoEstadisticas = document.createElement("div");
		const elementoEstadisticasNombre = document.createElement("div");
		const elementoEstadisticasValor = document.createElement("div");
		elementoEstadisticasNombre.textContent = stat.stat.name.toUpperCase();
		elementoEstadisticasValor.textContent = stat.base_stat;
		elementoEstadisticasValor.style.fontWeight = `500`;
		elementoEstadisticasValor.style.fontSize = `1.3rem`;
		elementoEstadisticas.appendChild(elementoEstadisticasNombre);
		elementoEstadisticas.appendChild(elementoEstadisticasValor);
		pokeEstadisticas.appendChild(elementoEstadisticas);
	
	});
}

const mostrarNoEncontrado = value => {
	pokeName.textContent = `${value} no Encontrado`;
	pokeName.style.fontWeight = `500`;
	pokeName.style.fontSize = `2rem`;
	pokeName.style.color = `white`;
	pokeImagen.setAttribute('src','./assets/egg.png');
	pokeImagenContainer.style.background = `white`;
	tarjetaPokemon.style.background = `red`;
	tarjetaPokemon.style.borderWidth = `0`;
	pokeEstadisticas.innerHTML='';
	pokeTipo.innerHTML='';
	pokeId.innerHTML='';

	
}