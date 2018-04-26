// MedicalIndexMapClass
import {cameraFlyType,cameraInfomation ,pitchConstant} from '../../../../../utils/medicalUtils/medicalBaseUtils';
import * as d3 from 'd3';
class MedicalIndexMapClass {
  constructor(mapboxgl, map, dispatch) {
    this.mapboxgl = mapboxgl;
    this.map = map;
    this.dispatch = dispatch;
    this.initMap();
  }

  initMap() {

  }

}
export default MedicalIndexMapClass;
