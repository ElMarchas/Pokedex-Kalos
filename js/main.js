listPokemon = []; //GLOBAL para almacenar pokemones

const getPokemon = async (request) => {
  //898 max pokemon
  let pokequest;
  try {
    pokequest = request.toLowerCase();
  } catch (error) {
    pokequest = request;
  }
  document.getElementById("inputSearch").value = "";

  let ObjetExist = listPokemon.find((pokemon) => pokemon.id == pokequest);
  if (ObjetExist) {
    alert("Pokemon already listed");
    focusPokemon(pokequest);
    return;
  }

  const dataPokemon = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + pokequest
  )
    .then((response) => response.json())
    .catch((error) => console.log(error));
  if (dataPokemon) {
    let ObjetExist = listPokemon.find((pokemon) => pokemon.id == dataPokemon.id);
    if (ObjetExist) {
      focusPokemon(dataPokemon.id);
      alert("Pokemon already listed");
      return;
    }

    let imagen = dataPokemon.sprites.other.dream_world.front_default
      ? dataPokemon.sprites.other.dream_world.front_default
      : dataPokemon.sprites.other.home.front_default;
    const objeto = {
      id: dataPokemon.id,
      imagePokemon: imagen,
      namePokemon: dataPokemon.name,
      typePokemon: dataPokemon.types,
      statsPokemon: dataPokemon.stats,
      movesPokemon: dataPokemon.moves,
    };
    listPokemon.push(objeto);
    //console.log(listPokemon);
    renderPokemon();
  } else {
    console.log("no data");
  }
};

getPokemon(Math.floor(Math.random() * 898 + 1));
getPokemon(Math.floor(Math.random() * 898 + 1));
getPokemon(Math.floor(Math.random() * 898 + 1));
getPokemon(Math.floor(Math.random() * 898 + 1));
getPokemon(Math.floor(Math.random() * 898 + 1)); //obtener 5 pokemones al render

