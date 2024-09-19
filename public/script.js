document.addEventListener('DOMContentLoaded', () => {
    const listaVacunas = document.getElementById('listaVacunas');
    const formulario = document.getElementById('vaccineForm');

    // Función para obtener y mostrar registros de vacunas
    function obtenerRegistros() {
        fetch('/vacunas')
            .then(response => response.json())
            .then(data => {
                listaVacunas.innerHTML = ''; // Limpiar la lista
                data.forEach(vacuna => {
                    const li = document.createElement('li');
                    li.textContent = `${vacuna.nombre}, Edad: ${vacuna.edad}, Vacuna: ${vacuna.vacuna}, Fecha: ${new Date(vacuna.fecha).toLocaleDateString()}`;
                    listaVacunas.appendChild(li);
                });
            })
            .catch(error => console.error('Error al obtener registros:', error));
    }

    // Obtener registros al cargar la página
    obtenerRegistros();

    // Manejar el envío del formulario
    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const edad = document.getElementById('edad').value;
        const vacuna = document.getElementById('vacuna').value;
        const fecha = document.getElementById('fecha').value;

        fetch('/vacunas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, edad, vacuna, fecha })
        })
        .then(response => response.json())
        .then(() => {
            obtenerRegistros(); // Actualizar la lista después de agregar un nuevo registro
            formulario.reset(); // Limpiar el formulario
        })
        .catch(error => console.error('Error al registrar vacuna:', error));
    });
});
