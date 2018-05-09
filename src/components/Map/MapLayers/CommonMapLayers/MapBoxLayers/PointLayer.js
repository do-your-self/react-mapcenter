import {message} from 'antd'
class PointLayer {
  constructor(map, dispatch) {
    this.map = map;
    this.dispatch = dispatch;
  }
  dataState(data, color) {
    if (!data.data.result) {
      // console.log(data.data.error, '图层错误原因');
      return;
    }
    data = data.data.data
    let obj = {
      "type": "FeatureCollection",
      "features": []
    }
    if (data.length != 2 || data[0].content.length != data[1].content.length) {
      message.error('数据初始化错误，请及时检查或者联系客服！')
      return obj;
    }
    let endarr = [
      []
    ];
    // if(Number(data[0].content[0])>Number(data[0].content[1])){
    for (let i in data[0].content) {
      endarr[0].push([data[0].content[i], data[1].content[i]])
    }
    // } else {
    //   for (let  i in data[0].content) {
    //     endarr[0].push([data[1].content[i], data[0].content[i]])
    //   }
    // }
    // const color = ['Orange', 'Red', 'Yellow', 'LightGreen', 'Gray']
    for (let i in endarr) {
      let features = {
        'type': 'Feature',
        'properties': {
          'color': color
        },
        'geometry': {
          'type': 'MultiPoint',
          //数据
          'coordinates': endarr[i]
        }
      }
      obj.features.push(features)
    }
    return obj;
  }
  MapLayData(id, data, color, radius) {
    if (!color) {
      color = "red";
    }
    if (!radius) {
      radius = 3;
    }
    let obj = {
      "id": id,
      "type": "circle",
      "source": {
        "type": "geojson",
        "data": this.dataState(data, color)
      },
      "paint": {
        'circle-radius': {
          'base': 1.75,
          'stops': [
            [12, radius]
          ]
        },
        'circle-color': {
          'type': 'identity',
          'property': 'color'
        },
        'circle-opacity': 0.6
      }
    }
    return obj;
  }
  addMapLay(data, color, radius) {
    if (!this.map.getLayer('pointMap')) {
      this.map.addLayer(this.MapLayData('pointMap', data, color, radius), "xsspace");
    }
  }
  removeMapLay() {
    if (this.map.getLayer('pointMap')) {
      this.map.removeLayer('pointMap');
      this.map.removeSource('pointMap');
    }
  }
}
export default PointLayer;
