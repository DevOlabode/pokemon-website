const form = document.querySelector('#pokemonSubmit')
const info = document.querySelector('#pokemonInfo')
const pokemonNameAndID = document.querySelector('#N-ID')
const pokemonWeightAndHeight = document.querySelector('#W-H')
const pokemonImageCont = document.querySelector('#imgContainer')
const pokemonTypesDis = document.querySelector('#types') //pokemon types display

const pokemonStats = {
    hp : document.querySelector('#hp'),
    attack : document.querySelector('#attack'),
    defense: document.querySelector('#defense'),
    spAttack: document.querySelector('#sp\\.attack'),
    spDefense: document.querySelector('#sp\\.defense'),
    speed: document.querySelector('#speed')
}

const pokemonTypes = {
    type1 : document.querySelector('#type1'),
    type2 : document.querySelector('#type2')
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputText = form.elements[0].value
try{
    const res= await axios.get(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputText}`)
    pokemonInfo(res.data)
}catch(e){
    console.error('Error fetching pokemon data: ', error)
    alert('Pokemon not found')
}
});

const clearPreviousData = ()=>{
    pokemonImageCont.innerHTML = ''; // This line clears the previous image  
    pokemonNameAndID.textContent = '';  
    pokemonWeightAndHeight.textContent = '';  
    pokemonStats.hp.textContent = '';  
    pokemonStats.attack.textContent = '';  
    pokemonStats.defense.textContent = '';  
    pokemonStats.spAttack.textContent = '';  
    pokemonStats.spDefense.textContent = '';  
    pokemonStats.speed.textContent = '';  
    pokemonTypes.type1.textContent = '';  
    pokemonTypes.type2.textContent = ''; 
}

const pokemonInfo = (info)=>{
    clearPreviousData();
    pokemonNameAndID.textContent = `${info.name.toUpperCase()} #${info.id}`
    pokemonWeightAndHeight.textContent = `Weight: ${info.weight} Height: ${info.height}`


    //The pokemon Image....
    const pokemonImg = document.createElement('img')
    pokemonImg.src = info.sprites.front_default

    pokemonImageCont.append(pokemonImg)


    //Pokemon Stats...
    pokemonStats.hp.textContent = info.stats[0].base_stat
    pokemonStats.attack.textContent = info.stats[1].base_stat
    pokemonStats.defense.textContent = info.stats[2].base_stat
    pokemonStats.spAttack.textContent = info.stats[3].base_stat
    pokemonStats.spDefense.textContent = info.stats[4].base_stat
    pokemonStats.speed.textContent = info.stats[5].base_stat


    // types longetivity.
    if(info.types.length === 1){
        pokemonTypes.type1.textContent = info.types[0].type.name;
        pokemonTypes.type2.style.display = 'none';
    }else{
        pokemonTypes.type1.textContent = info.types[0].type.name;
        pokemonTypes.type2.textContent = info.types[1].type.name;
    }
}