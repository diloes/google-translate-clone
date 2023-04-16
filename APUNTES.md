## reducer

El reducer es una función que recibe dos parámetros:

- state => al princio es el estado inicial que queramos darle
- action => que se compone de:
  - type => el tipo de action
  - payload => la información que enviamos para esa action

El reducer evalúa mediante un swith o mediante condicionales(if) por ejemplo, el tipo
de action y según el tipo ejecuta lo indicado.

## useStore()

He puesto toda la funcionalidad del reducer en un mismo archivo con el hook que lo va a controlar. En el hook
he creado unas funciones en las que directamente se hace el dispatch de la action que corresponda y ya desde fuera
solo ejecutamos esa función con el parámetro que corresponda.

//2:11:18
