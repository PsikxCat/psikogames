# Pseudo código

## Data que debo trackear

- **Solución**
  - Palabra de 5 letras, ejemplo: 'manos' ✔️

- **Intentos**
  - Un array con los intentos anteriores
  - Cada intento es un array de 5 objetos, ejemplo: [{...}, {...}, {...}, {...}, {...}]
  - Cada objeto tiene la letra y el estado, ejemplo: {letter: 'm', isCorrect: true, isInWord: true, isNotInWord: false} !!!!! ¿mejor un string que tres booleanos? !!!!!
  - Estados posibles de las letras: isCorrect, isInWord, isNotInWord
  - Número de intentos máximos: 6

## Funcionalidad del juego

- **Input de palabras (intento usuario)**
  - El usuario ingresa una palabra y por cada letra un input (casilla) es llenado
  - Cuando el usuario presiona delete en un input vacía el input anterior
  - Cuando el usuario presiona enter se valida la palabra
    - Si no están llenos los 5 inputs no se valida
    - Si la palabra ya fue ingresada no se valida

- **Validación de palabra**
  - Cada letra se valida con la solución
  - A cada input se le asigna un color según el estado de la letra
    - Verde: letra correcta
    - Amarillo: letra correcta pero en otra posición
    - Rojo: letra incorrecta
  - Se guarda el intento en el array de intentos
  - Se mueve al siguiente intento

- **Fin del juego**
  - Si el usuario adivina la palabra antes de los 6 intentos gana
    - Se muestra un modal con la palabra y un botón para jugar de nuevo
  - Si el usuario no adivina la palabra en los 6 intentos pierde
    - Se muestra un modal con la palabra y un botón para jugar de nuevo
