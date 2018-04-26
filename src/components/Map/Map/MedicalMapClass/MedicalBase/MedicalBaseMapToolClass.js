// MedicalBaseMapToolClass
import {cameraFlyType,cameraInfomation ,pitchConstant} from '../../../../../utils/medicalUtils/medicalBaseUtils';

import * as d3 from 'd3';
class MedicalBaseMapToolClass {
  constructor(mapboxgl, map, dispatch) {
    this.mapboxgl = mapboxgl;
    this.map = map;
    this.dispatch = dispatch;
    this.initMap();
    this.zoomInButtonMethod = this.zoomInButtonMethod.bind(this);
    this.zoomOutButtonMethod = this.zoomOutButtonMethod.bind(this);
    this.addPitchMapRotationButtonMethod = this.addPitchMapRotationButtonMethod.bind(this);
    this.reducePitchMapRotationMethod = this.reducePitchMapRotationMethod.bind(this);
    this.resetNorthButtonMethod = this.resetNorthButtonMethod.bind(this);
    this.currentZoom = null;
  }

  /**
   *  默认初始化
   */
  initMap() {
    const obj = this;
    /**
     * 改变指北针方向
     * 图标
     */
    this.map.on('rotate', (e) => {
      // console.clear();
      // console.log('当前旋转地图角度:', obj.map.getBearing());
      d3.select('#mapCompass').style('transform', `rotate(${ - obj.map.getBearing()}deg)`);
    });

    this.locationSetUpCamera();
    /* this.map.on('mousemove', (e) => {
      // console.clear();
      console.log('当前俯仰角为:', obj.map.getPitch());
      console.info(e.lngLat);
    });*/
    //

  }
  /**
   *  将地图的缩放级别提高1。
   */
  zoomInButtonMethod() {
    this.map.zoomIn();
  }
  /**
   *  将地图的缩放级别降低1。
   */
  zoomOutButtonMethod() {
    this.map.zoomOut();
  }
  /**
   *  将地图旋转到0（到北）的方位，并进行动画转换。
   */
  resetNorthButtonMethod() {
    // this.map.resetNorth();
    // document.getElementById('#BehindThe').style('transform', `rotate(${this.map.getBearing()}deg)`);
    // const lonlat = this.map.getCenter();
    // const rotateEnd = this.map.getBearing();
    // const pitchEnd = this.map.getPitch();
    // const currentZoom = this.map.getZoom();
    // let alt = 472 * Math.pow(2, (18 - currentZoom.toFixed(2) - 1));

    this.map.flyTo({
      center: cameraInfomation.CENTER,
      zoom: cameraInfomation.ZOOM,
      bearing: cameraInfomation.BEARING,
      curve: cameraInfomation.CURVE,
      pitch:cameraInfomation.PITCH,
      easing(t) {
        return t;
      }
    });
  }

  /**
   * 增加俯仰角
   * @param pitchRotation   //  俯仰角 角度
   */
  addPitchMapRotationButtonMethod() {
    this.map.setPitch(this.map.getPitch() + pitchConstant);

  }

  /**
   * 减少俯仰角
   * @param pitchRotation //  俯仰角 角度
   */
  reducePitchMapRotationMethod() {
    this.map.setPitch(this.map.getPitch() - pitchConstant);
  }

  /**
   * 定位当前用户的位置
   *
   */
  locationSetUpCamera() {

    this.map.flyTo({
      center: cameraInfomation.CENTER,
      zoom: cameraInfomation.ZOOM,
      bearing: cameraInfomation.BEARING,
      curve: cameraInfomation.CURVE,
      pitch:cameraInfomation.PITCH,
      easing(t) {
        return t;
      }
    });
  }
}
export default MedicalBaseMapToolClass;
