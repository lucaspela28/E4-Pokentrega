const div = document.getElementById("div");
const form = document.getElementById("form");
const input = document.getElementById("input");



const requestPokemon = async () => {
  try{
    const guardarValor=input.value.trim();
   const res = await fetch (`https://pokeapi.co/api/v2/pokemon/${guardarValor}`);
    const data = await res.json();
   return renderPokemon(data);
  }catch (error){
    mostrarError(input,'Ese Pokemon no existe');
    borrarRender();
  }
   
}

const renderPokemon = async (data) => {
    const html =
    `
      <section class="card-render">
        <header class="header-card">
            <div class="name-type">
              <h3>Nombre: </h3>
              <p>${data.name}</p>
            </div>
            <div class="name-type">
              <h3>Tipo: </h3>
              <p>${data.types[0].type.name}</p>
            </div>
        </header>
            <div class="image">
              <img src="${data.sprites.front_shiny}">
            </div>
        <footer class="footer-card">
          <div class="peso-altura">
            <h3>Peso: </h3>
            <p>${data.weight/10} kgs.</p>
          </div>
          <div class="peso-altura">
            <h3>Altura: </h3>
            <p>${data.height/10} mts.</p>
          </div>
        </footer>
      </section>
     `
     div.innerHTML = html;
}


const borrarRender = () =>{
    const html = '';
    div.innerHTML = html;
}


const validacion = () =>{
  let validado = false;
  const guardarValor = input.value.trim();
  if (vacio(guardarValor)){
    mostrarError(input, 'No ingresaste ningun valor')
  }else {
      exito (input)
      validado= true;
  }
  return validado;
}

const vacio = (id) => id === "";
const sinStock = (id) => {
    const noHay = pizzas.some(pizza => pizza.id === Number(id))
    return noHay;
}


const mostrarError = (input, mensaje)=>{
  const campoDeForm = input.parentElement;
  const errorDeCampo = campoDeForm.querySelector("small");
  errorDeCampo.classList.remove("exito");
  errorDeCampo.classList.add("error");
  errorDeCampo.textContent = mensaje;
}


const exito = (input, mensaje)=>{
  const campoDeForm = input.parentElement;
  const errorDeCampo = campoDeForm.querySelector("small");
  errorDeCampo.classList.remove("error");
  errorDeCampo.classList.add("exito");
  errorDeCampo.textContent = "";
}


form.addEventListener("submit", (e)=>{
  e.preventDefault();
  let validado = validacion()
  const guardarValor = input.value.trim();
  if(validado){
    requestPokemon();
  }else {
    borrarRender();
  }
})



