import  BdFisheryHistoryMapClass from './BdFisheryMapClass/BdFisheryHistory/BdFisheryHistoryMapClass';

import  MedicalBaseMapClass from './MedicalMapClass/MedicalBase/MedicalBaseMapClass';
import  MedicalBaseMapToolClass from './MedicalMapClass/MedicalBase/MedicalBaseMapToolClass';
//
import  MedicalIndexMapClass from './MedicalMapClass/MedicalIndex/MedicalIndexMapClass';
import  MedicalIndexMapToolClass from './MedicalMapClass/MedicalIndex/MedicalIndexMapToolClass';

import {dasType} from '../../../utils/dasUtils/dasUtils';
export function dasTypeFuction(props,map,mapboxgl){
   let dasTypeState = props.model.dasTypeState;
   // alert(dasTypeState)
   switch (dasTypeState) {
       case dasType.BDFISHERY_HISTORY:
          initBDFisheryHistoryClass(props,map,mapboxgl)
       break;
       case dasType.BDFISHERY_REALTIME:

       break;
       case dasType.MEDICAL_BASE:
           initMedicalBaseClass(props,map,mapboxgl);
       break;
       case dasType.MEDICAL_INDEX:
           initMedicalIndexClass(props,map,mapboxgl);
       break;
     default:

   }
}

function initBDFisheryHistoryClass(props,map,mapboxgl){
  /**
  *北斗渔业mapclass
  */
  let bdFisheryHistoryMapClass = new BdFisheryHistoryMapClass(mapboxgl, map, props.dispatch);
  props.dispatch({
    type: 'bdFisheryHistoryMapModel/initBdFisheryMapClass',
    payload: bdFisheryHistoryMapClass
  })

}

function initMedicalBaseClass(props,map,mapboxgl){
  /**
   * 医疗基础maptool类
   * @class medicalBaseMapClass
   * @class MedicalBaseMapToolClass
   * @constructor
   */

  let medicalBaseMapToolClass = new MedicalBaseMapToolClass(mapboxgl, map, props.dispatch);
  props.dispatch({
    type: 'medicalBaseMapToolModel/initMedicalBaseMapToolClass',
    payload: medicalBaseMapToolClass
  })

  let medicalBaseMapClass = new MedicalBaseMapClass(mapboxgl, map, props.dispatch);
  props.dispatch({
    type: 'medicalBaseMapModel/initMedicalBaseMapClass',
    payload: medicalBaseMapClass
  })

}

function initMedicalIndexClass(props,map,mapboxgl){
  /**
   * 医疗基础maptool类
   * @class MedicalIndexMapToolClass
   * @class MedicalIndexMapClass
   * @constructor
   */
  let medicalIndexMapToolClass = new MedicalIndexMapToolClass(mapboxgl, map, props.dispatch);
  props.dispatch({
    type: 'medicalIndexMapToolModel/initMedicalIndexMapToolClass',
    payload: medicalIndexMapToolClass
  })

  let medicalIndexMapClass = new MedicalIndexMapClass(mapboxgl, map, props.dispatch);
  props.dispatch({
    type: 'medicalIndexMapModel/initMedicalIndexMapClass',
    payload: medicalIndexMapClass
  })
}
