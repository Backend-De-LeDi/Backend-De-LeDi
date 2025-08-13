// Conectar al backend Socket.IO
const socket = io("http://localhost:3402"); // Ajusta el puerto según tu ENV.PORT

const comentariosDiv = document.getElementById("comentarios");
const formComentario = document.getElementById("formComentario");
const usuarioInput = document.getElementById("usuario");
const contenidoInput = document.getElementById("contenido");

// Escuchar conexión
socket.on("connect", () => {
  console.log("Conectado al servidor con ID:", socket.id);
});

// Escuchar evento cuando se crea un nuevo comentario
socket.on("coment-created", (comentario) => {
  mostrarComentario(comentario);
});

// Función para mostrar un comentario en pantalla
function mostrarComentario(comentario) {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${comentario.idUser}</strong>: ${comentario.content}`;
  comentariosDiv.appendChild(div);
}

// Enviar nuevo comentario
formComentario.addEventListener("submit", (e) => {
  e.preventDefault();

  const comentario = {
    idUser: usuarioInput.value,
    content: contenidoInput.value,
    // agrega más campos si tu ComentTypes los requiere
  };
  socket.emit("new-public", { idUser: 1, content: "Hola", idComent: null });

  socket.emit("new-public", comentario);

  contenidoInput.value = "";
});
