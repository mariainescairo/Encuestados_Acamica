// Modelo

var Modelo = function() {
  this.preguntas = JSON.parse(localStorage.getItem("Preguntas")) || [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  //GUIA 1 PASO 2, CREAR EVENTO DE BORRAR PREGUNTA
  this.preguntaEliminada = new Evento(this); 
  this.preguntaEditada = new Evento(this);
  this.votoAgregado = new Evento(this);
  this.preguntasBorradas = new Evento(this)
  };

Modelo.prototype = {
  //se obtiene el id MAYOR asignado a una pregunta
  obtenerUltimoId: function() {
    let idMax = -1;
      for(var i=0;i<this.preguntas.length;i++){
      if(this.preguntas[i].id>idMax){
        idMax = this.preguntas[i].id;
      }
    }return idMax;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.preguntaAgregada.notificar();
    this.guardar();
  },

  //se borra la pregunta correspondiente al ID indicado
borrarPregunta: function(id) {
    this.preguntas = this.preguntas.filter(function(pregunta) {
			return pregunta.id != id;    
        });
  this.preguntaEliminada.notificar();
  this.guardar()
},

editarPregunta: function(id) {
    let preguntaAEditar = this.preguntas.find(function(pregunta){
    return pregunta.id === id;
  });
  let nuevoTexto = prompt('Por favor edite el texto de la pregunta seleccionada');
  preguntaAEditar.textoPregunta = nuevoTexto;
  this.preguntaEditada.notificar();
  this.guardar();
 },

 agregarVoto: function(nombrePregunta, respuestaSeleccionada){
  this.preguntas.forEach(pregunta =>{
    if (pregunta.textoPregunta === nombrePregunta) {
      pregunta.cantidadPorRespuesta.forEach(preguntaConRespuesta =>{
        if (preguntaConRespuesta.textoRespuesta === respuestaSeleccionada) {
          preguntaConRespuesta.cantidad++;
        }
      })
    }
  })

this.votoAgregado.notificar();
this.guardar();
},

 borrarTodasPreguntas: function(){
   this.preguntas = [];
   this.preguntasBorradas.notificar();
   this.guardar();
 },

 //se guardan las preguntas
 
  guardar: function(){
localStorage.setItem("Preguntas", JSON.stringify(this.preguntas));
  },
}