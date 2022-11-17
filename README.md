# Pokedex-Kalos
Pokedex using pokeapi.co to show pokemons information with js vainilla

## Notas

El archivo [PokeKalos.html](https://github.com/ElMarchas/Pokedex-Kalos/blob/main/PokeKalos.html) ya contiene todos los recursos empaquetados para que puedas ejecutar la página únicamente abriendo el archivo con un explorador web.

Se utilizaron archivos gráficos svg para facilitar el re-escalado de la aplicación, aunque para está versión no fue necesario ya que todo quedo definido en un tamaño en concreto.

Al iniciar se consultan 5 pokemon aleatorios, los cuales son almacenados en un arreglo local solo con la información necesaria, al momento de consultar por otro pokemon, este pasa a ser almacenado en el arreglo, en caso de ser un pokemon repetido no se añade el repetido al arreglo, el Pokémon pasa al inicio del índice para desplegar su información. Los pokemon de abajo al ser clickeados pasan a la parte central.


## Como usar
La pokedex inicia cerrada, para abrirla tiene que darle click a la tapa roja superior o inferior; para cerrarla, en caso de ser necesario, también basta con darle click a la tapa roja superior o inferior. 

Al abrirla en la parte superior derecha se encuentra una entrada de texto para buscar otro pokemon. La parte central contiene toda la información del primer pokemon del arreglo. En la parte inferior se muestra la imagen y el nombre de los otros pokemon del arreglo, con una barra de desplazamiento horizontal para que no se desborden los pokemon del arreglo, al darle click pasa a la parte del centro para mostrar la información faltante.
