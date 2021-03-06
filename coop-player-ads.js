let adsManager, adsLoader, adDisplayContainer, videoContent, adsInitialized, autoplayAllowed, autoplayRequiresMuted, contentEndedListener, localStringFormat;

async function initMainSdk(globalVarFormat) {

  console.log("initMainSdk globalVarFormat: ",globalVarFormat);
  localStringFormat = globalVarFormat;
  const resultFormat = await detectFormat(localStringFormat);


  if(!resultFormat){
    console.error("initMainSdk error detectFormat");
  }else{

        dibujaButtonControlsAndClose(resultFormat);
    }
}

function dibujaButtonControlsAndClose(formatType){

  let typeFormat = formatType;

  
  videoContent        = document.getElementById('content_video-'+typeFormat);

  buttonAudio         = document.getElementById('audioButton-'+typeFormat+'');
  buttonMute          = document.getElementById('muteButton-'+typeFormat+'');
  buttonClose         = document.getElementById('contentCloseImg-'+typeFormat+'');

  buttonAudio.addEventListener('click',() => {onAudioRequest(typeFormat);});
  buttonMute.addEventListener('click', () => {onMuteRequest(typeFormat);});
  buttonClose.addEventListener('click',() => {onCloseRequeset(typeFormat);});

  setUpIMA();
  checkAutoplaySupport();
}

function detectFormat(formatString){

  let varResult;

  switch (true){
      case(formatString.indexOf('inread') !== -1):
        varResult = 'inread';
        return varResult;
      case(formatString.indexOf('home-stiky') !== -1):
        varResult = 'home-stiky';
        return varResult;
      case(formatString.indexOf('especial-streaming') !== -1):
        varResult = 'especial-streaming';
        return varResult;
  }
}

function checkAutoplaySupport() {
    var playPromise = videoContent.play();
    if (playPromise !== undefined) {
      playPromise.then(onAutoplayWithSoundSuccess).catch(onAutoplayWithSoundFail);
    }
}

function onAutoplayWithSoundSuccess() {
    autoplayAllowed       = true;
    autoplayRequiresMuted = false;
    autoplayChecksResolved();
}

function onAutoplayWithSoundFail() {
    checkMutedAutoplaySupport();
}

function checkMutedAutoplaySupport() {
    videoContent.volume = 0;
    videoContent.muted = true;
    var playPromise = videoContent.play();
    if (playPromise !== undefined) {
      playPromise.then(onMutedAutoplaySuccess).catch(onMutedAutoplayFail);
    }
}

function onMutedAutoplaySuccess() {
    autoplayAllowed = true;
    autoplayRequiresMuted = true;
    autoplayChecksResolved();
}

function onMutedAutoplayFail() {
    autoplayAllowed = false;
    autoplayRequiresMuted = false;
    autoplayChecksResolved();
}

function autoplayChecksResolved() {
    var adsRequest = new google.ima.AdsRequest();

    switch (true){
      case(localStringFormat.indexOf('inread') !== -1):
          adsRequest.adTagUrl = urlTagInRead;
      break;
      case(localStringFormat.indexOf('home-stiky') !== -1):
          adsRequest.adTagUrl = urlTagHomeSticky;
      break;
      case(localStringFormat.indexOf('especial-streaming') !== -1):
          adsRequest.adTagUrl = urlTagEspecialStreaming;
      break;
      default:
 }
    
    adsRequest.setAdWillAutoPlay(autoplayAllowed);
    adsRequest.setAdWillPlayMuted(autoplayRequiresMuted);
    adsLoader.requestAds(adsRequest);
}

function setUpIMA() {

  createAdDisplayContainer();

  adsLoader = new google.ima.AdsLoader(adDisplayContainer);
  adsLoader.getSettings().setDisableCustomPlaybackForIOS10Plus(true);

  adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, onAdsManagerLoaded, false);
  adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError, false);
  contentEndedListener = function() {adsLoader.contentComplete();};
 
}

function createAdDisplayContainer() {

  adDisplayContainer = new google.ima.AdDisplayContainer(document.getElementById('ima-'+localStringFormat+''), videoContent);
}

function playAds() {

  try {
    if (!adsInitialized) {
        adDisplayContainer.initialize();
        adsInitialized = true;
    }
        adsManager.init(640, 388, google.ima.ViewMode.NORMAL);
        adsManager.start();
    } catch (adError) {
        videoContent.play();
  }
}

function onAdsManagerLoaded(adsManagerLoadedEvent) {

    let adsRenderingSettings = new google.ima.AdsRenderingSettings();
    adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;

    adsManager = adsManagerLoadedEvent.getAdsManager(videoContent, adsRenderingSettings);

    adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError);
    adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,onContentPauseRequested);
    adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,onContentResumeRequested);
    adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED,onAdEvent);
    adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, onAdEvent);
    adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, onAdEvent);
    adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, onAdEvent);

    adsManager.setVolume(0);

    try {
        adDisplayContainer.initialize();
        adsInitialized = true;
        adsManager.init(dimensiones_1, dimensiones_2, google.ima.ViewMode.NORMAL);
        adsManager.start();
    } catch (adError) {
        videoContent.play();
    }
}

