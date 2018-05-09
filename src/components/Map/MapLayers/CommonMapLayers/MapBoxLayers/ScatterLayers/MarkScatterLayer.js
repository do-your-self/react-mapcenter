import {message} from 'antd'
import Mobike from '../../../../../assets/testImages/Mobike.png';
import Sensor from '../../../../../assets/testImages/sensor.png';
import Subway from '../../../../../assets/testImages/subway.png';
class MarkScatterLayer {
  constructor(map,dispatch) {
    this.map = map;
    this.dispatch = dispatch;
  }

  MapLayData(id, data,color,radius,marker) {
    if(!color) {
      color = "red";
    }
    if(!radius) {
      radius = 3;
    }
    if(!marker) {
      marker = "mobike";
    }
    let obj = {
      "id": id,
      "type": "symbol",
      "source": {
        "type": "geojson",
        "data": this.dataState(data,color)
      },
      "layout": {
        "icon-image": marker,
        "icon-size": radius*0.2
      }
    }
    return obj;
  }

  dataState(data,color,radius) {
    this.addMapImage("mobike",Mobike);
    this.addMapImage("sensor",Sensor);
    this.addMapImage("subway",Subway);
    if (!data.data.result) {
      // console.log(data.data.error, '图层错误原因');
      message.error(data.data.error);
      return;
    }
    data = data.data.data
    let obj = {
      "type": "FeatureCollection",
      "features": []
    }
    if(data[0].content.length!=data[1].content.length){
      message.error('数据初始化错误，请及时检查或者联系客服！')
      return obj;
    }
    let endarr = [];

    //获取坐标值 lon lat
     let lons = [];
     let lats = [];
     for (let i = 0; i < data.length; i++) {
       if (data[i].alias == ""||data[i].alias== "null") {
         message.error("坐标别名为空，请确认上传是否正确");
         return;
       }
       if (data[i].alias == "lon") {
          lons = data[i].content;
       }
       if (data[i].alias == "lat") {
          lats = data[i].content;
       }
     }

      for (let  i in data[0].content) {
        endarr.push([lons[i], lats[i]]);
      }

    // console.log(endarr,'obj')
    for (let i in endarr) {
      let features = {
        'type': 'Feature',

        'geometry': {
          'type': 'Point',
          //数据
          'coordinates': endarr[i]
        },


      }
      obj.features.push(features)
    }
    // console.log(obj,'obj')
    return obj;
  }

  addMapLay(data,color,radius,marker) {
    if (!this.map.getLayer('pointMap')) {
      this.map.addLayer(this.MapLayData('pointMap', data,color,radius,marker));
    }
  }
  removeMapLay() {
    if (this.map.getLayer('pointMap')) {
      this.map.removeLayer('pointMap');
      this.map.removeSource('pointMap');
    }
  }

  addMapImage(imageName, imageUrl) {
    if (imageUrl && imageName) {
      this.map.loadImage(imageUrl, (error, image) => {
        if (error) throw error;
        this.map.addImage(imageName, image);
      });
    }
  }

}
export default MarkScatterLayer;
