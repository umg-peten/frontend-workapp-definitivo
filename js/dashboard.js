let Nombre = localStorage.getItem("Nombre");
let Apellido = localStorage.getItem("Apellido");
let NC = Nombre + ' ' + Apellido
document.getElementById('NombreH').innerHTML = NC;