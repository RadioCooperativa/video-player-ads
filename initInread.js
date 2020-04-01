let ventana = $(window);
let alturaTercerParrafo;
let contenedor = '';
let parrafos = '';
let ventanaScrollTop = 0;
let cantidadParrafos = 0;
let tercerParrafo = '';
let altura_1 = 0;
let altura_2 = 0;
let altura_3 = 0;
let urlTag ='';
let contenedorVideoIos = '';
let style = '';


function initInread(flag, url, isMobile){
 
  urlTag = url;
  if(flag === true){

    if(isMobile !== 1){
      dimensiones_1 = 640;
      dimensiones_2 = 388;
    }else{
      dimensiones_1 = 275;
      dimensiones_2 = 155;
    }

    ventana.on('scroll', function(){

        ventanaScrollTop        = ventana.scrollTop();
        cantidadParrafos        = parrafos.length;

        alturaTercerParrafo     = altura_1+altura_2+altura_3;

        contenedor              = document.getElementById('contenedor-cuerpo');
        parrafos                = contenedor.getElementsByTagName('p');
        tercerParrafo           = document.getElementById('cuerpo-ad').getElementsByTagName('p')[3];

        altura_1                = parrafos[2].offsetTop;
        altura_2                = parrafos[2].offsetParent.offsetTop;
        altura_3                = parrafos[2].offsetParent.offsetParent.offsetTop;
        alturaTercerParrafo     = altura_1+altura_2+altura_3;  

        if (isMobile === 1  ){
            let contentReadMore     = document.getElementById('contenedor-leermas');
                style               = contentReadMore.getAttribute('style');
        }

          if(style !== "max-height: 300px;"){
          
            cargarBloqueVideo();
        
              let contenedorVideo     = $('#content-reproductor');
              let altoContenedorVideo = (contenedorVideo.outerHeight());
              let sumaAlturas         = alturaTercerParrafo + altoContenedorVideo;
              contenedorVideoIos      = document.getElementById('content_video');
            
              if (isMobile !== 1){
                  if(ventanaScrollTop >= sumaAlturas ){
                      contenedorVideo.addClass('contMiniPlayer'); 
                      resize(350,200);
                      }else{
                      contenedorVideo.removeClass('contMiniPlayer');
                      resize(640,388);
                  }
              }else if(ventanaScrollTop >= sumaAlturas && isMobile === 1){

                        detectIos() === 1 ? contenedorVideoIos.setAttribute('style','width:275px !important; height:155px !important;'): null;
                        contenedorVideo.addClass('contMiniPlayer');
                        resize(275,155);
                      }else{
                          if(contenedorVideoIos){
                          detectIos() === 1 ? contenedorVideoIos.removeAttribute('style'): null;}
                          contenedorVideo.removeClass('contMiniPlayer');
                          resize(300,250);
                  }
              }
    });

    let process_scroll_focus = false;
    async function cargarBloqueVideo(){
      if($('.cuerpo-ad').isOnScreen() === true && process_scroll_focus === false ){
          process_scroll_focus = true;
        if (cantidadParrafos >= 3){
          
          let videoInReadWrapper = document.createElement('div');
              videoInReadWrapper.id = 'videoInReadWrapper';
              videoInReadWrapper.className = 'videoInReadWrapper';
              document.getElementById('cuerpo-ad').insertBefore(videoInReadWrapper,tercerParrafo);
          
          let videoContent = document.createElement('div');
              videoContent.id = 'content-reproductor';
              videoContent.className = 'content-reproductor';
              document.getElementById('videoInReadWrapper').appendChild(videoContent);

          let videoWrapper = document.createElement('div');
              videoWrapper.id = 'ima-sample-videoplayer';
              videoWrapper.className = 'ima-sample-videoplayer';
              document.getElementById('content-reproductor').appendChild(videoWrapper);
  
          const dibujaContVideo_ = await dibujaContVideo();
            if(dibujaContVideo_){
                initMainSdk();
          }else{console.error("Ha ocurrido un error al crear el contenedor de Video: ",dibujaContVideo_);}
        }
      }
    }
  }
}