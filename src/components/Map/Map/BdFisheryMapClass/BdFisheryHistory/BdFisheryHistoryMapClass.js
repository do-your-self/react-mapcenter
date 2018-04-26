// BdFisheryHistoryMapClass
import LSHistoryScatterLayer from '../../../MapLayers/BDFisheryLayers/LSHistoryScatterLayer';
class BdFisheryHistoryMapClass {
  constructor(mapboxgl,map, dispatch) {
    this.map = map;
    this.dispatch = dispatch;
    this.mapboxgl = mapboxgl;
    this.initMap();
    this.initMapLayers();

  }

  //加载地图基本信息  中心点  层级等
  initMap() {
    this.map.on("sourcedata", (e) => {
      this.map.resize();
    })
  }

  /**
  *重新刷新地图视口
  */
  initResizeMapWindow() {
    this.map.resize();
  }


  /**
  * @method initMapLayers
  */
  initMapLayers() {

   this.lsHistoryScatterLayer = new LSHistoryScatterLayer(this.map,this.mapboxgl,this.dispatch);
   this.dispatch({
      type: 'bdFisheryMapModel/initLSHistoryMapClass',
      payload:this.lsHistoryScatterLayer
    })

  }

  loadBDDataStyle(data){
    // alert(JSON.stringify(data))
    let layerType = data.data.layertype;
    let layerState = data.layerState;
    console.log("mmmmmmmmmmmmmmmm",layerState);
    switch (layerState) {
      case 0:

        break;
      case 1:
      // 大尺度
         // alert("k")
          this.lsHistoryScatterLayer.createImageLayer()
          this.lsHistoryScatterLayer.initLayerData(data);
          this.lsHistoryScatterLayer.addMapLay();
        break;
      default:

    }

  }


}
export default BdFisheryHistoryMapClass;
