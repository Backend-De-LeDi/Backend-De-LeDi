export function calcularEdad(
    fechaNacimiento: string | Date,
    fechaActual: Date = new Date()
): string {
    const nacimiento = new Date(fechaNacimiento);
    let edad = fechaActual.getFullYear() - nacimiento.getFullYear();
    const mesActual = fechaActual.getMonth();
    const diaActual = fechaActual.getDate();
    const mesNacimiento = nacimiento.getMonth();
    const diaNacimiento = nacimiento.getDate();
    let nivel: string;
    if (
        mesActual < mesNacimiento ||
        (mesActual === mesNacimiento && diaActual < diaNacimiento)
    ) {
        edad--;
    }

    if (edad < 10) {
        nivel = 'inicial';
    } else if (edad > 10 && edad < 18) {
        nivel = 'secundario';
    } else if (edad > 18 && edad < 60) {
        nivel = 'joven adulto';
    } else {
        nivel = 'adulto Mayor'
    }

    return nivel;
}


