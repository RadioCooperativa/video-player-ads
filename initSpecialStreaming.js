// let ventana = $(window);
// let urlTag ='';
// let contenedorVideoIos = '';
// let style = '';
// let wrapper = '';

function initSpecialStreaming(flag, url, isMobile, globalVarFormat){
    console.log("initSpecialStreaming url: "+url);

    urlTagEspecialStreaming = url;
        if(flag === true){
                if(isMobile !== 1){
                    dimensiones_1 = 320;
                    dimensiones_2 = 180;
                }else{
                    dimensiones_1 = 320;
                    dimensiones_2 = 180;
                }

                cargarBloqueVideo(globalVarFormat);

        async function cargarBloqueVideo(globalVarFormat){

            let localStringFormat = globalVarFormat;
            let videoInReadWrapper = document.createElement('div');
                videoInReadWrapper.id = 'video-'+localStringFormat+'';
                videoInReadWrapper.className = 'video-'+localStringFormat+'';
                document.getElementById('ima-player-rudo').appendChild(videoInReadWrapper);
                // document.body.appendChild(videoInReadWrapper);

            let videoContent = document.createElement('div');
                videoContent.id = 'content-reproductor-'+localStringFormat+'';
                videoContent.className = 'content-reproductor-'+localStringFormat+'';
                document.getElementById('video-'+localStringFormat+'').appendChild(videoContent);

            let videoWrapper = document.createElement('div');
                videoWrapper.id = 'ima-'+localStringFormat+'';
                videoWrapper.className = 'ima-'+localStringFormat+'';
                document.getElementById('content-reproductor-'+localStringFormat+'').appendChild(videoWrapper);
    
                console.log("llamando a dibujaVideo especial streaming")
            const dibujaContVideo_ = await dibujaContVideo(localStringFormat);
                if(dibujaContVideo_){
                    initMainSdk(localStringFormat);
            }else{console.error("Ha ocurrido un error al crear el contenedor de Video: ",dibujaContVideo_);}
        // }
        
    }

  }
}

