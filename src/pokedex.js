// https://pokeapi.co/api/v2/pokemon/ditto
const coloresParaTipos = {
  electric: '#FFEA70',
  normal: '#B09398',
  fire: '#FF675C',
  water: '#0596C7',
  ice: '#AFEAFD',
  rock: '#999799',
  flying: '#7AE7C7',
  grass: '#4A9681',
  psychic: '#FFC6D9',
  ghost: '#561D25',
  bug: '#A2FAA3',
  poison: '#795663',
  ground: '#D2B074',
  dragon: '#DA627D',
  steel: '#1D8A99',
  fighting: '#2F2F2F',
  default: '#2A1A1F',
};

const URLAPI = 'https://pokeapi.co/api/v2/pokemon'
const offset = 0
const limit = 150

function agregarPokemon(){
    
    fetch(`${URLAPI}/?offset=${offset}&limit=${limit}`)
    .then(resultado => resultado.json())
    .then((datos) => {
        console.log(datos);
        Object.keys(datos.results).forEach(pokemon => {
          
          let pokemones = datos.results[pokemon].name;      
          listadoPokemones(pokemones);
                
        })
      })  
}

agregarPokemon();



function listadoPokemones(pokemones) {
    
    const elegirPokemon = document.querySelector('#pokemon');
    const listadoDePokemones = document.createElement('option'); 
  
    listadoDePokemones.setAttribute('value', pokemones);
    listadoDePokemones.textContent = pokemones.toUpperCase()
  
    elegirPokemon.appendChild(listadoDePokemones);
}
  
document.querySelector('#seleccionar').addEventListener('click', () => {
  let pokemonSeleccionado = document.querySelector('#pokemon').value
  mostrarDatosPokedex(pokemonSeleccionado)

    
});

async function mostrarDatosPokedex(pokemonSeleccionado){
  await fetch(`${URLAPI}/${pokemonSeleccionado}`)
  .then(resultado => resultado.json())
  .then((datos) => {
      console.log(datos);
      verPokemones(datos);
      informacionTipoPokemones(datos);
      informacionEstadisticasPokemones(datos);

    })
}
 



function verPokemones(datos){
  const nombrePokemon = document.querySelector('#poke-nombre');
  nombrePokemon.textContent = datos.name.toUpperCase();

  const imagenPokemon = document.querySelector('#carta-inicial');
  const sprite =  datos.sprites.front_default
  imagenPokemon.setAttribute('src', sprite);
  
  const idPokemon = document.querySelector('#poke-id');
  idPokemon.textContent = `N° ${datos.id}`
}
  
function informacionTipoPokemones(datos){
  const tiposPokemon = document.querySelector('#poke-tipo');
  tiposPokemon.innerHTML = '';
  const tipos = datos.types
  // console.log(tipos[0].type.name)
  tipos.forEach(type => {
    const contenedorParaTipo = document.createElement('div');
    contenedorParaTipo.textContent = type.type.name.toUpperCase();
    contenedorParaTipo.style.backgroundColor = coloresParaTipos[type.type.name]
    tiposPokemon.appendChild(contenedorParaTipo); 
  
  })

}

function informacionEstadisticasPokemones(datos){
  const estadisticasPokemon = document.querySelector('#poke-estadisticas');
  estadisticasPokemon.innerHTML = '';
  const estadisticas =  datos.stats;
  console.log(estadisticas)
  estadisticas.forEach(stat => {
    const elementoEstadistica = document.createElement('div');
    const elementoCantidadEstadistica = document.createElement('div');
    const elementoNombreEstadistica = document.createElement('div');

    elementoNombreEstadistica.textContent = stat.stat.name.toUpperCase();
    elementoCantidadEstadistica.textContent = stat.base_stat;

    elementoEstadistica.appendChild(elementoNombreEstadistica);
    elementoEstadistica.appendChild(elementoCantidadEstadistica);
    estadisticasPokemon.appendChild(elementoEstadistica);



  })

}
 


