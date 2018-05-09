import EchartsLayer from './HeartBeatStyle';
import {message} from 'antd';
class HeartBeatLayer {
  constructor(map) {
    this.map = map;
    this.echartslayerStart = new EchartsLayer(this.map);
    this.changeColor = this.changeColor.bind(this);
    this.test = false;
    this.maxNum = null;
  }

  getHeartBeatData(data, radius) {
    if (!data.data.result) {
      // console.log(data.data.error, '图层错误原因');
      message.error(data.data.error)
      return;
    }
    data = data.data.data

    if (data[0].content.length != data[1].content.length) {
      message.error('数据初始化错误，请及时检查或者联系客服！')
      return null;
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
      message.warn("心跳图需要设置权重,该条数据没有权重,所以默认值权重为6等半径", 6)
      for (let i in data[0].content) {
        radiuses.push(6)
      }
    }
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
    this.maxNum = this.getArrayMax(radiusArr);
    let mutiple = radius / this.maxNum;
    let arrData = [];
    for (let i in data[0].content) {
      // let weight = Math.random()*10;
      arrData.push({
        value: [
          Number(lons[i]),
          Number(lats[i]),
          Number(radiusArr[i]) * mutiple
        ]
      })
    }
    return arrData;
  }

  //添加模块
  blockFun(data, color, radius) {
    let arrData = this.getHeartBeatData(data, radius);
    let option = {
      GLMap: {
        roam: true
      },
      coordinateSystem: 'GLMap',
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'effectScatter',
          coordinateSystem: 'GLMap',
          data: arrData,
          symbolSize: function(val) {
            return val[2] * 2;
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: color,
              shadowBlur: 10,
              shadowColor: color
            }
          },
          zlevel: 1
        }
      ]
    };
    return option;
  }
  addMapLay(data, color, radius) {
    if (!color) {
      color = "red";
    }
    if (!radius) {
      radius = 3;
    }
    this.echartslayerStart.add(this.blockFun(data, color, radius));
    this.test = true;
  }
  //删除模块
  removeMapLay() {
    if (this.test) {
      this.echartslayerStart.remove();
      this.test = false;
    }
  }

  changeColor(color) {
    let option = this.echartslayerStart.chart.getOption();
    option.series[0].itemStyle.normal = {
      color: color,
      shadowBlur: 10,
      shadowColor: color
    };
    this.echartslayerStart.remove();
    this.echartslayerStart.add(option)
  }

  changeRadius(radius) {
    let option = this.echartslayerStart.chart.getOption();
    let data = option.series[0].data;
    let newData = [];
    let radiusArr = [];
    for (let i = 0; i < data.length; i++) {
      radiusArr.push(data[i].value[2]);
    }
    this.maxNum = this.getArrayMax(radiusArr);
    let mutiple = radius / this.maxNum;
    for (let i in data) {
      newData.push({
        value: [
          data[i].value[0], data[i].value[1], mutiple * data[i].value[2]
        ]
      });
    }
    option.series[0].data = newData;
    this.echartslayerStart.remove();
    this.echartslayerStart.add(option)
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

}
export default HeartBeatLayer;
