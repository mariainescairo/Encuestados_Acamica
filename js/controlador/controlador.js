/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },
  //guia 1 paso 2
  borrarPregunta: function(id){
     var id = parseInt($('.list-group-item.active').attr('id'));
        this.modelo.borrarPregunta(id);
  },
  //guia 2 Paso 1
  editarPregunta: function(id) {
    var id = parseInt($('.list-group-item.active').attr('id'));
    this.modelo.editarPregunta(id);
  },

  agregarVoto: function(nombrePregunta,respuestaSeleccionada){
    this.modelo.agregarVoto(nombrePregunta,respuestaSeleccionada);
 },
  
  borrarTodasPreguntas: function(){
    this.modelo.borrarTodasPreguntas();
  }
};
