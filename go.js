let globalVarFormat = '';
let dimensiones_1;
let dimensiones_2;
let isMobile;
let contControls = '';

let buttonAudio = '';
let buttonMute = '';
let buttonClose = '';

const coop_seccion_1 = 'coop_seccion_1';
const coop_tema_1 = 'coop_tema_1';
const coop_subtema_1 = 'coop_subtema_1';

let adicional ='';
const y = '%26';
const coma = '%2C';
const igual = '%3D';
const customParams = '&cust_params=';
let vastTagBase1 = '';
let vastTagBase2 = '';
let resultUrlVast = '';
let cleanArray  = [];
let cleanArraySec  = [];
let cleanArrayTem  = [];
let cleanArrayStem  = [];

let largoArray = 0;
let vastTagBase = '';

let ventana = $(window);
let urlTagInRead ='';
let urlTagHomeSticky ='';
let urlTagEspecialStreaming ='';

let contenedorVideoIos = '';
let style = '';
let wrapper = '';

async function go(urlTagBase, arraySeccion, arrayTem, arrayStem){

    vastTagBase = urlTagBase;

    detectmob() === 1 ? isMobile = 1: isMobile = 0;

    let flagTem = false;
    let flagStem = false;

    cleanArraySec = arraySeccion.filter(function(el){
        return el != null;
    });

    cleanArrayTem = arrayTem.filter(function(el){
        return el != null;
    });

    cleanArrayStem = arrayStem.filter(function(el){
        return el != null;
    });

    cleanArraySec.length     === 0 ? (callViews(vastTagBase, isMobile)):
        (resultUrlVast       =  await stringUrlVast(cleanArraySec, vastTagBase, coop_seccion_1),
        cleanArrayTem.length !== 0 ? flagTem = true : callViews(resultUrlVast, isMobile)
        );

    if(flagTem){
        cleanArrayTem.length         === 0 ? (callViews(resultUrlVast, isMobile)):  
        (vastTagBase1        = await stringUrlVast(cleanArrayTem, resultUrlVast, coop_tema_1),
        cleanArrayStem.length !== 0 ? flagStem = true :callViews(vastTagBase1, isMobile)
        );
    }

    if(flagStem){
        cleanArrayStem.length        === 0 ? (callViews(vastTagBase1, isMobile)):
            (vastTagBase2        = await stringUrlVast(cleanArrayStem, vastTagBase1, coop_subtema_1),
            callViews(vastTagBase2, isMobile)
            );
        }
}

async function stringUrlVast(array, vastTag, clave){

    cleanArray = array.filter(function(el){
        return el != null;
    });

    largoArray = cleanArray.length;

    switch (largoArray){

        case(0):
            false;
        break;
        case(1):
            adicional = cleanArray[0];
            vastTag.indexOf('cust_params') !== -1 ? vastTag += clave + igual+ adicional + y : vastTag += customParams + clave + igual+ adicional + y;
        break;
        case(2):
            adicional = cleanArray[0] + coma ;
            adicional += cleanArray[1];
            vastTag.indexOf('cust_params') !== -1 ? vastTag += clave + igual+ adicional + y : vastTag += customParams + clave + igual+ adicional + y;
        break;
        case(3):
            adicional = cleanArray[0] + coma;
            adicional += cleanArray[1] + coma;
            adicional += cleanArray[2];
            vastTag.indexOf('cust_params') !== -1 ? vastTag += clave + igual+ adicional + y : vastTag += customParams + clave + igual+ adicional + y;
        break;
        }
        return vastTagBase = vastTag;
}

function callViews (url,isMobile){

    switch (true){
        case(url.indexOf('inread') !== -1):
            globalVarFormat = 'inread';
            initInread(true,url,isMobile,globalVarFormat);
        break;
        case(url.indexOf('home_stiky') !== -1):
            globalVarFormat = 'home-stiky';
            initHomeStiky(true,url,isMobile,globalVarFormat);
        break;
        case(url.indexOf('especial_streaming') !== -1):
            globalVarFormat = 'especial-streaming';
            initSpecialStreaming(true,url,isMobile,globalVarFormat);
        break;
        default:
   }
}