//pintar pokemones en la pagina
const renderPokemon = () => {
  if (listPokemon.length < 1) return;

  const statCal = (value) => {
    return (175 * value) / 255;
  };

  const mainDiv = document.getElementById("mainContent");
  mainDiv.innerHTML = "";
  const divImage = document.createElement("div");
  const divName = document.createElement("div");
  const divType = document.createElement("div");
  const divMoves = document.createElement("div");
  const divStats = document.createElement("div");
  const imgPoke = document.createElement("img");
  const h1Name = document.createElement("H1");

  const divCards = document.createElement("div");
  divCards.className = "poke-cards";

  divImage.className = "poke-image";
  imgPoke.id = "imagePokemon";
  divName.className = "poke-name";
  h1Name.id = "namePokemon";
  divType.id = "typePokemon";
  divType.className = "poke-types";
  divMoves.id = "movePokemon";
  divMoves.className = "poke-moves";
  divStats.className = "poke-stats";
  imgPoke.src = "";

  mainDiv.append(divCards);

  listPokemon
    .slice(0)
    .reverse()
    .map((pokemon, index) => {
      if (index == 0) {
        imgPoke.src = pokemon.imagePokemon;
        divImage.append(imgPoke);
        mainDiv.append(divImage);

        h1Name.textContent = pokemon.namePokemon;
        divName.append(h1Name);
        mainDiv.append(divName);

        divType.innerHTML = "<h2>Types:</h2>";
        for (let key in pokemon.typePokemon) {
          divType.innerHTML += `<div> ${pokemon.typePokemon[key].type.name}</div>`;
        }
        mainDiv.append(divType);

        divMoves.innerHTML = `<h2>Moves: ${pokemon.movesPokemon.length}</h2>`;
        let containerMove = "";
        for (let key in pokemon.movesPokemon) {
          containerMove += `<div> ${pokemon.movesPokemon[key].move.name}</div>`;
        }
        divMoves.innerHTML += `<div class="poke-moves-container">${containerMove}</div>`;
        mainDiv.append(divMoves);

        divStats.innerHTML = `HP ${pokemon.statsPokemon[0].base_stat}
        <div id="barHP" title="${pokemon.statsPokemon[0].base_stat}" class="animated-progress progress-hp">
          <span id="spanHP" ></span>
        </div>
        Attack ${pokemon.statsPokemon[1].base_stat}
        <div title="${pokemon.statsPokemon[1].base_stat}" class="animated-progress progress-attack">
            <span id="spanAttack" ></span>
        </div>
        Defense ${pokemon.statsPokemon[2].base_stat}
        <div title="${pokemon.statsPokemon[2].base_stat}" class="animated-progress progress-defense">
            <span id="spanDefense" ></span>
        </div>
        Special Attak ${pokemon.statsPokemon[3].base_stat}
        <div title="${pokemon.statsPokemon[3].base_stat}" class="animated-progress progress-atk">
            <span id="spanSatk" ></span>  
        </div>
        Special Defense ${pokemon.statsPokemon[4].base_stat}
        <div title="${pokemon.statsPokemon[4].base_stat}" class="animated-progress progress-def">
            <span id="spanSdef" ></span>
        </div>
        Speed ${pokemon.statsPokemon[5].base_stat}
        <div title="${pokemon.statsPokemon[5].base_stat}" class="animated-progress progress-speed">
            <span id="spanSpeed" ></span>
        </div>`;
        mainDiv.append(divStats);
        document.getElementById("spanHP").style.width =
          statCal(pokemon.statsPokemon[0].base_stat) + "px";
        document.getElementById("spanAttack").style.width =
          statCal(pokemon.statsPokemon[1].base_stat) + "px";
        document.getElementById("spanDefense").style.width =
          statCal(pokemon.statsPokemon[2].base_stat) + "px";
        document.getElementById("spanSatk").style.width =
          statCal(pokemon.statsPokemon[3].base_stat) + "px";
        document.getElementById("spanSdef").style.width =
          statCal(pokemon.statsPokemon[4].base_stat) + "px";
        document.getElementById("spanSpeed").style.width =
          statCal(pokemon.statsPokemon[5].base_stat) + "px";
      } else {
        let containerCard = "";
        containerCard = `<div class="poke-card" onclick="focusPokemon(${pokemon.id})">
          <img src="${pokemon.imagePokemon}" alt="${pokemon.namePokemon}" >
          <div class="poke-card-text">${pokemon.namePokemon}</div>
        </div>`;

        divCards.innerHTML += containerCard;
      }
    });
};
const focusPokemon = (id) => {
  let myPokemon = listPokemon.find((pokemon) => pokemon.id == id);

  for (let key in listPokemon) {
    if (listPokemon[key].id == id) {
      listPokemon.splice(key, 1);
    }
  }

  listPokemon.push(myPokemon);
  console.log(listPokemon);
  renderPokemon();
};

const start = () => {
  const inputSearch = document.getElementById("inputSearch");
  const buttonSearch = document.getElementById("buttonSearch");
  const coverTop = document.getElementById("coverTop");
  const coverBot = document.getElementById("coverBot");
  const circle1 = document.getElementById("circle1");
  const circle2 = document.getElementById("circle2");
  const circle3 = document.getElementById("circle3");
  const circle4 = document.getElementById("circle4");
  const circle5 = document.getElementById("circle5");
  const content = document.getElementById("content");
  const laMagia = document.getElementById("laMagia");

  const openClose = () => {
    content.classList.contains("content-closed")
      ? content.classList.replace("content-closed", "content-open")
      : content.classList.replace("content-open", "content-closed");

    if (circle1.classList.contains("circle-closed")) {
      laMagia.classList.replace("hidden", "hiddenot");
      circle1.classList.replace("circle-closed", "circle-open");
      circle2.classList.replace("circle-closed", "circle-open");
      circle3.classList.replace("circle-closed", "circle-open");
      circle4.classList.replace("circle-closed", "circle-open");
      circle5.classList.replace("circle-closed", "circle-open");
    } else {
      laMagia.classList.replace("hiddenot", "hidden");
      circle1.classList.replace("circle-open", "circle-closed");
      circle2.classList.replace("circle-open", "circle-closed");
      circle3.classList.replace("circle-open", "circle-closed");
      circle4.classList.replace("circle-open", "circle-closed");
      circle5.classList.replace("circle-open", "circle-closed");
    }
  };

  coverTop.addEventListener("click", () => {
    openClose();
  });

  coverBot.addEventListener("click", () => {
    openClose();
  });

  inputSearch.addEventListener("keypress", (e) => {
    if (e.key == "Enter") getPokemon(inputSearch.value);
  });

  buttonSearch.addEventListener("click", () => {
    getPokemon(inputSearch.value);
  });
};

start();
