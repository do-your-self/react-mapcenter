import {cameraFlyType,cameraInfomation ,pitchConstant} from '../../../../../utils/medicalUtils/medicalBaseUtils';
import HeatLayer from '../../../MapLayers/CommonMapLayers/MapBoxLayers/HeatLayer';
import * as d3 from 'd3';
class MedicalBaseMapClass {
  constructor(mapboxgl, map, dispatch) {
    this.mapboxgl = mapboxgl;
    this.map = map;
    this.dispatch = dispatch;
    this.initMap();
  }

  initMap() {
    this.heatLayer = new HeatLayer(this.map);
  }

  setMapLayerData(data){
    // let colorTable = ['#313695', '#4575b4', '#74add1', '#abd9e9', '#a50026'];
    let colorTable = ['blue', 'green', 'yellow', 'orange', 'red'];

    this.heatLayer.removeMapLay();
    this.heatLayer.addMapLay(data, colorTable);
  }

}
export default MedicalBaseMapClass;