function onAdEvent(adEvent) {

  var ad = adEvent.getAd();

  let varCompruebaElement = document.getElementById('ima-player-rudo');

    switch (adEvent.type) {
        case google.ima.AdEvent.Type.LOADED:
            console.info("Loaded");
            if (!ad.isLinear()) {
                videoContent.play();
            }
        break;
        case google.ima.AdEvent.Type.STARTED:
          console.info("Started");

                adsManager.getVolume() === 0 ? document.getElementById('muteButton-'+localStringFormat+'').style.display ='block': document.getElementById('audioButton-'+localStringFormat+'').style.display ='block';
                document.getElementById('video-'+localStringFormat+'').style.display                            ='table';
                document.getElementById('ima-'+localStringFormat+'').style.display                              ='table';
                document.getElementById('contControlsVideo-'+localStringFormat+'').style.display                ='block';
                document.getElementById('contentCloseImg-'+localStringFormat+'').style.display                  ='block';    
        break;
        case google.ima.AdEvent.Type.COMPLETE:
                console.info("Complete");
                document.getElementById('video-'+localStringFormat+'').style.display           ='none';
                varCompruebaElement ? document.getElementById('ima-player-rudo').style.display ='none':null;
        break;
  }
}

function onAdError(adErrorEvent) {
  if(adsManager){adsManager.destroy();}
}

function onAudioRequest(localStringFormat) {


  switch (true){
    case(localStringFormat.indexOf('inread') !== -1):
    let stringFormatInRead = localStringFormat;

    if(adsManager.getVolume !== 0 ){
      adsManager.setVolume(0);
      document.getElementById('audioButton-'+stringFormatInRead+'').style.display ='none';
      document.getElementById('muteButton-'+stringFormatInRead+'').style.display ='block';
    }
        
    break;
    case(localStringFormat.indexOf('home-stiky') !== -1):
    let stringFormatHomeStiky = localStringFormat;
    if(adsManager.getVolume !== 0 ){
      adsManager.setVolume(0);
      document.getElementById('audioButton-'+stringFormatHomeStiky+'').style.display ='none';
      document.getElementById('muteButton-'+stringFormatHomeStiky+'').style.display ='block';
    }
        
    break;
    case(localStringFormat.indexOf('especial-streaming') !== -1):
    let stringFormatEspecialStreaming = localStringFormat;
    if(adsManager.getVolume !== 0 ){
      adsManager.setVolume(0);
      document.getElementById('audioButton-'+stringFormatEspecialStreaming+'').style.display ='none';
      document.getElementById('muteButton-'+stringFormatEspecialStreaming+'').style.display ='block';
    }
        
    break;
    default:
}

}

function onMuteRequest(localStringFormat) {

  switch (true){
    case(localStringFormat.indexOf('inread') !== -1):
      let stringFormatInRead = localStringFormat;
      if(adsManager.getVolume() === 0){
        adsManager.setVolume(1);
        document.getElementById('audioButton-'+stringFormatInRead+'').style.display ='block';
        document.getElementById('muteButton-'+stringFormatInRead+'').style.display ='none';
      }     
    break;
   
    case(localStringFormat.indexOf('home-stiky') !== -1):
      let stringFormatHomeStiky = localStringFormat;
        if(adsManager.getVolume() === 0){
        adsManager.setVolume(1);
        document.getElementById('audioButton-'+stringFormatHomeStiky+'').style.display ='block';
        document.getElementById('muteButton-'+stringFormatHomeStiky+'').style.display ='none';
        }        
    break;
   
    case(localStringFormat.indexOf('especial-streaming') !== -1):
      let stringFormatEspecialStreaming = localStringFormat;
      if(adsManager.getVolume() === 0){
        adsManager.setVolume(1);
        document.getElementById('audioButton-'+stringFormatEspecialStreaming+'').style.display ='block';
        document.getElementById('muteButton-'+stringFormatEspecialStreaming+'').style.display ='none';
      }       
    break;
    default:
}

} 

function onCloseRequeset(localStringFormat){

  switch (true){
    case(localStringFormat.indexOf('inread') !== -1):
      adsManager.destroy();
      document.getElementById('video-'+localStringFormat+'').style.display='none';   
    break;
    case(localStringFormat.indexOf('home-stiky') !== -1):
      adsManager.destroy();
      document.getElementById('video-'+localStringFormat+'').style.display='none';
    break;
    case(localStringFormat.indexOf('especial-streaming') !== -1):
      adsManager.destroy();
      document.getElementById('video-'+localStringFormat+'').style.display='none';
      document.getElementById('ima-player-rudo').style.display='none';  
    break;
    default:
}

}

function onContentPauseRequested() {
  // videoContent.pause();
}

function onContentResumeRequested() {
  adsManager.setVolume(0);
}

function resize(width, height) {
    if(adsManager){adsManager.resize(width,height,google.ima.ViewMode.NORMAL)}
} 