function initHomeStiky(flag, url, isMobile, globalVarFormat){

    urlTagHomeSticky = url;
        if(flag === true){
                if(isMobile !== 1){
                    dimensiones_1 = 275;
                    dimensiones_2 = 155;
                }else{
                    dimensiones_1 = 275;
                    dimensiones_2 = 155;
                }
                ventana.on('scroll', function(){
                    cargarBloqueVideo(globalVarFormat);
                });
            }
        
        let process_scroll_focus = false;
        async function cargarBloqueVideo(globalVarFormat){
            if(process_scroll_focus === false ){
                let localStringFormat = globalVarFormat;
                process_scroll_focus = true;
            let videoInReadWrapper = document.createElement('div');
                videoInReadWrapper.id = 'video-'+localStringFormat+'';
                videoInReadWrapper.className = 'video-'+localStringFormat+'';
                document.body.appendChild(videoInReadWrapper);

            let videoContent = document.createElement('div');
                videoContent.id = 'content-reproductor-'+localStringFormat+'';
                videoContent.className = 'content-reproductor-'+localStringFormat+'';
                document.getElementById('video-'+localStringFormat+'').appendChild(videoContent);

            let videoWrapper = document.createElement('div');
                videoWrapper.id = 'ima-'+localStringFormat+'';
                videoWrapper.className = 'ima-'+localStringFormat+'';
                document.getElementById('content-reproductor-'+localStringFormat+'').appendChild(videoWrapper);
    
            const dibujaContVideo_ = await dibujaContVideo(globalVarFormat);
                if(dibujaContVideo_){
                    initMainSdk(globalVarFormat);
            }else{console.error("Ha ocurrido un error al crear el contenedor de Video: ",dibujaContVideo_);}
        }
      }
}