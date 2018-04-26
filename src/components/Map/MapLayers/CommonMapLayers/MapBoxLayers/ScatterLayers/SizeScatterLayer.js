import {message} from 'antd'
class SizeScatterLayer {
  constructor(map, dispatch) {
    this.map = map;
    this.dispatch = dispatch;
  }

  MapLayData(id, data, color, radius) {
    if (!color) {
      color = "red";
    }
    if (!radius) {
      radius = 20;
    }
    let obj = {
      "id": id,
      "type": "circle",
      "source": {
        "type": "geojson",
        "data": this.dataState(data, color, radius)
      },
      "paint": {
        'circle-radius': {
          'type': 'identity',
          'property': 'radius'
        },
        'circle-color': color,
        'circle-opacity': 0.6
      }
    }
    return obj;
  }

  dataState(Data, color, radius) {
    if (!Data.data.result) {
      // console.log(data.data.error, '图层错误原因');
      message.error(Data.data.error)
      return;
    }
    let data = JSON.parse(JSON.stringify(Data.data.data))
    let obj = {
      "type": "FeatureCollection",
      "features": []
    }
    if (data[0].content.length != data[1].content.length) {
      message.error('数据初始化错误，请及时检查或者联系客服！')
      return obj;
    }
    let endarr = [];
    let radiusArr = [];

    //获取坐标值 lon lat
    let lons = [];
    let lats = [];
    let radiuses = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].alias == "" || data[i].alias == "null") {
        message.error("坐标别名为空，请确认上传是否正确");
        return;
      }
      if (data[i].alias == "lon") {
        lons = data[i].content;
      }
      if (data[i].alias == "lat") {
        lats = data[i].content;
      }
      if (data[i].alias == "radius") {
        radiuses = data[i].content;
      }
    }

    if (radiuses == null || radiuses == "" || radiuses == "null") {
      // let clientHeight = document.documentElement.clientHeight;
      // message.config({
      // top: 60
      // });
      message.warn("大小散点需要设置权重,该条数据没有权重,所以默认值权重为5等半径", 6);
      for (let i in data[0].content) {
        radiuses.push(5)
      }
    }

    // console.log("111111111111111111",Math.max.apply(Math,radiuses));
    // console.log("111111111111111111222",Math.min.apply(Math,radiuses));

    /**
      *设置坐标点默认可见的最小半径和最大半径
      *最大半斤 15
      *最小半径 5
      *当数据的权重最大值 < 可见最小半径时,半径=数据权重值+5,达到可见效果,这时候半径值范围在,[5,15]之间,所以不做非线性处理,直接展示数据
      *当数据的权重值最大值 < 可见最大半径时,如果权重当中的最小值 < 5,最小值设置=5,数据也不做非线性处理，直接展示数据、
      *当数据的最大值 > 可见最大半径时，做非线性处理
      *
      */

    let maxRadius = 20;
    let minRadius = 1;
    let maxNum = null;

    for (let i in data[0].content) {
      endarr.push([lons[i], lats[i]]);
      if (radiuses[i] < minRadius) {
        radiuses[i] = Number(radiuses[i]) + minRadius;
      }
      if (radiuses[i] > maxRadius) {
        radiuses[i] = maxRadius;
      }

      radiusArr.push(radiuses[i]);

    }
    maxNum = this.getArrayMax(radiusArr);
    let mutiple = radius / maxNum;

    // console.log(endarr,'obj')
    // const color = ['Orange', 'Red', 'Yellow', 'LightGreen', 'Gray']
    for (let i in endarr) {
      let features = {
        'type': 'Feature',

        'geometry': {
          'type': 'Point',
          //数据
          'coordinates': endarr[i]
        },
        "properties": {
          "radius": Number(radiusArr[i]) * mutiple
        }
      }
      obj.features.push(features)
    }
    // console.log(obj,'obj')
    return obj;
  }

  addMapLay(data, color, radius) {
    // console.log("dddddddddddd111",data);
    if (!this.map.getLayer('pointMap')) {
      this.map.addLayer(this.MapLayData('pointMap', data, color, radius));
    }
  }

  getArrayMax = (array) => {
    let max = Number(array[0]);
    let len = array.length;
    for (let i = 1; i < len; i++) {
      if (Number(array[i]) > max) {
        max = Number(array[i]);
      }
    }
    return max;
  }

  removeMapLay() {
    if (this.map.getLayer('pointMap')) {
      this.map.removeLayer('pointMap');
      this.map.removeSource('pointMap');
    }
  }
}
export default SizeScatterLayer;
