import React from 'react';
import {connect} from 'dva';
import {message} from 'antd';

class DeckLayersController extends React.Component {
  constructor(dispatch) {
    super();
    this.dispatch = dispatch;
    this.addHistogramLayer = this.addHistogramLayer.bind(this);
    this.removeHistogramLayer = this.removeHistogramLayer.bind(this);
  }

  addHistogramLayer(data, colorTable, radius) {
    if (!colorTable) {
      colorTable = [
        "#038E3E",
        "#24FF00",
        "#FFFF00",
        "#FF7800",
        "#FF0000",
        "#76043C"
      ];
    }
    const Data = this.getHistogramData(data);
    // console.log(Data,colorTable,'wangdata')
    setTimeout(() => {
      this.dispatch({type: 'reactMapModel/setHistogramChart', payload: true})
      this.dispatch({type: 'reactMapModel/setHistogramData', payload: Data})
      this.dispatch({type: 'reactMapModel/setHistogramColor', payload: colorTable})
    }, 1)
  }

  // 柱状图数据处理
  getHistogramData(data) {
    // console.log("hhhhhhhhhhh",data);
    if (!data.data.result) {
      // console.log(data.data.error, '图层错误原因');
      message.error(data.data.error);
      return;
    }
    data = data.data.data
    // console.log(data,'wangdata')
    let obj = {
      "type": "FeatureCollection",
      "features": []
    }
    if (data[0].content.length != data[1].content.length) {
      message.error('数据初始化错误，请及时检查或者联系客服！')
      return obj;
    }
    let endarr = [];
    //获取坐标值 lon lat height
    let lons = [];
    let lats = [];
    let heights = [];

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
        heights = data[i].content;
      }
    }

    if (heights == null || heights == "" || heights == "null") {
      message.warn("立体柱状需要设置权重,该条数据没有权重,所以默认值权重为100等高", 6)
      for (let i in data[0].content) {
        heights.push("100")
      }
    }

    for (let i in data[0].content) {
      endarr.push([
        Number(lons[i]),
        Number(lats[i]), {
          "count": Number(heights[i])
        }
      ])
    }

    // console.log(endarr,'wangendarr')
    return endarr;
  }

  // remove Histogramlayer
  removeHistogramLayer() {
    setTimeout(() => {
      this.dispatch({type: 'reactMapModel/setHistogramChart', payload: false})
    }, 1)
  }

  //颜色十六进制转rgb
  colorRgb(color) {
    if (color.substring(0, 1) != "#")
      return this.toHex(color);
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = color.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      //处理六位的颜色值
      let sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return sColorChange.join(",");
    } else {
      return sColor;
    }
  }
  toHex(d) {
    switch (d) {
      case "red":
        return "255,0,0";
        break;
      case "yellow":
        return "255,255,0";
        break;
      case "blue":
        return "0,0,255";
        break;
      case "green":
        return "0,128,0";
        break;
      case "black":
        return "0,0,0";
        break;
      case "white":
        return "255,255,255";
        break;
      case "orange":
        return "255,165,0";
        break;
    }
  }
}

export default DeckLayersController;
