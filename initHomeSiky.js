let ventana = $(window);
let urlTag ='';
let contenedorVideoIos = '';
let style = '';
let wrapper = '';

function initHomeStiky(flag, url, isMobile){

    console.log("initHomeStiky");

    urlTag = url;
        if(flag === true){
                if(isMobile !== 1){
                    dimensiones_1 = 275;
                    dimensiones_2 = 155;
                }else{
                    dimensiones_1 = 275;
                    dimensiones_2 = 155;
                }

                ventana.on('scroll', function(){
                    wrapper           = document.getElementById('wrapper');

                    cargarBloqueVideo();

                });
        
                let process_scroll_focus = false;
        async function cargarBloqueVideo(){
            if(process_scroll_focus === false ){
                process_scroll_focus = true;
  
            let videoInReadWrapper = document.createElement('div');
                videoInReadWrapper.id = 'videoInReadWrapper';
                videoInReadWrapper.className = 'videoInReadWrapper';
                // document.getElementById('wrapper').appendChild(videoInReadWrapper);
                document.body.appendChild(videoInReadWrapper);

            
            let videoContent = document.createElement('div');
                videoContent.id = 'content-reproductor';
                videoContent.className = 'content-reproductor';
                document.getElementById('videoInReadWrapper').appendChild(videoContent);

            let videoWrapper = document.createElement('div');
                videoWrapper.id = 'ima-sample-videoplayer';
                videoWrapper.className = 'ima-Home-Sticky';
                document.getElementById('content-reproductor').appendChild(videoWrapper);
    
            const dibujaContVideo_ = await dibujaContVideo();
                if(dibujaContVideo_){
                    initMainSdk();
            }else{console.error("Ha ocurrido un error al crear el contenedor de Video: ",dibujaContVideo_);}
        }
      }
    }
}

