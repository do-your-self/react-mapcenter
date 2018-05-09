import {message} from 'antd'
class HeatLayer {
  constructor(map) {
    this.map = map;
  }

  MapLayData(id, data, colorTable) {
    let colorArr = ["interpolate", ["linear"], ["heatmap-density"]
    ];
    if (!colorTable) {
      colorTable = ['#313695', '#4575b4', '#74add1', '#abd9e9', '#a50026'];
    }
    // if (!radius || radius < 1) {
    //   radius = 1;
    // }
    for (let i = 0; i < colorTable.length; i++) {
      colorArr.push(i / (colorTable.length - 1));
      colorArr.push(colorTable[i]);
    }
    // console.log(colorArr,'colorArr')
    let obj = {
      "id": id,
      "type": "heatmap",
      "source": {
        "type": "geojson",
        "data": this.dataState(data)
      },
      "maxzoom": 18,
      "paint": {
        "heatmap-weight": {
          "property": "mag",
          "type": "exponential",
          "stops": [
            [
              0, 0
            ],
            [6, 1]
          ]
        },
        "heatmap-intensity": {
          "stops": [
            [
              0, 1
            ],
            [17, 0]
          ]
        },
        // "heatmap-color": [
        //   "interpolate",
        //   ["linear"],
        //   ["heatmap-density"],
        //   0, "red",
        //   0.2, "blue",
        //   0.4, "yellow",
        //   0.6, "green",
        //   0.8, "black",
        //   1, "green"
        // ],
        "heatmap-color": colorArr,
        "heatmap-radius": {
          'type': 'identity',
          'property': "radius"
        },
        "heatmap-opacity": {
          "default": 1,
          "stops": [
            [
              7, 0.5
            ],
            [18, 0.2]
          ]
        }
      }
    };
    return obj;
  }

  dataState(data) {
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
    if (data[0].content.length != data[1].content.length) {
      message.error('数据初始化错误，请及时检查或者联系客服！')
      return obj;
    }
    let endarr = [
      []
    ];
    //获取坐标值 lon lat
    let lons = [];
    let lats = [];
    let values = [];
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
      if (data[i].alias == "value") {
        values = data[i].content;
      }
    }

    console.log("ggggggggg",values);

    for (let i in data[0].content) {
      endarr[0].push([lons[i], lats[i]])
    }
    for (let i in endarr) {
      let features = {
        'type': 'Feature',
        "properties": {
          'radius':Math.sqrt(values[i]),
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

  addMapLay(data, colors) {
    // console.log("colorTable:",colors);
    if (!this.map.getLayer('heatMap')) {
      // console.log(data,'wangdata')
      this.map.addLayer(this.MapLayData('heatMap', data, colors));
    }
  }
  removeMapLay() {
    if (this.map.getLayer('heatMap')) {
      this.map.removeLayer('heatMap');
      this.map.removeSource('heatMap');
    }
  }
}
export default HeatLayer;
