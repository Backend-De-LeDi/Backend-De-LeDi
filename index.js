function calcularEdad(fechaNacimiento, fechaActual = new Date()) {
  const nacimiento = new Date(fechaNacimiento);
  let edad = fechaActual.getFullYear() - nacimiento.getFullYear();

  // Verificar si aún no llegó el cumpleaños este año
  const mesActual = fechaActual.getMonth();
  const diaActual = fechaActual.getDate();
  const mesNacimiento = nacimiento.getMonth();
  const diaNacimiento = nacimiento.getDate();

  if (
    mesActual < mesNacimiento ||
    (mesActual === mesNacimiento && diaActual < diaNacimiento)
  ) {
    edad--;
  }

  return edad;
}

// Ejemplo de uso:
const edad = calcularEdad("2003-10-10"); // Formato válido: "yyyy-mm-dd"
console.log(`Edad: ${edad}`);
