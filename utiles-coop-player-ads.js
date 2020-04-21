let htmlObject;
const urlVideoVacio     = '/noticias/stat/multimedia/player/video_negro_vacio_1_seg.mp4';
const typeVideoVacio    = 'video/mp4';
let closeWrapper        = '';
let contentClose        = '';
let contentCloseImg     = '';


function dibujaContVideo(globalVarFormat){
    
    try {
      let localStringFormat = globalVarFormat;

            let obj = document.getElementById('ima-'+localStringFormat+'');
  
            if(detectIos() === 1){
              htmlObject = '<video id="content_video-'+localStringFormat+'" playsinline muted class="content_video"> <source src='+urlVideoVacio+' type='+typeVideoVacio+'> </video>';
              obj.innerHTML = htmlObject;
            }else{
              htmlObject = '<video id="content_video-'+localStringFormat+'" style="display: none !important"> <source src='+urlVideoVacio+' type='+typeVideoVacio+'> </video>';
              obj.innerHTML = htmlObject;              
            }
            console.log("dibujaContVideo localStringFormat: ",localStringFormat);
            closeWrapper = document.createElement('div');
            closeWrapper.id ='closeWrapper-'+localStringFormat+'';
            closeWrapper.className = 'closeWrapper-'+localStringFormat+'';
            document.getElementById('content-reproductor-'+localStringFormat+'').appendChild(closeWrapper);

            contentClose = document.createElement('div');
            contentClose.id = 'contentClose-'+localStringFormat+'';
            contentClose.className = 'contentClose-'+localStringFormat+'';
            document.getElementById('closeWrapper-'+localStringFormat+'').appendChild(contentClose);

            contentCloseImg = document.createElement('div');
            contentCloseImg.id = 'contentCloseImg-'+localStringFormat+'';
            contentCloseImg.className = 'contentCloseImg-'+localStringFormat+'';
            document.getElementById('closeWrapper-'+localStringFormat+'').appendChild(contentCloseImg);
            
            contControls        = document.createElement('div');
            contControls.id     = 'contControlsVideo-'+localStringFormat+'';
            contControls.setAttribute('class', 'contControlsVideo-'+localStringFormat+'');
            document.getElementById('content-reproductor-'+localStringFormat+'').appendChild(contControls);

            buttonAudio         = document.createElement('div');
            buttonAudio.id      = 'audioButton-'+localStringFormat+'';
            buttonAudio.setAttribute('class', 'buttonAudio-'+localStringFormat+'');
            document.getElementById('contControlsVideo-'+localStringFormat+'').appendChild(buttonAudio);

            buttonMute          = document.createElement('div');
            buttonMute.id       = 'muteButton-'+localStringFormat+''
            buttonMute.setAttribute('class', 'buttonMute-'+localStringFormat+'');
            document.getElementById('contControlsVideo-'+localStringFormat+'').appendChild(buttonMute);

            return true;

        } catch (adError) {
           return adError;
      }
}

function detectIos(){
  if(navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)){
      return 1;
    }else{return 0;}
}
function detectmob() {
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
       return 1;
     }
    else {
       return 0;
     }
}

$.fn.isOnScreen = function(){
    
    var win = $(window);
  
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
  
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
  
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
  
  };