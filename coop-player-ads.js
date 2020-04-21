let adsManager, adsLoader, adDisplayContainer, videoContent, adsInitialized, autoplayAllowed, autoplayRequiresMuted, contentEndedListener;

function initMainSdk() {

  videoContent        = document.getElementById('content_video');
  videoContent_ima    = document.getElementById('ima-sample-videoplayer');

  buttonAudio         = document.getElementById('audioButton');
  buttonMute          = document.getElementById('muteButton');
  buttonClose         = document.getElementById("contentCloseImg")

  buttonAudio.addEventListener('click',() => {onAudioRequest();});
  buttonMute.addEventListener('click', () => {onMuteRequest();});
  buttonClose.addEventListener('click',() => {onCloseRequeset();});

setUpIMA();
checkAutoplaySupport();
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
    adsRequest.adTagUrl = urlTag;
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

  adDisplayContainer = new google.ima.AdDisplayContainer(document.getElementById('ima-sample-videoplayer'), videoContent);
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

    switch (adEvent.type) {
        case google.ima.AdEvent.Type.LOADED:
            console.info("Loaded");
            if (!ad.isLinear()) {
                videoContent.play();
            }
        break;
        case google.ima.AdEvent.Type.STARTED:

                adsManager.getVolume() === 0 ? document.getElementById('muteButton').style.display ='block': document.getElementById('audioButton').style.display ='block';
                document.getElementById('videoInReadWrapper').style.display           ='table';
                document.getElementById('ima-sample-videoplayer').style.display       ='table';
                document.getElementById('contControls').style.display                 ='block';
                document.getElementById('contentClose').style.display                 ='block';
        break;
        case google.ima.AdEvent.Type.COMPLETE:
                console.info("Complete");
                document.getElementById("videoInReadWrapper").style.display           ='none';
        break;
  }
}

function onAdError(adErrorEvent) {
  if(adsManager){adsManager.destroy();}
}

function onAudioRequest() {
    if(adsManager.getVolume !== 0 ){
      adsManager.setVolume(0);
      document.getElementById('audioButton').style.display ='none';
      document.getElementById('muteButton').style.display ='block';
    }
}

function onMuteRequest() {
      
        if(adsManager.getVolume() === 0){
          adsManager.setVolume(1);
          document.getElementById('audioButton').style.display ='block';
          document.getElementById('muteButton').style.display ='none';
      }
} 

function onCloseRequeset(){
    adsManager.destroy();
    document.getElementById("videoInReadWrapper").style.display='none';
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