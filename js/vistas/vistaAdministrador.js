/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;
  

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEliminada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEditada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntasBorradas.suscribir(function() {
    contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    this.reconstruirLista();

    this.configuracionDeBotones();
    
    validacionDeFormulario();
  },
//GUIA 1 PASO 1 CONTRUIR ELEMENTO PREGUNTA
  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem= $('<li>',{
      class: 'list-group-item',
      id: pregunta.id,
      text: pregunta.textoPregunta
    });
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    
    //BOTON AGREGAR PREGUNTA
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];

//ENVIAR RESPUESTAS AL ARREGLO DE RESPUESTAS
      $('[name="option[]"]').each(function() {
    var nuevaRespuesta = $(this).val();
      if(nuevaRespuesta.length>0){
          respuestas.push(
                      {'textoRespuesta': nuevaRespuesta, 'cantidad': 0});
      }
      });
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });

  //asociar el resto de los botones a eventos

  //BOTON BORRAR UNA PREGUNTA
    e.botonBorrarPregunta.click(function(){
      contexto.controlador.borrarPregunta();
      });

  //BOTON EDITAR PREGUNTA
    e.botonEditarPregunta.click(function(){ 
       contexto.controlador.editarPregunta();
       }); 

  //BOTON BORRAR TODAS LAS PREGUNTAS
    e.borrarTodo.click(function(){
    contexto.controlador.borrarTodasPreguntas();
    });
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
